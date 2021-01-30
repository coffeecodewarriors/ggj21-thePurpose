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
            this.scene.start('scene1', { inventory })
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
        console.log(this)
    }
}