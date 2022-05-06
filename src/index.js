import { h, render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import htm from 'htm'
import Swal from 'sweetalert2'

import './main.css'
import { css } from './cssClassComponents'
import svgLogo from "./logo.svg"
import timesIcon from "./times.svg"

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

  const addVideo = () => {
    updatePlayList([...playList, {
      url: videoUrl,
      name: videoName
    }])
    setVideoName('')
    setVideoUrl('')
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

  useEffect(() => {
    setPlayList(JSON.parse(getPlayListFromLocalStorage()) || [])
  }, [])

  useEffect(() => {
    setExportHref(getExportHrefValue(playList))
  }, [playList])

  return html`
    <div class="p-4">
      <div class="flex align-center mb-4">
        <img class="w-20 mr-3" src=${svgLogo} alt="logo" />
        <h1 class="font-medium leading-tight text-5xl">Anonymous youtube playlist generator</h1>
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

      <h2 class="font-medium leading-tight text-4xl mb-4">Add videos to your playlist</h2>

      <form onSubmit=${(e) => submit(e)} class="w-96">
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
            onChange=${(e) => handleChangeInput(e, setVideoUrl)}
          />
        </label>
        <div class="mb-4">
          <button 
            type="submit"
            class=${css.button}
          >Add video</button>
        </div>
      </form>
      <div id="generated-url-div">
        ${generatePlayListUrl({
          playList,
          baseURL: basePlayListURL
        })}
      </div>
      <ul class="w-1/2 mt-4">
        ${playList.map(({ url, name }) => (
          html`
            <li key=${url}>
              <div class="${css.alert} flex justify-between" role="alert">
                <a href=${url} target="_blank">${name || url}</a>
                <img class="w-5 mr-3 opacity-50 cursor-pointer" src=${timesIcon} onClick=${() => removeVideo(url)} alt="Remove item" />
              </div>
            </li>
          `
        ))}
      </ul>
    </div>
`
}

render(html`<${App}/>`, document.getElementById('app'))
