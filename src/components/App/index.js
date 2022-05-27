import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import htm from 'htm'

import useFunctions from "./functions"

// Assets
import { css } from '../../utils/cssClasses'
import svgLogo from '../../assets/icons/logo.svg'

const html = htm.bind(h)

const App = () => {
  const [playList, setPlayList] = useState([])
  const [videoName, setVideoName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [exportHref, setExportHref] = useState('')

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

  useEffect(() => {
    setPlayList(JSON.parse(getPlayListFromLocalStorage()) || [])
  }, [])

  useEffect(() => {
    setExportHref(getExportHrefValue(playList))
  }, [playList])

  return html`
    <div class="p-4">
      <div class="flex align-center mb-4">
        <img class="w-10 sm:w-20 mr-3" src=${svgLogo} alt="logo" />
        <h1 class="font-medium leading-tight text-2xl sm:text-4xl lg:text-5xl leading-none">Anonymous youtube playlist generator</h1>
      </div>
      <p class="mb-4">Create youtube playlists without a google account</p>
      <hr class="mb-4"/>
      
      <div class="flex items-end flex-wrap mb-4 max-w-xs sm:max-w-xl">
        <a 
          class="${css.button} mr-2"
          download="anonymous-youtube-playlist.json"
          href=${exportHref}
        >
          Export playlist
        </a>

        <button 
          class="${css.button} mr-2"
          onClick=${() => openImportJSONPopUp()}
        >
          Import JSON playlist
        </button>

        <button 
          class="${css.button} mr-2"
          onClick=${() => openImportURLPopUp()}
        >
          Import URL playlist
        </button>
      </div>

      <h2 class="font-medium leading-tight text-1xl sm:text-2xl lg:text-3xl mb-4">Add videos to your playlist</h2>

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
            class=${css.button}
          >Add video</button>
        </div>
      </form>

      ${renderGoToYourPlaylistButton()}

      <ul class="max-w-2xl mt-4">
        ${renderVideosList()}
      </ul>

      ${renderDeletePlaylistButton()}
    </div>
`
}

export default App