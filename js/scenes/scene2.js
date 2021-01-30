import { config, customConfig } from '../config.js'
import { Player } from '../player/player.js'

export class Scene2 extends Phaser.Scene {
    constructor(){
        super('scene2')
        this.target = new Phaser.Math.Vector2()
        this.configPlayer = {
            scene: this,
            x: config.width - 80,
            y: config.height - 150
        }
        this.inventory = {}
        this.collisionLaptop = false
        this.collisionBattery = false
        this.collisionItem = false
    }
    init = (data) => {
        if(data.inventory){
            this.inventory = data.inventory
        }
        if(data.scene === 'scene1'){
            this.configPlayer.x = 100
            return
        }
    }
    preload = () => {}
    create = () => {
        console.log(this)
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
        this.createRobot()

        // laptop
        this.createLaptop()
            

        // player
        this.createPlayer()

        // light
        this.createLight()

        this.ui = this.add.image(config.width/2, config.height/2, 'ui')

        // battery
        this.createBattery()

        // item
        this.createItem()

        // collider
        this.createColliders()
    }
    update(){
        this.player.stopPlayer(this.target)
    }

    createPlayer = () => {
        this.player = this.physics.add.existing(new Player(this.configPlayer))
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(20, 250, 1280, 720))
        this.player.body.onWorldBounds = true
        this.physics.world.on('worldbounds', () => {
            this.player.stopPlayer()
        },this)
        this.input.on('pointerdown', this.player.movePlayer, this)
        this.pointer = this.input.mousePointer
        console.log(this.player)
    }

    createColliders = () => {
        this.physics.add.collider(this.player, this.laptop, () => {
            this.player.stopPlayer()
            this.collisionLaptop = true
        })
        this.collisionLaptop = false
        this.physics.add.overlap(this.player, this.battery, () => {
            this.collisionBattery = true
        })
        this.collisionBattery = false
        this.physics.add.overlap(this.player, this.item, () => {
            this.collisionItem = true
        })
        this.collisionItem = false
    }

    createRobot = () => {
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
    }

    createLight = () => {
        this.light = this.add.image(0,0, 'robot-light')
        this.light.setOrigin(0,0)
        this.light.visible = false
        if(this.inventory.battery.isUsed){
            this.light.visible = true
            return
        }
    }

    createLaptop = () => {
        this.laptop = this.items.create(0,0, 'laptop').setInteractive().setImmovable()
        this.laptop.setOrigin(0,0)
        this.laptop.x = 1143
        this.laptop.y = 543
        this.laptop.inputEnabled = true
            this.laptop.on('pointerdown', () => {
                if(this.collisionLaptop){
                    this.light.visible ? null : this.light.visible = true
                    this.battery.visible ? this.battery.visible = false : null
                    this.item.visible ? null : this.item.visible = true
                    this.inventory.battery.isUsed = true
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
    }

    createBattery = () => {
        if(this.inventory.battery.isPicked){
            this.battery = this.items.create(0, 0, 'battery').setInteractive().setImmovable()
            this.battery.setOrigin(0,0)
            if(this.inventory.battery.isPicked){
                this.battery.x = customConfig.slot1.x
                this.battery.y = customConfig.slot1.y
                if(this.inventory.battery.isUsed){
                    this.battery.visible = false
                    return
                }
                return
            }
    
            this.battery.on('pointerover', () => {
                this.battery.alpha = 0.5
                this.batteryText = this.add.text(300, 680, this.inventory.battery.text, {
                    font: '25px Arial',
                    fill: 'white'
                })
            })
            this.battery.on('pointerout', () => {
                this.battery.alpha = 1
                this.batteryText.destroy(this.batteryText.x, this.batteryText.y)
            })
            this.battery.on('pointerdown', () => {
                if(this.collisionBattery && !this.inventory.battery.isPicked){
                    this.inventory.battery.isPicked = true
                    this.battery.x = customConfig.slot1.x
                    this.battery.y = customConfig.slot1.y
                }
            })
        }
    }
    createItem = () => {
        this.item = this.items.create(0,0, 'battery').setInteractive().setImmovable()
        this.item.setOrigin(0,0)
        if(this.inventory.item.isPicked){
            this.item.x = 1150
            this.item.y = 20
            return
        }
        this.item.x = 600
        this.item.y = 550
        this.light.visible ? this.item.visible = true : this.item.visible = false

        this.item.on('pointerover', () => {
            this.item.alpha = 0.5
            this.itemText = this.add.text(300, 680, this.inventory.battery.text, {
                font: '25px Arial',
                fill: 'white'
            })
        })
        this.item.on('pointerout', () => {
            this.item.alpha = 1
            this.itemText.destroy(this.itemText.x, this.itemText.y)
        })
        this.item.on('pointerdown', () => {
            if(this.collisionItem && !this.inventory.item.isPicked){
                this.inventory.item.isPicked = true
                this.item.x = 1150
                this.item.y = 20
            }
        })
    }
}