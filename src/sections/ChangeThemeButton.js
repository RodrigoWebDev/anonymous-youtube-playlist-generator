import { h } from 'preact'
import htm from 'htm'
import light from '../components/Icons/Sun'
import dark from '../components/Icons/Moon'

const html = htm.bind(h)

const ChangeThemeButton = ({ onClick, colorTheme }) => html`
  <div class="fixed bottom-0 right-0 p-5">
    <span onClick=${onClick} class="w-10 h-10 bg-primary-color rounded-full shadow-lg cursor-pointer text-white flex items-center justify-center transition duration-500">
      <${colorTheme === 'light' ? dark : light} customClass="h-6 pr-[0.2rem]" width="full" fill="white" />
    </span>
  </div>
`

export default ChangeThemeButton
