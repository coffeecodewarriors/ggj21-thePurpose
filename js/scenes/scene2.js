import { config } from "../config.js"
import { Player } from "../player/player.js"

export class Scene2 extends Phaser.Scene {
    constructor(){
        super('scene2')
        this.target = new Phaser.Math.Vector2()
        this.configPlayer = {
            scene: this,
            x: config.width/2 - 50,
            y: config.height - 150
        }
        this.inventory = {}
    }
    init = (data) => {
        this.inventory = data.inventory

        if(data.scene === 'scene1'){
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

        // items
        this.items = this.physics.add.group()

        // item
        this.createItem()

        this.player = this.physics.add.existing(new Player(this.configPlayer))
        this.input.on('pointerdown', this.player.movePlayer, this)
        this.pointer = this.input.mousePointer
    }
    update = () => {
        this.player.stopPlayer(this.target)
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
}