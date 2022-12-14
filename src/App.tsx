import React, { useState, useEffect, useContext } from 'react';
import logo from './assets/images/logo.svg';
import Robot from "./components/Robot";
import RobotDiscount from "./components/RobotDiscount";
import styles from './App.module.css';
import ShoppingCart from './components/ShoppingCart';
import { appContext } from './AppState'

interface Props { }
  
interface State {
  robotGallery: any[];
  count: number;
}


const App: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const value = useContext(appContext)

  useEffect(() => {
    document.title = `点击次数为${count}次`
  }, [count])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://jsonplaceholder.typicode.com/users")
        // .then(response => response.json())
        // .then(data => setRobotGallery(data))
        const data = await response.json()
        setRobotGallery(data);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchData()
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>hahaha... hello world</h1>
      </div>
      <h2>{value.username}</h2>
      {/* <Children username={props.username}/> */}
      <button onClick={() => {
        setCount(count + 1)
      }}>hey</button>
      <span>count:{count}</span>
      <ShoppingCart />
      {(!error || error !== "") && <div>网站出错：{error}</div>}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r, index) =>
            index % 2 === 0 ? (<RobotDiscount id={r.id} email={r.email} name={r.name} />) :
              (<Robot id={r.id} email={r.email} name={r.name} />
              )
          )}
        </div>
      ) : (
        <h2>加载中....</h2>
      )}
    </div>
  );
}

export default App;
