import { config, customConfig } from "../config.js"
import { Player } from "../player/player.js"

export class Scene1 extends Phaser.Scene {
    constructor(){
        super('scene1')
        this.target = new Phaser.Math.Vector2()
        this.configPlayer = {
            scene: this,
            x: config.width/2 + 150,
            y: config.height - 225
        }
        this.inventory = {}
        this.collisionBattery = false
    }
    init = (data) => {
        this.inventory = data.inventory

        if(data.scene === 'scene2'){
            this.configPlayer.x = 1150
            return
        }
    }
    preload = () => {
    }
    create = () => {
        console.log(this)
        this.bg2 = this.add.tileSprite(0, 0, config.width, config.height, 'bg-scene2')
        this.bg2.setOrigin(0,0)

        this.anims.create({
            key: 'playerAnim',
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 15,
            repeat: -1
        })

        // billboard
        this.createBillboard()

        // control panel
        this.createControlPanel()

        // o-matic 3000
        this.createOmatic()

        // items
        this.items = this.physics.add.group()

        // battery
        this.createBattery()

        // item
        this.createItem()

        // player
        this.createPlayer()

        // colliders
        this.createColliders()
        
    }
    update = () => {
        this.player.stopPlayer(this.target)
    }
    createPlayer = () => {
        this.player = this.physics.add.existing(new Player(this.configPlayer))
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(20, 250, 1280, 720))
        this.player.body.onWorldBounds = true
        this.physics.world.on('worldbounds', () => {
            this.player.stopPlayer()
        })
        this.input.on('pointerdown', this.player.movePlayer, this)
        this.pointer = this.input.mousePointer
    }
    createColliders = () => {
        this.physics.add.overlap(this.player, this.battery, () => {
            this.collisionBattery = true
        })
        this.collisionBattery = false
    }
    createBattery = () => {
        this.battery = this.items.create(0, 0, 'battery').setInteractive().setImmovable()
        this.battery.setOrigin(0,0)
        this.battery.x = 300
        this.battery.y = 550
        if(this.inventory.battery.isPicked){
            this.battery.x = customConfig.slot1.x
            this.battery.y = customConfig.slot1.y
        }

        this.battery.on('pointerover', () => {
            this.battery.alpha = 0.5
            this.batteryText = this.add.text(customConfig.text.x, customConfig.text.y, this.inventory.battery.text, customConfig.fontText)
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
        if(this.inventory.battery.isPicked){
            this.battery.visible = true
            if(this.inventory.battery.isUsed){
                this.battery.visible = false
            }
        }
    }
    createBillboard = () => {
        this.billboard = this.add.image(0, 0, 'billboard').setInteractive()
        this.billboard.setOrigin(0, 0)
        this.billboard.x = 178
        this.billboard.y = 70
        this.billboard.alpha = 0.5
        this.billboard.on('pointerover', () => {
            this.billboardText = this.add.text(customConfig.text.x, customConfig.text.y, this.inventory.billboard.text, customConfig.fontText)
        })
        this.billboard.on('pointerout', () => {
            this.billboardText.destroy(this.billboardText.x, this.billboardText.y)
        })

    }
    createItem = () => {
        if(this.inventory.item.isPicked){
            this.item = this.items.create(0, 0, 'battery').setInteractive().setImmovable()
            this.item.setOrigin(0, 0)
            this.item.x = 1150
            this.item.y = 20
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
        }
    }
    createControlPanel = () => {
        this.controlPanel = this.add.image(0, 0, 'control-panel').setInteractive()
        this.controlPanel.setOrigin(0, 0)
        this.controlPanel.x = 1036
        this.controlPanel.y = 315
        this.controlPanel.on('pointerover', () => {
            this.controlPanelText = this.add.text(customConfig.text.x, customConfig.text.y, this.inventory.controlPanel.text, customConfig.fontText)
        })
        this.controlPanel.on('pointerout', () => {
            this.controlPanelText.destroy(this.controlPanelText.x, this.controlPanelText.y)
        })
    }
    createOmatic = () => {
        this.omatic = this.add.image(0,0, 'omatic').setInteractive()
        this.omatic.setOrigin(0,0)
        this.omatic.y = 340
        this.omatic.on('pointerover', () => {
            this.omaticText = this.add.text(customConfig.text.x, customConfig.text.y, this.inventory.omatic.text, customConfig.fontText)
        })
        this.omatic.on('pointerout', () => {
            this.omaticText.destroy(this.omaticText.x, this.omaticText.y)
        })
    }
}