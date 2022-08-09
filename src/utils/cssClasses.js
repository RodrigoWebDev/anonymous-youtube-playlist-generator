const baseButton = `
  inline-block 
  px-6 
  py-2.5 
  text-white 
  font-medium 
  text-xs 
  leading-tight 
  rounded 
  shadow-md  
  hover:shadow-lg 
  focus:shadow-lg 
  focus:outline-none 
  focus:ring-0 
  active:shadow-lg 
  transition 
  duration-150 
  ease-in-out
  flex-grow
  text-center
  mb-2
`

const baseOutlineButton = `
  ${baseButton}
  border-2
  shadow-none
  focus:outline-none 
  focus:ring-0
  dark:hover:text-white 
  hover:bg-opacity-5
`

export const css = {
  button: `
    ${baseButton}
    bg-blue-600
    hover:bg-blue-700 
    focus:bg-blue-700
    active:bg-blue-800 
  `,
  dangerButton: `
    ${baseButton}
    bg-red-600
    active:bg-red-800
    focus:bg-red-700
    hover:bg-red-700`,
  outlineButton: `
    ${baseOutlineButton}
    border-blue-600
    dark:hover:bg-blue-600
    text-blue-600
  `,
  outlineDangerButton: `
    ${baseOutlineButton}
    dark:hover:bg-red-600
    text-red-600 
    border-red-600
  `,
  label: `
    form-label 
    inline-block 
    mb-2 
    text-gray-700`,
  inputFile: `
    form-control 
    inline-block 
    w-full 
    px-3 
    py-1.5 
    text-base 
    font-normal 
    text-gray-700 
    bg-white 
    bg-clip-padding 
    border 
    border-solid 
    border-gray-300 
    rounded 
    transition 
    ease-in-out 
    m-0 
    focus:text-gray-700 
    focus:bg-white 
    focus:border-blue-600 
    focus:outline-none`,
  inputLabel: `
    form-label 
    inline-block 
    mb-2 
    text-gray-700
    dark:text-slate-300
  `,
  input: `
    form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 
    focus:bg-white 
    focus:border-blue-600 
    focus:outline-none
    dark:bg-transparent
    dark:text-slate-300
  `,
  alert: `
    bg-blue-100 
    rounded-lg 
    py-5 
    px-6 
    mb-4 
    text-base 
    text-blue-700 
    mb-3
    dark:bg-transparent
    dark:border
    dark:border-solid
    dark:border-blue-600
  `
}
