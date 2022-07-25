import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import { GlobalStyle } from './components/styled';
import { store } from "./store"
import { Provider } from "react-redux"
const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(container)

root.render(
  <Provider store={store}>
      <App />
  </Provider>
 
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

