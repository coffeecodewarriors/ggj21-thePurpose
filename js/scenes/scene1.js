import { config, customConfig, inventory } from "../config.js"
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
        this.collisionPcb = false
        this.collisionOmatic = false
        this.collisionPanel = false
        this.resstarted = false
    }
    init = (data) => {
        console.log(data)
        this.music = data.music
        this.inventory = data.inventory

        if(data.restarted){
            this.configPlayer.x = config.width/2 + 150
            return
        }

        if(data.scene === 'scene2'){
            this.configPlayer.x = 1150
            return
        }
    }
    preload = () => {
        this.load.scenePlugin(
            'rexuiplugin',
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            'rexUI',
            'rexUI'
          )
    }
    create = () => {
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        
        console.log(this)
        this.bg2 = this.add.tileSprite(0, 0, config.width, config.height, 'bg-scene2')
        this.bg2.setOrigin(0,0)
        this.ui = this.add.tileSprite(0, 0, config.width, config.height, 'ui')
        this.ui.setOrigin(0,0)

        this.anims.create({
            key: 'playerAnim',
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'arrow',
            frames: [
                // {key: 'arrow1'},
                {key: 'arrow2'},
                {key: 'arrow3', duration: 1800}
            ],
            frameRate: 2,
            repeat: -1
        })
        this.arrow = this.add.sprite(config.width - 50, config.height/2, 'arrow2').play('arrow')
        
        // billboard
        this.createBillboard()

        // items
        this.items = this.physics.add.group()

        // control panel
        this.createControlPanel()


        // o-matic 3000
        this.createOmatic()

        // battery
        this.createBattery()

        // Microchip
        this.createMicrochip()

        // PCB
        this.createPcb()

        // controller
        if(this.inventory.controller.isDone){
            this.createController()
        }

        // player
        this.createPlayer()

        // colliders
        this.createColliders()

        // polygons
        this.createPolygons()

        // debugger
        // this.createDebugPointer()

        //slider
        this.createIcons()
        
    }
    update = () => {
        this.player.stopPlayer(this.target)

        // this.updateDebugPointer()
    }
    createPlayer = () => {
        this.player = this.physics.add.existing(new Player(this.configPlayer))
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(20, 250, 1280, 720))
        this.player.body.onWorldBounds = true
        this.physics.world.on('worldbounds', () => {
            this.player.stopPlayer()
        })
        this.pointer = this.input.mousePointer
        this.input.on('pointerdown', () => {
            if(this.pointer.y > 350){
                this.player.movePlayer()
            }
        }, this)
        // if(this.pointer.y > 250){
        //     this.input.on('pointerdown', this.player.movePlayer, this)
        // }
    }
    createColliders = () => {
        this.physics.add.collider(this.player, this.omatic, () => {
            this.player.stopPlayer()
            this.collisionOmatic = true
        })
        this.collisionOmatic = false

        this.physics.add.overlap(this.player, this.battery, () => {
            this.collisionBattery = true
        })
        this.collisionBattery = false

        this.physics.add.overlap(this.player, this.pcb, () => {
            this.collisionPcb = true
        })
        this.collisionPcb = false

        this.physics.add.overlap(this.player, this.controlPanel, () => {
            this.collisionPanel = true
        })
        this.collisionPanel = false
    }
    createBattery = () => {
        if(!this.inventory.battery.isPicked){
            this.battery = this.items.create(0, 0, 'battery').setInteractive().setImmovable()
            this.battery.setOrigin(0,0)
            this.battery.x = 300
            this.battery.y = 550
        }
        if(this.inventory.battery.isPicked){
            this.battery = this.items.create(0, 0, 'battery').setInteractive().setImmovable()
            this.battery.setOrigin(0,0)
            this.battery.x = customConfig.slot1.x
            this.battery.y = customConfig.slot1.y
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
            this.billboardText = this.add.text(config.width/2, customConfig.text.y, this.inventory.billboard.text, customConfig.fontText).setOrigin(0.5)
        })
        this.billboard.on('pointerout', () => {
            this.billboardText.destroy(this.billboardText.x, this.billboardText.y)
        })

    }
    createMicrochip = () => {
        if(this.inventory.microchip.isPicked && !this.inventory.microchip.isUsed){
            this.microchip = this.items.create(0, 0, 'microchip').setInteractive().setImmovable()
            this.microchip.setOrigin(0, 0)
            this.microchip.x = customConfig.slot1.x -5
            this.microchip.y = customConfig.slot1.y
            this.microchip.on('pointerover', () => {
                this.microchip.alpha = 0.5
                this.microchipText = this.add.text(config.width/2, customConfig.text.y, this.inventory.microchip.text, customConfig.fontText).setOrigin(0.5)
            })
            this.microchip.on('pointerout', () => {
                this.microchip.alpha = 1
                this.microchipText.destroy(this.microchipText.x, this.microchipText.y)
            })
        }
    }
    createPcb = () => {
        this.pcb = this.items.create(0, 0, 'pcb').setInteractive().setImmovable()
        this.pcb.setOrigin(0,0)
        if(!this.inventory.pcb.isPicked){
            this.pcb.x = 530,
            this.pcb.y = 368
        }
        else{
            this.pcb.x = customConfig.slot1.x + 67
            this.pcb.y = customConfig.slot1.y + 1
            this.pcb.visible = true
            if(this.inventory.pcb.isUsed){
                this.pcb.visible = false
            }
        }
        this.pcb.on('pointerover', () => {
            this.pcb.alpha = 0.5
            this.pcbText = this.add.text(config.width/2, customConfig.text.y, this.inventory.pcb.text, customConfig.fontText).setOrigin(0.5)
        })
        this.pcb.on('pointerout', () => {
            this.pcb.alpha = 1
            this.pcbText.destroy(this.pcbText.x, this.pcbText.y)
        })
        this.pcb.on('pointerdown', () => {
            if(this.collisionPcb && !this.inventory.pcb.isPicked){
                this.inventory.pcb.isPicked = true
                this.pcb.x = customConfig.slot1.x + 67
                this.pcb.y = customConfig.slot1.y + 1
            }
        })
    }
    createControlPanel = () => {
        this.controlPanel = this.items.create(0, 0, 'control-panel').setInteractive()
        this.controlPanel.setOrigin(0, 0)
        this.controlPanel.x = 1036
        this.controlPanel.y = 315
        this.controlPanel.on('pointerover', () => {
            this.controlPanelText = this.add.text(config.width/2, customConfig.text.y, this.inventory.controlPanel.text, customConfig.fontText).setOrigin(0.5)
        })
        this.controlPanel.on('pointerout', () => {
            this.controlPanelText.destroy(this.controlPanelText.x, this.controlPanelText.y)
        })
        this.controlPanel.on('pointerdown', () => {
            if(this.collisionPanel && this.inventory.controller.isDone){
                this.controller.visible = false
                this.changeScene()
            }
        })
    }
    changeScene = () => {
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.time.delayedCall(1000, () => {
                this.scene.start('endScene',{
                    music: this.music
                })
            })
        })
    }
    createOmatic = () => {
        this.omatic = this.items.create(0,0, 'omatic').setInteractive().setImmovable()
        this.omatic.setOrigin(0,0)
        this.omatic.y = 340
        this.omatic.inputEnabled = true
        this.omatic.on('pointerdown', () => {
            if(this.collisionOmatic && this.inventory.microchip.isPicked && this.inventory.pcb.isPicked){
                this.microchip.visible ? this.microchip.visible = false : null
                this.pcb.visible ? this.pcb.visible = false : null
                this.inventory.microchip.isUsed = true
                this.inventory.pcb.isUsed = true
                this.createController()
                this.inventory.controller.isDone = true
            }
        })
        this.omatic.on('pointerover', () => {
            this.omaticText = this.add.text(config.width/2, customConfig.text.y, this.inventory.omatic.text, customConfig.fontText).setOrigin(0.5)
        })
        this.omatic.on('pointerout', () => {
            this.omaticText.destroy(this.omaticText.x, this.omaticText.y)
        })
    }
    createController = () => {
        this.controller = this.items.create(0, 0, 'controller').setInteractive()
        this.controller.setOrigin(0,0)
        this.controller.x = customConfig.slot1.x - 3
        this.controller.y = customConfig.slot1.y + 5
        this.controller.on('pointerover', () => {
            this.controllerText = this.add.text(config.width/2, customConfig.text.y, this.inventory.controller.text, customConfig.fontText).setOrigin(0.5)
        })
        this.controller.on('pointerout', () => {
            this.controllerText.destroy(this.controllerText.x, this.controllerText.y)
        })
    }

    createPolygons = () => {
        this.robofriendZone = this.add.zone(234, 441, 70, 92).setInteractive()
        this.robofriendZone.on('pointerover', () => {
            this.robofriendText = this.add.text(config.width/2, customConfig.text.y, this.inventory.robofriend.text, customConfig.fontText).setOrigin(0.5)
        })
        this.robofriendZone.on('pointerout', () => {
            this.robofriendText.destroy(this.robofriendText.x, this.robofriendText.y)
        })

        this.assistantZone = this.add.zone(1209, 415, 60, 166).setInteractive()
        this.assistantZone.on('pointerover', () => {
            this.assistantText = this.add.text(config.width/2, customConfig.text.y, this.inventory.assistant.text, customConfig.fontText).setOrigin(0.5)
        })
        this.assistantZone.on('pointerout', () => {
            this.assistantText.destroy(this.assistantText.x, this.assistantText.y)
        })
    }

    createWords = () => {
        this.textObject = this.add.text(600, 240, ' Thecnology for Humankind', {fontSize: '55px'}).setOrigin(0.5).setVisible(false)
        this.bitmapZone = this.plugins.get('rexbitmapzoneplugin').add(this.textObject)
        this.particles = this.add.particles('flares').setPosition(this.textObject.x, this.textObject.y)
        this.emitter = this.particles.createEmitter({
            blendMode: 'ADD',
            scale: { start: 0.01, end: 0.03},
            quantity: 300,
            speed: 2,
            gravityY: -10,
            emitZone: {
                type: 'random',
                source: this.bitmapZone
            }
        })
    }
    createIcons = () => {
        this.musicOff = this.add.image(0, 0, 'audio-off').setInteractive().setOrigin(0,0)
        this.musicOff.x = 30
        this.musicOff.y = 10
        this.musicOff.on('pointerover', () => {
            this.musicOff.alpha = 0.5
        })
        this.musicOff.on('pointerout', () => {
            this.musicOff.alpha = 1
        })
        this.musicOff.on('pointerdown', () => {
            if(this.music.isPlaying){
                this.music.pause()
            }else{
                this.music.resume()
            }
        })
        this.musicLevel = this.add.image(0, 0, 'audio-icon').setInteractive().setOrigin(0,0)
        this.musicLevel.x = 70
        this.musicLevel.y = 10
        this.musicLevel.on('pointerover', () => {
            this.musicLevel.alpha = 0.5
        })
        this.musicLevel.on('pointerout', () => {
            this.musicLevel.alpha = 1
        })
        this.musicLevel.on('pointerdown', () => {
            if(!this.showVolume){
                this.showVolume = true
                this.createSlider()
            }else{
                this.showVolume = false
                this.slider.destroy()
            }
        })
        // this.inventoryIcon = this.add.image(0, 0, 'inventory').setOrigin(0,0)
        // this.inventoryIcon.x = 1058
        // this.inventoryIcon.y = 20
    }
    createSlider = () => {
        this.slider = this.rexUI.add.slider({
            x:235,
            y: 30,
            width: 200,
            height: 15,
            orientation: 'x',
            track: this.rexUI.add.roundRectangle(0,0,0,0,4,0xFFFFFF),
            thumb: this.rexUI.add.roundRectangle(0,0,0,0,8,0xC2C2C2),
            valuechangeCallback: (value) => {
                this.music.volume = value
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag',
            value: this.music.volume
        }).layout()
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