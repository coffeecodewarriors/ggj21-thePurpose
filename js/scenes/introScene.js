import { inventory } from '../config.js'

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
        this.add.text(200, 200, 'Iniciando el juego...', {
            font: '25px Arial',
            fill: 'red'
        })
        this.startBtn = this.add.image()
        this.startBtn.on('pointerdown', () => {
            this.scene.stop('introScene')
            this.scene.start('scene1', { inventory })
        })
    }
}