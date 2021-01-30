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
        this.add.text(500, 200, 'Iniciando el juego...', {
            font: '25px Arial',
            fill: 'red'
        })
        this.startBtn = this.add.text(500, 300, 'START', {
            font: '25px Arial',
            fill: 'blue'
        }).setInteractive()
        this.startBtn.on('pointerdown', () => {
            this.scene.stop('introScene')
            this.scene.start('scene2', { inventory })
        })
    }
}