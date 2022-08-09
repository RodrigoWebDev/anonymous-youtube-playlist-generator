import { h } from 'preact'
import htm from 'htm'
import { css } from '../utils/cssClasses'

const html = htm.bind(h)
const baseYoutubeURL = 'https://www.youtube.com/'
const modalWarningMessage = '<p class="mb-4"><strong>Warning!</strong> This process will overwrite yout actual playlist</p>'

const ButtonsGroup = ({ getButtonStyle, exportHref, openPopup, setPlayList }) => {
  const importByUrl = () => {
    const inputValue = document.getElementById('inputUrl').value
    const videosIDString = inputValue.split('=')[1]
    const videosIDArray = videosIDString.split(',')
    const playList = videosIDArray.map(item => ({
      url: `${baseYoutubeURL}watch?v=${item}`,
      name: ''
    }))
    setPlayList(playList)
  }

  const openImportURLPopUp = () => {
    openPopup({
      title: '<strong>Import playlist by URL</strong>',
      html: `
        ${modalWarningMessage}
        <input id="inputUrl" class="${css.input}" type="text"/>
      `,
      confirmButtonText: 'import',
      confirmCallback: () => importByUrl()
    })
  }

  const uploadJSON = () => {
    // Here I needed to do a little DOM manipulation because SWAL does not support HTM(don't confuse with HTML) elements
    const inputFile = document.getElementById('inputFile')
    const file = inputFile.files[0]
    // eslint-disable-next-line
    const reader = new FileReader()

    reader.onload = (e) => {
      console.log(e.target.result)
      setPlayList(JSON.parse(e.target.result))
    }
    reader.readAsText(file)
  }

  const openImportJSONPopUp = () => {
    openPopup({
      title: '<strong>Import playlist</strong>',
      html: `
        ${modalWarningMessage}
        <input id="inputFile" class="${css.inputFile}" type="file"/>
      `,
      confirmButtonText: 'import',
      confirmCallback: () => uploadJSON()
    })
  }

  return html`
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
  `
}

export default ButtonsGroup
