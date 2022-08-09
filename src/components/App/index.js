import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import htm from 'htm'

// Sections
import Header from '../../sections/Header'
import ButtonsGroup from '../../sections/ButtonsGroup'
import Form from '../../sections/Form'
import VideoList from '../../sections/VideoList'
import ChangeThemeButton from '../../sections/ChangeThemeButton'

// Utils
import { css } from '../../utils/cssClasses'
import GoToPlaylist from '../../sections/GoToPlaylist'
import openPopup from '../../utils/openPopup'

const html = htm.bind(h)

const App = () => {
  const [playList, setPlayList] = useState([])
  const [exportHref, setExportHref] = useState('')
  const [colorTheme, setColorTheme] = useState('light')
  const [videoName, setVideoName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

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

  const setLocalStorageTheme = (theme) => {
    window.localStorage.setItem('theme', theme)
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

  const getThemeFromLocalStorage = () => window.localStorage.getItem('theme')

  const getExportHrefValue = () => {
    const dataStr = getPlayListFromLocalStorage()
    return 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  }

  const getButtonStyle = () => colorTheme === 'light' ? css.button : css.outlineButton

  const handleChangeInput = (e, setState) => {
    setState(e.target.value)
  }

  const toggleTheme = () => {
    setColorTheme(oldColorTheme => oldColorTheme === 'dark' ? 'light' : 'dark')
  }

  const setTheme = () => {
    const root = window.document.documentElement
    root.className = colorTheme
    setLocalStorageTheme(colorTheme)
  }

  const setInitialTheme = () => {
    if (getThemeFromLocalStorage()) setColorTheme(getThemeFromLocalStorage())
  }

  useEffect(() => {
    setPlayList(JSON.parse(getPlayListFromLocalStorage()) || [])
    setInitialTheme()
  }, [])

  useEffect(() => {
    setExportHref(getExportHrefValue(playList))
  }, [playList])

  useEffect(() => {
    setTheme()
  }, [colorTheme])

  return html`
    <${Header} />
    <div class="p-4 dark:bg-[#18181b] min-h-screen transition duration-500 md:px-52 md:mx-auto">
      <${ButtonsGroup} 
        colorTheme=${colorTheme} 
        getButtonStyle=${() => getButtonStyle()}
        exportHref=${exportHref}
        openPopup=${openPopup}
        updatePlayList=${updatePlayList}
        setPlayList=${setPlayList}
      />

      <${Form} 
        submit=${submit}
        getButtonStyle=${getButtonStyle}
        videoUrl=${videoUrl}
        videoName=${videoName}
        setVideoName=${setVideoName}
        setVideoUrl=${setVideoUrl}
        handleChangeInput=${handleChangeInput}
      />

      <${GoToPlaylist} playList=${playList} />

      <${VideoList} 
        playList=${playList}
        setPlayList=${setPlayList}
        updatePlayList=${updatePlayList}
        colorTheme=${colorTheme}
        openPopup=${openPopup}
      />

      <${ChangeThemeButton} 
        onClick=${() => toggleTheme()}
        colorTheme=${colorTheme}
      />
    </div>
  `
}

export default App
