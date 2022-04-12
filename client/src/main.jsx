import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom";
import {NFTContextProvider} from "./context/NFTContext"

ReactDOM.render(
  <NFTContextProvider>
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>
  </NFTContextProvider>,
  document.getElementById('root')
)
