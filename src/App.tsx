import React from 'react';
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


class App extends React.Component<Props, State> {

  // 生命周期第一阶段： 初始化
  // 初始化组件 state
  constructor(props) {
    super(props);
    this.state = {
      robotGallery: [],
      count: 0,
    };
  }

  // 在组件创建好dom元素以后、挂在页面时调用
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(resopnse => resopnse.json())
      .then(data => this.setState({ robotGallery: data }));
  }


  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1>hahaha... hello world</h1>
        </div>
        <button onClick={() => {
          this.setState((preState, preProps) => { return { count: preState.count + 1 } }, () => {
            console.log(this.state.count);
          });
          this.setState((preState, preProps) => { return { count: preState.count + 1 } }, () => {
            console.log(this.state.count);
          });
        }}>hey</button>
        <span>count:{this.state.count}</span>
        <ShoppingCart />
        <div className={styles.robotList}>
          {this.state.robotGallery.map(r => <Robot id={r.id} email={r.email} name={r.name} />)}
        </div>
      </div>
    );
  }
}

export default App;
