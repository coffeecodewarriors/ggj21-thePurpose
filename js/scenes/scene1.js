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
        this.collisionLaptop = false
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
        this.robot.on('pointerover', () => {
            this.robotText = this.add.text(300, 680, this.inventory.robot.text, {
                font: '25px Arial',
                fill: 'white'
            })
        })
        this.robot.on('pointerout', () => {
            this.robotText.destroy(this.robotText.x, this.robotText.y)
        })

        // laptop
        this.laptop = this.items.create(0,0, 'laptop').setInteractive().setImmovable()
        this.laptop.setOrigin(0,0)
        this.laptop.x = 1143
        this.laptop.y = 543
        this.laptop.inputEnabled = true
        console.log(this.laptop)
            this.laptop.on('pointerdown', () => {
                if(this.collisionLaptop){
                    this.light.visible ? null : this.light.visible = true
                }
            })
            this.laptop.on('pointerover', () => {
                this.laptopText = this.add.text(300, 680, this.inventory.laptop.text, {
                    font: '25px Arial',
                    fill: 'white'
                })
            })
            this.laptop.on('pointerout', () => {
                this.laptopText.destroy(this.laptopText.x, this.laptopText.y)
            })
            

        // player
        this.player = this.physics.add.existing(new Player(this.configPlayer))
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 360, 1280, 720))
        this.player.body.onWorldBounds = true
        this.physics.world.on('worldbounds', () => {
            this.player.stopPlayer()
        },this)
        // this.physics.world.on('worldbounds', this.player.onWorldBounds, this)
        this.input.on('pointerdown', this.player.movePlayer, this)
        this.pointer = this.input.mousePointer

        // light
        this.light = this.add.image(0,0, 'robot-light')
        this.light.setOrigin(0,0)
        this.light.visible = false

        // collider
        this.physics.add.collider(this.player, this.laptop, () => {
            this.player.stopPlayer()
            this.collisionLaptop = true
        })
        this.collisionLaptop = false
    }
    update(){

        

        this.player.stopPlayer(this.target)
        
    }
}