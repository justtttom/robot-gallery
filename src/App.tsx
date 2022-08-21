import React, { useState, useEffect } from 'react';
import logo from './assets/images/logo.svg';
import robots from './mockdata/robots.json';
import Robot from "./components/Robot";
import styles from './App.module.css';
import ShoppingCart from './components/ShoppingCart';
import { log } from 'console';

interface Props { }

interface State {
  robotGallery: any[];
  count: number;
}


const App: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>()

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
      <button onClick={() => {
        setCount(count + 1)
      }}>hey</button>
      <span>count:{count}</span>
      <ShoppingCart />
      {(!error || error !== "") && <div>网站出错：{error}</div>}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map(r => <Robot id={r.id} email={r.email} name={r.name} />)}
        </div>
      ) : (
        <h2>加载中....</h2>
      )}
    </div>
  );
}

export default App;
