import { h, render } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import htm from 'htm'
import './main.css'

const html = htm.bind(h)
const basePlayListURL = 'http://www.youtube.com/watch_videos?video_ids='
// const baseVideoUrl = "https://www.youtube.com/watch?v="

const App = () => {
  const [playList, setPlayList] = useState([])
  const [videoName, setVideoName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const updatePlayList = (playList) => {
    setPlayList(playList)
    setLocalStoragePlayList(playList)
  }

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

  useEffect(() => {
    const localStoragePlayList = JSON.parse(window.localStorage.getItem('playList')) || []
    setPlayList(localStoragePlayList)
  }, [])

  return html`
    <h1>Anonymous youtube playlist generator</h1>
    <p>Create youtube playlists without a google account</p>
    <hr/>
    <form onSubmit=${(e) => submit(e)}>
      <label>
        <div>Video URL *</div>
        <input
          type="text"
          value=${videoUrl}
          onChange=${(e) => handleChangeInput(e, setVideoUrl)}
          required
        />
      </label>
      <label>
        <div>Video Name</div>
        <input
          type="text"
          value=${videoName}
          onChange=${(e) => handleChangeInput(e, setVideoName)}
        />
      </label>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
    <div id="generated-url-div">
      ${generatePlayListUrl({
        playList,
        baseURL: basePlayListURL
      })}
    </div>
    <ul id="playlist">
      ${playList.map(({ url, name }) => (
        html`
          <li key=${url}>
            <a target="_blank" href=${url}>${name || url}</a>
            <button id="remove-video" onClick=${() => removeVideo(url)} data-remove="${url}">X</button>
          </li>
        `
      ))}
    </ul>
`
}

render(html`<${App}/>`, document.getElementById('app'))
