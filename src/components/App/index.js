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

const html = htm.bind(h)

const App = () => {
  const [playList, setPlayList] = useState([])
  const [exportHref, setExportHref] = useState('')
  const [colorTheme, setColorTheme] = useState(localStorage.theme === "undefined" && "light")

  const getPlayListFromLocalStorage = () => window.localStorage.getItem('playList')

  const getExportHrefValue = () => {
    const dataStr = getPlayListFromLocalStorage()
    return 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  }

  const getButtonStyle = () => colorTheme === 'light' ? css.button : css.outlineButton

  const setTheme = () => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme === 'dark' ? 'light' : 'dark')
    root.classList.add(colorTheme)
    localStorage.setItem('theme', colorTheme)
  }

  useEffect(() => {
    setPlayList(JSON.parse(getPlayListFromLocalStorage()) || [])
  }, [])

  useEffect(() => {
    setExportHref(getExportHrefValue(playList))
  }, [playList])

  useEffect(() => {
    setTheme()
  }, [colorTheme])

  return html`
    <div class="p-4 dark:bg-[#18181b] min-h-screen transition duration-500">
      <${Header} />

      <${ButtonsGroup} 
        colorTheme=${colorTheme} 
        getButtonStyle=${() => getButtonStyle()}
        exportHref=${exportHref}
      />

      <${Form} 
        handleChangeInput=${handleChangeInput}
        getButtonStyle=${getButtonStyle}
        videoName=${videoName}
        playList=${playList}
      />

      <${GoToPlaylist} playList=${playList} />

      <${VideoList} 
        playList=${playList}
        setPlayList=${setPlayList}
      />

      <${ChangeThemeButton} 
        onClick=${() => setColorTheme(oldColorTheme => oldColorTheme === 'dark' ? 'light' : 'dark')}
        colorTheme=${colorTheme}
      />
    </div>
  `
}

export default App
