import React from 'react';
import logo from 'static/icons/logo.svg';
import styled from 'styled-components';
import cx from 'classnames';
import axios from 'axios';
// import {Switch, Route} from 'react-router-dom';

function App() {
  const handleClick =async (type)=>{
    console.log(type,'type');

    const axiosConf = {
      url:`http://127.0.0.1:9999/open/exe`,
      method:'post',
      data:{
        type:"exe",
        name:type
      }
    }

    const {data} = await axios(axiosConf);
    if(data){
      console.log('success');
    }
  }
  return (
    <Styled.App className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Case #1</p>
        <button 
          className={cx('btn')}
          onClick={()=>handleClick('chrome')}
        >Chrome.exe</button>
        
      </header>
    </Styled.App>
  );
}

const Styled = {
  App: styled.div`
      .App {
      text-align: center;
    }

    .App-logo {
      height: 40vmin;
      pointer-events: none;
    }

    @media (prefers-reduced-motion: no-preference) {
      .App-logo {
        animation: App-logo-spin infinite 20s linear;
      }
    }

    .App-header {
      background-color: #282c34;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      color: white;
    }

    .App-link {
      color: #61dafb;
    }
    .btn{
      border-radius:5px;
      padding:5px 10px;
      border:0;
      cursor: pointer;
      &:active{
        opacity:.6
      }
    }

    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `
}

export default App;
