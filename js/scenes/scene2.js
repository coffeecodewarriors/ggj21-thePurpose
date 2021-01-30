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
        this.collisionMicrochip = false
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
        if(this.inventory.microchip.isPicked){
            this.createMicrochip()
        }

        // polygons
        this.createPolygons()

        // collider
        this.createColliders()

        // debuger pointer
        this.createDebugPointer()
    }

    // --- END CREATE METHOD ---

    update(){
        this.player.stopPlayer(this.target)
       // debuger pointer
       this.updateDebugPointer()
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

        this.physics.add.overlap(this.player, this.microchip, () => {
            this.collisionMicrochip = true
        })
        this.collisionMicrochip = false
    }

    createRobot = () => {
        this.robot = this.add.image(0, 0, 'robot').setInteractive()
        this.robot.setOrigin(0,0)
        this.robot.x = 818
        this.robot.y = 66
        this.robot.on('pointerdown', () => {
        })
        this.robot.on('pointerover', () => {
            this.robotText = this.add.text(config.width/2, customConfig.text.y, this.inventory.robot.text, {
                font: '25px Arial',
                fill: 'white'
            }).setOrigin(0.5)
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
                if(this.collisionLaptop && this.inventory.battery.isPicked && !this.inventory.microchip.isPicked){
                    this.light.visible ? null : this.light.visible = true
                    this.battery.visible ? this.battery.visible = false : null
                    // this.microchip.visible ? null : this.microchip.visible = true
                    this.inventory.battery.isUsed = true
                    this.createMicrochip()
                    this.createColliders()
                }
            })
            this.laptop.on('pointerover', () => {
                this.laptopText = this.add.text(config.width/2, customConfig.text.y, this.inventory.laptop.text, customConfig.fontText).setOrigin(0.5)
            })
            this.laptop.on('pointerout', () => {
                this.laptopText.destroy(this.laptopText.x, this.laptopText.y)
            })
    }

    createBattery = () => {
        if(this.inventory.battery.isPicked){
            this.battery = this.items.create(0, 0, 'battery').setInteractive().setImmovable()
            this.battery.setOrigin(0,0)
                this.battery.x = customConfig.slot1.x
                this.battery.y = customConfig.slot1.y
                if(this.inventory.battery.isUsed){
                    this.battery.visible = false
                    return
                }
            this.battery.on('pointerover', () => {
                this.battery.alpha = 0.5
                this.batteryText = this.add.text(config.width/2, customConfig.text.y, this.inventory.battery.text, customConfig.fontText).setOrigin(0.5)
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
    createMicrochip = () => {
        this.microchip = this.items.create(0,0, 'microchip').setInteractive().setImmovable()
        this.microchip.setOrigin(0,0)
        if(this.inventory.microchip.isPicked){
            this.microchip.x = customConfig.slot1.x
            this.microchip.y = customConfig.slot1.y
            return
        }else {
            this.microchip.x = 600
            this.microchip.y = 550
        }
        this.light.visible ? this.microchip.visible = true : this.microchip.visible = false

        this.microchip.on('pointerover', () => {
            this.microchip.alpha = 0.5
            this.microchipText = this.add.text(config.width/2, customConfig.text.y, this.inventory.microchip.text, customConfig.fontText).setOrigin(0.5)
        })
        this.microchip.on('pointerout', () => {
            this.microchip.alpha = 1
            this.microchipText.destroy(this.microchipText.x, this.microchipText.y)
        })
        this.microchip.on('pointerdown', () => {
            if(this.collisionMicrochip && !this.inventory.microchip.isPicked){
                this.inventory.microchip.isPicked = true
                this.microchip.x = customConfig.slot1.x
                this.microchip.y = customConfig.slot1.y
            }
        })
    }

    createPolygons = () => {
        this.depuradoraZone = this.add.zone(582, 405, 104, 201).setInteractive()
        this.depuradoraZone.on('pointerover', () => {
            this.depuradoraText = this.add.text(config.width/2, customConfig.text.y, this.inventory.depuradora.text, customConfig.fontText).setOrigin(0.5)
        })
        this.depuradoraZone.on('pointerout', () => {
            this.depuradoraText.destroy(this.depuradoraText.x, this.depuradoraText.y)
        })

        this.assistantV2Zone = this.add.zone(258, 366, 150, 233).setInteractive()
        this.assistantV2Zone.on('pointerover', () => {
            this.assistantV2Text = this.add.text(config.width/2, customConfig.text.y, this.inventory.assistantV2.text, customConfig.fontText).setOrigin(0.5)
        })
        this.assistantV2Zone.on('pointerout', () => {
            this.assistantV2Text.destroy(this.assistantV2Text.x, this.assistantV2Text.y)
        })



    }

    // --- DEBUGGER ---
    createDebugPointer = () => {
        this.debugText = this.add.text(10, 10, '', {
            font: '16px Courier',
            fill: 'red'
        })
    }
    updateDebugPointer = () => {
        let p = this.input.activePointer
        this.debugText.setText([
            'x: ' + p.x,
            'y: ' + p.y
        ])
    }
}