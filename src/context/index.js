import { h } from 'preact'
import htm from 'htm'
import { useEffect, useState } from 'preact/hooks'
import { createContext } from 'preact'

const html = htm.bind(h)

export const Context = createContext({
  colorTheme: 'light',
  setColorTheme: () => {}
}) 

export const ContextProvider = ({children}) => {
  const [colorTheme, setColorTheme] = useState("light")

  const setTheme = () => {
    window.localStorage.setItem("theme", colorTheme)
    const root = window.document.documentElement
    root.className = colorTheme
  }

  useEffect(() => {
    const localStorageTheme = window.localStorage.getItem("theme")
    if (localStorageTheme) setColorTheme(localStorageTheme)
    setTheme()
  }, [])

  useEffect(() => {
    setTheme()
  }, [colorTheme])

  return html`
    <${Context.Provider} value=${{
      colorTheme,
      setColorTheme
    }}>
      ${children}
    <//>  
  `
}