import { inventory } from '../config.js'
import { config, customConfig } from '../config.js'

export class Intro extends Phaser.Scene {
    constructor(){
        super('introScene')
        this.inventory = {}
        this.showVolume = false
        this.restarted = false
    }
    init = (data) => {
        this.inventory = data
        if(data.restarted){
            this.restarted = data.restarted
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
        if(this.restarted){
            this.cameras.main.fadeIn(2000, 0, 0, 0)
        }

        this.introBg = this.add.tileSprite(0, 0, config.width, config.height, 'intro')
        this.introBg.setOrigin(0, 0)
        
        this.startBtn = this.add.text(1100, 650, 'START', {
            font: '35px Arial',
            fill: 'white'
        }).setInteractive()
        this.startBtn.on('pointerdown', () => {
            this.scene.stop('introScene')
            this.scene.start('scene1', { inventory, music: this.music })
        })
        this.startBtn.on('pointerover', () => {
            this.startBtn.alpha = 0.5
        })
        this.startBtn.on('pointerout', () => {
            this.startBtn.alpha = 1
        })
        this.title = this.add.text(150, 50, 'The Purpose', {
            font: '40px Arial',
            fill: 'white'
        })
        this.explanation = this.add.text(150, 150, 'Lorem Impsum', customConfig.fontText)
        
        this.music = this.sound.add("theme", {
            loop: true,
            volume: 1
          });
          // this.sound.add("playerStep");
          this.music.play();

        // icons
        this.createIcons()

        // debugger
        // this.createDebugPointer()
    }
    createIcons = () => {
        console.log(this.music)
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

    update(){

        // this.updateDebugPointer()
    }
}