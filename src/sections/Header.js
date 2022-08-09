import { h } from 'preact'
import htm from 'htm'
import svgLogo from '../assets/icons/logo.svg'

const html = htm.bind(h)

const Header = () => html`
  <nav class="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-50 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light dark:bg-gray-900">
    <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
      <div class="flex items-center">
        <img class="w-7 mr-3 object-contain" src=${svgLogo} alt="logo" />
        <h1 class="font-medium text-2xl leading-none text-black dark:text-slate-300">AYPG</h1>
      </div>

      <div>

      </div>
    </div>
  </nav>
  <!-- <div class="flex align-center mb-4">
    <img class="w-10 sm:w-20 mr-3 object-contain" src=${svgLogo} alt="logo" />
    <h1 class="font-medium text-2xl sm:text-4xl lg:text-5xl leading-none dark:text-slate-300">Anonymous youtube playlist generator</h1>
  </div>
  <p class="mb-4 dark:text-slate-300">Create youtube playlists without a google account</p>
  <hr class="mb-4"/> -->
`

export default Header
