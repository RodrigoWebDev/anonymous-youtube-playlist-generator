import { h } from 'preact'
import htm from 'htm'
import { css } from '../utils/cssClasses'
import Button from "../components/Button"

const html = htm.bind(h)

const Form = ({
  handleChangeInput,
  submit,
  videoUrl,
  videoName,
  setVideoUrl,
  setVideoName
}) => {
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
        <${Button} 
          type="submit"
        >
          Add video
        <//>
      </div>
    </form>
`
}

export default Form
