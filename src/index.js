import { h, render } from 'preact'
import htm from 'htm'
import App from './components/App'
import { ContextProvider } from "./context"
import './main.css'

const html = htm.bind(h)

render(
  html`
    <${ContextProvider}>
      <${App}/>
    <//>
  `, 
  document.getElementById('app')
)
