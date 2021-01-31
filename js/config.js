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
  robot: {
    text: `I used this robot as a portable medium to provide light where it was needed. It has a large lens in the middle.`,
  },
  laptop: {
    text: `An old laptop connected to the robot. It seems off.`,
  },
  battery: {
    text: `It looks like a battery. It could be useful for something...`,
    isPicked: false,
    isUsed: false,
  },
  microchip: {
    text: "It's a microchip. It was hidden in the dark...",
    isPicked: false,
    isUsed: false,
    isShowed: false,
  },
  light: {
    isOn: false,
  },
  pcb: {
    text: `A small PCB board hangs on a hook.`,
    isPicked: false,
    isUsed: false,
  },
  controller: {
    text: `A fully and operational controller.`,
    isPicked: true,
    isUsed: false,
    isDone: false,
  },
  billboard: {
    text: `My old billboard... it's broken. I no longer remember what it advertised.`,
  },
  controlPanel: {
    text: `It's the control panel of the billboard. Controller is missing...`,
  },
  omatic: {
    text: `"Control-O-Matic 3000: Print PCBs and integrate chips easily."`,
  },
  depuradora: {
    text: `I invented that compact treatment plant to supply water to small needy populations.`,
  },
  assistantV2: {
    text: `Assistant-O-Matic v2: wMatichis assistant I wanted to facilitate housework for disable people.`,
  },
  robofriend: {
    text: `"Robofriend" It was programmed with various game dynamics to cheer up the children in the hospital.`,
  },
  assistant: {
    text: `I was working on an early disease detection assistant... but i quit.`,
  },
};
