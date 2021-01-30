import { config } from "../config.js"
import { Player } from "../player/player.js"

export class Scene2 extends Phaser.Scene {
    constructor(){
        super('scene2')
        this.target = new Phaser.Math.Vector2()
        this.configPlayer = {
            scene: this,
            x: config.width/2 - 50,
            y: config.height - 50
        }
        this.inventory = {}
    }
    init = (data) => {
        this.inventory = data.inventory
    }
    preload = () => {
    }
    create = () => {
        this.bg2 = this.add.tileSprite(0, 0, config.width, config.height, 'bg-scene2')
        this.bg2.setOrigin(0,0)

        this.anims.create({
            key: 'playerAnim',
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 15,
            repeat: -1
        })

        // items
        this.items = this.add.group()

        this.player = this.physics.add.existing(new Player(this.configPlayer))
        this.input.on('pointerdown', this.player.movePlayer, this)
        this.pointer = this.input.mousePointer
    }
    update = () => {
        this.player.stopPlayer(this.target)
    }
}