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
    preload = () => {}
    create = () => {
        this.bg1 = this.add.tileSprite(0, 0, config.width, config.height, 'bg-scene1')
        this.bg1.setOrigin(0,0)

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
        this.robot.x = 818
        this.robot.y = 66
        this.robot.on('pointerdown', () => {
            
        })

        


        // laptop
        this.laptop = this.add.image(0,0, 'laptop').setInteractive()
        this.laptop.setOrigin(0,0)
        this.laptop.x = 1143
        this.laptop.y = 543
        this.laptop.on('pointerdown', () => {
            this.light.visible ? this.light.visible = false : this.light.visible = true
        })

        // player
        this.player = this.physics.add.existing(new Player(this.configPlayer))
        this.input.on('pointerdown', this.player.movePlayer, this)
        this.pointer = this.input.mousePointer

        // light
        this.light = this.add.image(0,0, 'robot-light')
        this.light.setOrigin(0,0)
        this.light.visible = false

        // collider
        this.physics.add.collider(this.player, this.items, () => {
            this.player.stopPlayer()
        })
        console.log(this)
    }
    update(){
        this.player.stopPlayer(this.target)

        
    }
}