import { inventory } from '../config.js'
import { config, customConfig } from '../config.js'

export class Intro extends Phaser.Scene {
    constructor(){
        super('introScene')
        this.inventory = {}
    }
    init = (data) => {
        this.inventory = data
    }
    preload = () => {
        this.load.scenePlugin(
            'rexuiplugin',
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            'rexUI',
            'rexUI'
          )
    }
    create = () => {
        this.introBg = this.add.tileSprite(0, 0, config.width, config.height, 'intro')
        this.introBg.setOrigin(0, 0)
        
        this.startBtn = this.add.text(1100, 650, 'START', {
            font: '35px Arial',
            fill: 'white'
        }).setInteractive()
        this.startBtn.on('pointerdown', () => {
            this.scene.stop('introScene')
            this.scene.start('scene1', { inventory, music: this.music })
        })
        this.startBtn.on('pointerover', () => {
            this.startBtn.alpha = 0.5
        })
        this.startBtn.on('pointerout', () => {
            this.startBtn.alpha = 1
        })
        this.title = this.add.text(150, 50, 'The Purpose', {
            font: '40px Arial',
            fill: 'white'
        })
        this.explanation = this.add.text(150, 150, 'Lorem Impsum', customConfig.fontText)
        
        this.music = this.sound.add("theme", {
            loop: true,
            volume: 1
          });
          // this.sound.add("playerStep");
          this.music.play();
        this.slider = this.rexUI.add.slider({
            x:200,
            y: 300,
            width: 200,
            height: 20,
            orientation: 'x',
            track: this.rexUI.add.roundRectangle(0,0,0,0,4,0xFFFFFF),
            thumb: this.rexUI.add.roundRectangle(0,0,0,0,10,0xC2C2C2),
            valuechangeCallback: (value) => {
                this.music.volume = value
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag',
            value: this.music.volume
        }).layout()
    }
    update(){
    }
}