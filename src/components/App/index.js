import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import htm from 'htm'

import useFunctions from './functions'

// Assets
import { css } from '../../utils/cssClasses'
import svgLogo from '../../assets/icons/logo.svg'
import light from '../../components/Icons/Sun'
import dark from '../../components/Icons/Moon'

const html = htm.bind(h)

const App = () => {
  const [playList, setPlayList] = useState([])
  const [videoName, setVideoName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [exportHref, setExportHref] = useState('')
  const [colorTheme, setColorTheme] = useState(localStorage.theme)

  const {
    getPlayListFromLocalStorage,
    openImportJSONPopUp,
    getExportHrefValue,
    renderVideosList,
    openImportURLPopUp,
    handleChangeInput,
    renderDeletePlaylistButton,
    renderGoToYourPlaylistButton,
    submit
  } = useFunctions({
    playList,
    setPlayList,
    videoName,
    setVideoName,
    videoUrl,
    setVideoUrl
  })

  const getButtonStyle = () => colorTheme === 'light' ? css.button : css.outlineButton

  useEffect(() => {
    setPlayList(JSON.parse(getPlayListFromLocalStorage()) || [])
  }, [])

  useEffect(() => {
    setExportHref(getExportHrefValue(playList))
  }, [playList])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme === 'dark' ? 'light' : 'dark')
    root.classList.add(colorTheme)
    localStorage.setItem('theme', colorTheme)
  }, [colorTheme])

  return html`
    <div class="p-4 dark:bg-[#18181b] min-h-screen transition duration-500">
      <div class="flex align-center mb-4">
        <img class="w-10 sm:w-20 mr-3 object-contain" src=${svgLogo} alt="logo" />
        <h1 class="font-medium leading-tight text-2xl sm:text-4xl lg:text-5xl leading-none dark:text-slate-300">Anonymous youtube playlist generator</h1>
      </div>
      <p class="mb-4 dark:text-slate-300">Create youtube playlists without a google account</p>
      <hr class="mb-4"/>

      <div class="fixed bottom-0 right-0 p-5">
        <span onClick=${() => setColorTheme(oldColorTheme => oldColorTheme === 'dark' ? 'light' : 'dark')} class="w-10 h-10 bg-primary-color block rounded-full shadow-lg cursor-pointer text-white flex items-center justify-center transition duration-500">
          <${colorTheme === 'light' ? light : dark} customClass="h-6 pr-[0.2rem]" width="full" fill="white" />
        </span>
      </div>
      
      <div class="flex items-end flex-wrap mb-4 max-w-xs sm:max-w-xl">
        <a 
          class="${getButtonStyle()} mr-2"
          download="anonymous-youtube-playlist.json"
          href=${exportHref}
        >
          Export playlist
        </a>

        <button 
          class="${getButtonStyle()} mr-2"
          onClick=${() => openImportJSONPopUp()}
        >
          Import JSON playlist
        </button>

        <button 
          class="${getButtonStyle()} mr-2"
          onClick=${() => openImportURLPopUp()}
        >
          Import URL playlist
        </button>
      </div>

      <h2 class="font-medium leading-tight text-1xl sm:text-2xl lg:text-3xl mb-4 dark:text-slate-300">Add videos to your playlist</h2>

      <form onSubmit=${(e) => submit(e)} class="max-w-sm">
        <label>
          <div class=${css.inputLabel}>Video URL *</div>
          <input
            type="text"
            class="${css.input} mb-4"
            value=${videoUrl}
            onChange=${(e) => handleChangeInput(e, setVideoUrl)}
            required
          />
        </label>

        <label>
          <div class=${css.inputLabel}>Video Name</div>
          <input
            type="text"
            class="${css.input} mb-4"
            value=${videoName}
            onChange=${(e) => handleChangeInput(e, setVideoName)}
          />
        </label>
        <div class="mb-4">
          <button 
            type="submit"
            class=${getButtonStyle()}
          >Add video</button>
        </div>
      </form>

      ${renderGoToYourPlaylistButton()}

      <ul class="max-w-2xl mt-4">
        ${renderVideosList()}
      </ul>

      ${renderDeletePlaylistButton(colorTheme)}
    </div>
`
}

export default App
