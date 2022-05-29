import { h } from 'preact'
import htm from 'htm'

// Utils
import openPopup from '../../utils/openPopup'
import { dangerColor } from '../../utils/colors'
import { css } from '../../utils/cssClasses'

// Components
import TrashCan from "../Icons/TrashCan"
import Times from "../Icons/Times"

const html = htm.bind(h)
const baseYoutubeURL = 'https://www.youtube.com/'
const basePlayListURL = 'http://www.youtube.com/watch_videos?video_ids='

const useFunctions = ({
  playList, 
  setPlayList, 
  videoName, 
  setVideoName, 
  videoUrl, 
  setVideoUrl
}) => {
  const setLocalStoragePlayList = (newPlayList) => {
    window.localStorage.setItem('playList', JSON.stringify(newPlayList))
  }

  const updatePlayList = (newPlayList) => {
    setPlayList(newPlayList)
    setLocalStoragePlayList(newPlayList)
  }

  const getPlayListFromLocalStorage = () => window.localStorage.getItem('playList')

  const removeVideo = (url) => {
    const filteredPlayList = playList.filter(item => item.url !== url)
    updatePlayList(filteredPlayList)
  }

  const isRepeatedUrl = (url) => playList.some(item => item.url === url)

  const isYoutubeURL = (url) => url.match(/^https:\/\/(www|m)\.youtube\.com\/watch\?v=.+/);

  const showWarningPopup = (text) => {
    openPopup({
      title: `<strong>${text}</strong>`,
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }

  const resetInputs = () => {
    setVideoName('')
    setVideoUrl('')
  }

  const addVideo = () => {
    if (isRepeatedUrl(videoUrl)) {
      showWarningPopup('URL already added')
    } else if (!isYoutubeURL(videoUrl)) {
      showWarningPopup('Invalid youtube URL')
    } else {
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

  const uploadJSON = () => {
    // Here I needed to do a little DOM manipulation because SWAL does not support HTM(don't confuse with HTML) elements
    const inputFile = document.getElementById('inputFile')
    const file = inputFile.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      console.log(e.target.result)
      updatePlayList(JSON.parse(e.target.result))
    }
    reader.readAsText(file)
  }

  const clearPlaylist = () => {
    updatePlayList([])
  }

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

  const openImportJSONPopUp = () => {
    openPopup({
      title: '<strong>Import playlist</strong>',
      html: `<input id="inputFile" class="${css.inputFile}" type="file"/>`,
      confirmButtonText: 'import',
      confirmCallback: () => uploadJSON()
    })
  }

  const openImportURLPopUp = () => {
    openPopup({
      title: '<strong>Import playlist by URL</strong>',
      html: `<input id="inputUrl" class="${css.input}" type="text"/>`,
      confirmButtonText: 'import',
      confirmCallback: () => importByUrl()
    })
  }

  const openDeletePlaylistPopUp = () => {
    openPopup({
      title: '<strong>Delete playlist</strong>',
      html: 'Are you REALLY SURE?',
      confirmButtonText: 'Delete',
      confirmButtonColor: dangerColor,
      confirmCallback: () => clearPlaylist()
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

  const renderDeletePlaylistButton = () =>
    playList.length > 0 && html`
      <button
        class="${css.dangerButton} cursor-pointer flex items-center content-evenly"
        id="generated-url-div"
        onClick=${() => openDeletePlaylistPopUp()}
      >
          <!-- TO DO - w-3 and fill-white class neet do be inside the component -->
        <${TrashCan} customClass="w-3 fill-white mr-2" />
        Delete playlist
      </button>`

  const renderVideosList = () =>
    playList.map(({ url, name }) => (
      html`
        <li key=${url}>
          <div class="${css.alert} flex justify-between" role="alert">
            <a href=${url} target="_blank">${name || url}</a>
            <!-- TO DO - w-3 class neet do be inside the component -->
            <${Times}
              customClass="w-3 mr-3 opacity-50 cursor-pointer ml-2" 
              fill="black"
              onClick=${() => {
                removeVideo(url)
              }}
            />
          </div>
        </li>
      `
    ))

  return {
    getPlayListFromLocalStorage,
    openImportJSONPopUp,
    getExportHrefValue,
    renderVideosList,
    openImportURLPopUp,
    submit,
    handleChangeInput,
    renderDeletePlaylistButton,
    renderGoToYourPlaylistButton
  }
}

export default useFunctions
