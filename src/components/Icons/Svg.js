import { h } from 'preact'
import htm from 'htm'
import '../../main.css'

const html = htm.bind(h)

const Svg = ({ children, customClass = '', fill = 'white', width = '3', onClick = () => {} }) => html`
  <svg 
    class="w-${width} fill-${fill} ${customClass}" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512"
    onClick=${onClick}
  >
    ${children}
  </svg>
`

export default Svg
