import { h } from 'preact'
import htm from 'htm'
import { css } from '../utils/cssClasses'

const html = htm.bind(h)
const basePlayListURL = 'http://www.youtube.com/watch_videos?video_ids='

const GoToPlaylist = ({ playList }) => {
  const getVideoID = (url) => url.split('v=')[1]

  const generatePlayListUrl = ({ playList, baseURL }) => {
    const videosUrl = playList.map(item => getVideoID(item.url)).join()
    return `${baseURL}${videosUrl}`
  }

  return html`
    ${playList.length > 0 && html`
      <div id="GoToPlaylist">
        <a 
          id="goToPlaylistButton"
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
      </div>  
    `}
  `
}

export default GoToPlaylist
