import { h, render } from 'preact'
import htm from 'htm'
import "./main.css"

const html = htm.bind(h)

const App = () => html`
    <h1>Anonymous youtube playlist generator</h1>
    <p>Create youtube playlists without a google account</p>
    <hr/>
    <form id="add-video-form">
        <label>
            <div>Video URL *</div>
            <input id="video-url-input" type="text" required />
        </label>
        <label>
            <div>Video Name</div>
            <input id="video-name-input" type="text" />
        </label>
        <div>
            <button id="add-video-button">Add</button>
        </div>
    </form>
    <div id="generated-url-div"></div>
    <ul id="playlist"></ul>
`

render(html`<${App}/>`, document.getElementById("app"))

/* 
<h1>Anonymous youtube playlist generator</h1>
    <p>Create youtube playlists without a google account</p>
    <hr/>
    <form id="add-video-form">
        <label>
            <div>Video URL *</div>
            <input id="video-url-input" type="text" required>
        </label>
        <label>
            <div>Video Name</div>
            <input id="video-name-input" type="text">
        </label>
        <div>
            <button id="add-video-button">Add</button>
        </div>
    </form>
    <div id="generated-url-div"></div>
    <ul id="playlist"></ul>
*/