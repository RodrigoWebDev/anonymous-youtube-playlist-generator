import { h } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import htm from 'htm'

import { Context } from "../../context"

// Sections
import Header from '../../sections/Header'
import ButtonsGroup from '../../sections/ButtonsGroup'
import Form from '../../sections/Form'
import VideoList from '../../sections/VideoList'
import ChangeThemeButton from '../../sections/ChangeThemeButton'

// Utils
import GoToPlaylist from '../../sections/GoToPlaylist'
import openPopup from '../../utils/openPopup'

const html = htm.bind(h)

const App = () => {
  const [playList, setPlayList] = useState([])
  const [exportHref, setExportHref] = useState('')
  const [videoName, setVideoName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const { setColorTheme } = useContext(Context)

  const resetInputs = () => {
    setVideoName('')
    setVideoUrl('')
  }

  const showWarningPopup = (text) => {
    openPopup({
      title: `<strong>${text}</strong>`,
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }

  const setLocalStoragePlayList = (newPlayList) => {
    window.localStorage.setItem('playList', JSON.stringify(newPlayList))
  }

  const updatePlayList = (newPlayList) => {
    setPlayList(newPlayList)
    setLocalStoragePlayList(newPlayList)
  }

  const isRepeatedUrl = (url) => playList.some(item => item.url === url)

  const isYoutubeURL = (url) => url.match(/^https:\/\/(www|m)\.youtube\.com\/watch\?v=.+/)

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

  const submit = (e) => {
    e.preventDefault()
    addVideo()
  }

  const getPlayListFromLocalStorage = () => window.localStorage.getItem('playList')

  const getExportHrefValue = () => {
    const dataStr = getPlayListFromLocalStorage()
    return 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  }

  const handleChangeName = (e) => {
    setVideoName(e.target.value)

  }

  const handleChangeUrl = (e) => {
    setVideoUrl(e.target.value)
  }

  const toggleTheme = () => {
    setColorTheme(oldColorTheme => oldColorTheme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    setPlayList(JSON.parse(getPlayListFromLocalStorage()) || [])
  }, [])

  useEffect(() => {
    setExportHref(getExportHrefValue(playList))
    console.log({playList})
  }, [playList])

  useEffect(() => {
    console.log({videoName})
  }, [videoName])

  return html`
    <${Header} />
    <div class="p-4 dark:bg-[#18181b] min-h-screen transition duration-500 md:px-52 md:mx-auto">
      <${ButtonsGroup} 
        exportHref=${exportHref}
        openPopup=${openPopup}
        setPlayList=${setPlayList}
      />

      <${Form} 
        submit=${submit}
        videoUrl=${videoUrl}
        videoName=${videoName}
        setVideoName=${setVideoName}
        setVideoUrl=${setVideoUrl}
        handleChangeName=${handleChangeName}
        handleChangeUrl=${handleChangeUrl}
      />

      <${GoToPlaylist} playList=${playList} />

      <${VideoList} 
        playList=${playList}
        updatePlayList=${updatePlayList}
        openPopup=${openPopup}
      />

      <${ChangeThemeButton} 
        onClick=${() => toggleTheme()}
      />
    </div>
  `
}

export default App
