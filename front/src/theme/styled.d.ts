declare module 'styled-components' {
  /* eslint-disable no-unused-vars */
  export type ColorsNames =
    | 'rose'
    | 'pink'
    | 'fuchsia'
    | 'purple'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'sky'
    | 'cyan'
    | 'teal'
    | 'emerald'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'amber'
    | 'orange'
    | 'red'
    | 'warmGray'
    | 'trueGray'
    | 'gray'
    | 'coolGray'
    | 'blueGray'

  type ColorsVariations =
    | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900

  type MainColors = {
    'black': string
    'white': string
  }

  export type Colors = MainColors & Record<ColorsNames, {
    [K in ColorsVariations]: string
  }>

  export interface DefaultTheme {
    colors: Colors
  }
}

export {}