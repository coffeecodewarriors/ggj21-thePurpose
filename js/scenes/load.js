import { inventory } from '../config.js'

export class Load extends Phaser.Scene {
    constructor(){
        super('bootGame')
    }
    preload = () => {
        this.load.image('bg-scene1', '../../assets/img/scene-3-bg.png')

        this.load.image('robot', '../../assets/img/robot.png')
        this.load.image('robot-light', '../../assets/img/robot-light.png')

        this.load.image('laptop', '../../assets/img/laptop.png')

        this.load.spritesheet('player', '../../assets/img/player-sprite.png', {
            frameWidth: 98,
            frameHeight: 229
        })

        // this.load.audio()
    }
    create = () => {
        this.add.text(20, 20, 'Loading game...')
        this.scene.start('introScene')
        // let music = this.sound.add('', { loop: true })
        // this.sound.add()
        // music.play()
    }
}