import { h } from 'preact'
import htm from 'htm'
import { css } from '../utils/cssClasses'
import Button from "../components/Button"

const html = htm.bind(h)

const Form = ({
  submit,
  videoUrl,
  videoName,
  handleChangeName,
  handleChangeUrl
}) => {
  return html`
    <h2 class="font-medium leading-tight text-1xl sm:text-2xl lg:text-3xl mb-4 dark:text-slate-300">Add videos to your playlist</h2>

    <form onSubmit=${submit} class="max-w-sm">
      <label>
        <div class=${css.inputLabel}>Video URL *</div>
        <input
          id="videoUrlField"
          type="text"
          class="${css.input} mb-4"
          value=${videoUrl}
          onInput=${e => handleChangeUrl(e)}
          required
        />
      </label>

      <label>
        <div class=${css.inputLabel}>Video Name</div>
        <input
          id="videoNameField"
          type="text"
          class="${css.input} mb-4"
          value=${videoName}
          onInput=${e => handleChangeName(e)}
        />
      </label>
      <div class="mb-4">
       <${Button} 
          id="submitButton"
          type="submit"
        >
          Add video
        <//>
      </div>
    </form>
`
}

export default Form
