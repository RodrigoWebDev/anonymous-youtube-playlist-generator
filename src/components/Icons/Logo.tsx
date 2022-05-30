import { h } from 'preact'
import htm from 'htm'

import Svg from "./Svg"

const html = htm.bind(h)

const Logo = ({customClass, fill, width, onClick }) => html`
  <${Svg} 
    customClass=${customClass} 
    fill=${fill} 
    onClick=${onClick}
    width=${width}
  >
   <circle cx="512" cy="512" r="512" style="fill:#607d8b"/>
   <path d="M756 387.8c-7.9-4.6-17.7-4.6-25.6 0L640 432.4c-1.5-41.3-35.5-74-76.8-74H332.8c-42.4 0-76.8 34.4-76.8 76.8v153.6c0 42.4 34.4 76.8 76.8 76.8h230.4c41.3 0 75.3-32.7 76.8-74l91.1 45.6c3.5 1.8 7.3 2.8 11.3 2.8 4.8 0 9.5-1.3 13.6-3.8 7.5-4.7 12-12.9 12-21.8V409.6c0-8.8-4.5-17.1-12-21.8zm-167.2 201c0 14.1-11.5 25.6-25.6 25.6H332.8c-14.1 0-25.6-11.5-25.6-25.6V435.2c0-14.1 11.5-25.6 25.6-25.6h230.4c14.1 0 25.6 11.5 25.6 25.6v153.6zm128-15.9L640 534.5v-45.1l76.8-38.4v121.9z" style="fill:#fff"/>
  <//>
`

export default Logo