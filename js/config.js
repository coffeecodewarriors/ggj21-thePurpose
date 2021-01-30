import { Load } from './scenes/load.js'
import { Scene1 } from './scenes/scene1.js'
import { Scene2 } from './scenes/scene2.js'
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

export const inventory = {
  robot:{
    text: `I used to be a robot`
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
  }
};
