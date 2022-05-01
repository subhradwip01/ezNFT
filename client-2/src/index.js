import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom";
import {NFTContextProvider} from "./context/NFTContext"

const PROJECTID=process.env.REACT_APP_PROJECTID;
const PROJECTSECRET=process.env.REACT_APP_PROJECTSECRET;

ReactDOM.render(
  <NFTContextProvider projectId={PROJECTID} projectSecret={PROJECTSECRET}>
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>
  </NFTContextProvider>,
  document.getElementById('root')
)
