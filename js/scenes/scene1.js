import { config } from '../config.js'
import { Player } from '../player/player.js'

export class Scene1 extends Phaser.Scene {
    constructor(){
        super('scene1')
        this.target = new Phaser.Math.Vector2()
        this.configPlayer = {
            scene: this,
            x: config.width/2 - 50,
            y: config.height - 50
        }
        this.inventory = {}
    }
    init = (data) => {
        if(data.inventory){
            this.inventory = data.inventory
        }
        if(data.scene === 'scene2'){
            this.configPlayer.x = 70
            return
        }
    }
    create = () => {
        this.element = this.add.tileSprite(0, 0, config.width, config.height, '')
        this.element.setOrigin(0,0)

        this.anims.create({
            key: 'playerAnim',
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 15,
            repeat: -1
        })

        // items
        this.items = this.physics.add.group()

        // robot
        this.robot = this.add.image(0, 0, 'robot').setInteractive()
        this.robot.setOrigin(0,0)
        this.robot.on('pointerdown', () => {
            console.log('hola')
        })

        // laptop
        this.laptop = this.add.image(0,0, 'laptop').setInteractive()
        this.laptop.setOrigin(0,0)
        this.laptop.on('pointerdown', () => {
            console.log('soy laptop')
        })

        // player
        this.player = this.physics.add.existing(new Player(this.configPlayer))
        this.input.on('pointerdown', this.player.movePlayer, this)
        this.pointer = this.input.mousePointer

        // collider
        this.physics.add.collider(this.player, this.items, () => {
            this.player.stopPlayer()
        })
        
    }
    update(){
        this.player.stopPlayer(this.target)

        
    }
}