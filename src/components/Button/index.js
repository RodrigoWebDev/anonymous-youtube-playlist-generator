import { h } from 'preact'
import htm from 'htm'
import { css } from "../../utils/cssClasses"

const html = htm.bind(h)
const className = css.button

const Button = ({children, type, href, target, download, onClick, customClass, id}) => {
  if(href){
    return html`
      <a id=${id} class="${className} ${customClass}" download=${download} onClick=${onClick} href=${href} target=${target}>${children}</a>
    `
  }
  return html`
    <button id=${id} class="${className} ${customClass}" onClick=${onClick} type=${type}>${children}</button>
  `
}

export default Button