import { Load } from './scenes/load.js'
import { Scene2 } from './scenes/scene2.js'
import { Scene1 } from './scenes/scene1.js'
import { Intro } from './scenes/introScene.js'
import { Ending } from './scenes/endingScene.js'


export const config = {
  width: 1280,
  height: 720,
  backgroundColor: 0x000000,
  autoCenter: true,
  scene: [Load, Intro, Scene1, Scene2, Ending],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

export const customConfig = {
  slot1: {
    x: 1070,
    y: 20
  },
  text:{
    x: 300,
    y: 680
  },
  fontText: {
    font: '25px Arial',
    fill: 'white',
    boundsAlignH: 'center',
    boundsAlignV: 'center'
  }
}

export const inventory = {
  robot:{
    text: `I used this robot as a portable medium to provide light where it was needed. It has a big lens in the middle`
  },
  laptop:{
    text: `An old laptot. Need some battery...`
  },
  battery:{
    text: `A battery`,
    isPicked: false,
    isUsed: false
  },
  microchip: {
    text: 'A microchip. It was hidden in the dark...',
    isPicked: false,
    isUsed: false
  },
  light: {
    isOn: false
  },
  pcb: {
    text: `A smal PCB board hangs on a board...`,
    isPicked: false,
    isUsed: false
  },
  billboard: {
    text: `My old billboard... it's broken. I no longer remember what it advertised`
  },
  controlPanel: {
    text: `It's the control panel of the billboard. Controller is missing...`
  },
  omatic:{
    text: `Control-O-matic 3000: Print PCBs and integrate chips easily`
  },
  depuradora: {
    text: `"I invented that compact treatment plant to supply water to small needy populations"`
  },
  assistantV2:{
    text: `Asistant-O matic v2: with this assistant I wanted to facilitate housework for disable people`
  },
  robofriend: {
    text: `It was programmed with various game dynamics to cheer up the children in the hospital`
  },
  assistant: {
    text: `I was working on an early disease detection assistant... but i quit`
  }
};
