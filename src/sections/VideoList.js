import { h } from 'preact'
import htm from 'htm'
import { css } from '../utils/cssClasses'
import Times from '../components/Icons/Times'
import { dangerColor } from '../utils/colors'
import TrashCan from '../components/Icons/TrashCan'
import Button from "../components/Button"

const html = htm.bind(h)

const VideosList = ({ playList, updatePlayList, openPopup }) => {
  const removeVideo = (url) => {
    const filteredPlayList = playList.filter(item => item.url !== url)
    updatePlayList(filteredPlayList)
  }

  const clearPlaylist = () => {
    updatePlayList([])
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

  return html`
    <ul class="max-w-2xl mt-4">
      ${playList.map(({ url, name }) => (
        html`
          <li data-testid="videoLink" key=${url}>
            <div class="${css.alert} flex justify-between" role="alert">
              <a href=${url} target="_blank">${name}</a>
              <!-- TO DO - w-3 class need do be inside the component -->
              <${Times}
                id="removeVideoIcon"
                customClass="w-3 mr-3 opacity-50 cursor-pointer ml-2 dark:fill-white" 
                fill="black"
                onClick=${() => {
                  removeVideo(url)
                }}
              />
            </div>
          </li>
        `)
      )}
    </ul>

    ${playList.length > 0 && html`
      <${Button}
        id="deleteEntirePlaylist"
        customClass="fill-white cursor-pointer flex items-center content-evenly"
        onClick=${() => openDeletePlaylistPopUp()}   
      >
        <${TrashCan} customClass="w-3 mr-2" fill="inherit" />
        Delete playlist
      <//>
    `}
  `
}

export default VideosList
