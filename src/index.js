import { h, render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import htm from 'htm'
import Swal from 'sweetalert2'

import './main.css'
import { css } from './cssClassComponents'
import svgLogo from "./assets/icons/logo.svg"
import timesIcon from "./assets/icons/times.svg"

const html = htm.bind(h)
const basePlayListURL = 'http://www.youtube.com/watch_videos?video_ids='
// const baseVideoUrl = "https://www.youtube.com/watch?v="

const App = () => {
  const [playList, setPlayList] = useState([])
  const [videoName, setVideoName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [exportHref, setExportHref] = useState('')

  const updatePlayList = (playList) => {
      setPlayList(playList)
      setLocalStoragePlayList(playList)
  }

  const getPlayListFromLocalStorage = () => window.localStorage.getItem('playList')

  const setLocalStoragePlayList = playList => {
    window.localStorage.setItem('playList', JSON.stringify(playList))
  }

  const removeVideo = (url) => {
    const filteredPlayList = playList.filter(item => item.url !== url)
    updatePlayList(filteredPlayList)
  }

  const isRepeatedUrl = (url) => playList.some(item => item.url === url)
  
  const showWarningPopup = (text) => {
    Swal.fire({
      title: `<strong>${text}</strong>`,
      icon: 'warning',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "OK",
    })
  }

  const resetInputs = () => {
    setVideoName('')
    setVideoUrl('')
  }

  const addVideo = () => {
    if(isRepeatedUrl(videoUrl)){
      showWarningPopup("URL already added")
    }else{
      updatePlayList([...playList, {
        url: videoUrl,
        name: videoName
      }])
    }
    resetInputs()
  }

  const handleChangeInput = (e, setState) => {
    setState(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    addVideo()
  }

  const getVideoID = (url) => url.split('v=')[1]

  const generatePlayListUrl = ({ playList, baseURL }) => {
    const videosUrl = playList.map(item => getVideoID(item.url)).join()
    return `${baseURL}${videosUrl}`
  }

  const getExportHrefValue = () => {
    const dataStr = getPlayListFromLocalStorage()
    return 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  }

  const uploadFile = () => {
    // Here I needed to do a little DOM manipulation because SWAL does not support HTM(don't confuse with HTML) elements
    const inputFile = document.getElementById("inputFile")
    const file = inputFile.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      console.log(e.target.result);
      updatePlayList(JSON.parse(e.target.result))
    }
    reader.readAsText(file)
  }

  const openImportPopUp = () => {
    Swal.fire({
      title: '<strong>Import playlist</strong>',
      html: `<input id="inputFile" class="${css.inputFile}" type="file"/>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "import",
    }).then(({isConfirmed}) => {
      if (isConfirmed) {
        uploadFile()
      }
    })
  }

  const renderGoToYourPlaylistButton = () => 
      playList.length > 0 && html`
      <div id="generated-url-div">
        <a 
          class=${css.outlineButton}
          href=${
            generatePlayListUrl({
              playList,
              baseURL: basePlayListURL
            })
          }
          target="_blank"
        >
          Go to your playlist
        </a>
      </div>`

  const renderVideosList = () =>
    playList.map(({ url, name }) => (
      html`
        <li key=${url}>
          <div class="${css.alert} flex justify-between" role="alert">
            <a href=${url} target="_blank">${name || url}</a>
            <img class="w-5 mr-3 opacity-50 cursor-pointer ml-2" src=${timesIcon} onClick=${() => removeVideo(url)} alt="Remove item" />
          </div>
        </li>
      `
    ))
          

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
      
      <div class="flex items-end mb-4">
        <a 
          class="${css.button} mr-2"
          download="anonymous-youtube-playlist.json"
          href=${exportHref}
        >
          Export playlist
        </a>

        <button 
          class="${css.button} mr-2"
          onClick=${() => openImportPopUp()}
        >
          Import playlist
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
    </div>
`
}

render(html`<${App}/>`, document.getElementById('app'))
