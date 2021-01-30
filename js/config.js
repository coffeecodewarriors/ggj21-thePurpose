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
    x: 1075,
    y: 20
  },
  text:{
    x: 300,
    y: 680
  },
  fontText: {
    font: '25px Arial',
    fill: 'white'
  }
}

export const inventory = {
  robot:{
    text: `I used to be a robot... It looks like it has a big lens in the center`
  },
  laptop:{
    text: `An old laptot. Need some battery...`
  },
  battery:{
    text: `A battery`,
    isPicked: false,
    isUsed: false
  },
  item: {
    text: 'I am an item',
    isPicked: false
  },
  light: {
    isOn: false
  },
  billboard: {
    text: `My old billboard... it's broken. I no longer remember what it advertised`
  },
  controlPanel: {
    text: `It's the control panel of the billboard. Controller is missing...`
  },
  omatic:{
    text: `Control-O-matic 3000: Print PCBs and integrate chips easily`
  }
};
