import { h } from 'preact'
import htm from 'htm'
import {css} from '../utils/cssClasses'
import { useState } from 'preact/hooks'
import openPopup from '../utils/openPopup'

const html = htm.bind(h)

const Form = ({
  handleChangeInput, 
  getButtonStyle, 
  playList,
}) => {
  const [videoName, setVideoName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const isRepeatedUrl = (url) => playList.some(item => item.url === url)

  const isYoutubeURL = (url) => url.match(/^https:\/\/(www|m)\.youtube\.com\/watch\?v=.+/)

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

  const handleChangeInput = (e, setState) => {
    setState(e.target.value)
  }

  return html`
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
`}

export default Form