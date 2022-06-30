import { h } from 'preact'
import htm from 'htm'
import svgLogo from '../assets/icons/logo.svg'

const html = htm.bind(h)

const Header = () => html`
  <div class="flex align-center mb-4">
    <img class="w-10 sm:w-20 mr-3 object-contain" src=${svgLogo} alt="logo" />
    <h1 class="font-medium leading-tight text-2xl sm:text-4xl lg:text-5xl leading-none dark:text-slate-300">Anonymous youtube playlist generator</h1>
  </div>
  <p class="mb-4 dark:text-slate-300">Create youtube playlists without a google account</p>
  <hr class="mb-4"/>
`

export default Header