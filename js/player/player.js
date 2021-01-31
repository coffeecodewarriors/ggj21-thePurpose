export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(config){
        super(config.scene, config.x, config.y, 'player')
        config.scene.add.existing(this)
        
    }
    movePlayer = () => {
        let isMoving = true
        const worldBounds = this.scene.physics.world.bounds
        this.walk = this.scene.sound.add('playerStep2', {
            volume: 0.4
        })

        if(this.scene.pointer.isDown && isMoving === true){
            if(this.walk.isPlaying){
                this.walk.stop()
                return
            }
            this.scene.target.x = this.scene.pointer.x
            this.scene.target.y = this.scene.pointer.y
            this.scene.player.play('playerAnim')
            this.scene.physics.moveToObject(this.scene.player, this.scene.target, 200)
            // this.walk.play()
        }
        if(this.scene.pointer.x > this.scene.player.x){
            this.scene.player.scaleX = 1
            this.scene.player.body.offset = {x: 0, y: 0}
        }else {
            this.scene.player.scaleX = -1
            this.scene.player.body.offset = {x: 98, y: 0}
        }
    }
    stopPlayer = (target) => {
        if(!target){
            this.scene.player.body.reset(this.scene.player.x, this.scene.player.y)
            this.scene.player.anims.pause(this.scene.player.anims.currentAnim.frames[0])
            this.walk.pause()
            return
        }
        const stop = () => {
            this.scene.player.body.reset(target.x, target.y)
            this.scene.player.anims.pause(this.scene.player.anims.currentAnim.frames[0])
            this.walk.pause()
        }
        let distance = Phaser.Math.Distance.Between(
            this.scene.player.x,
            this.scene.player.y,
            target.x,
            target.y
        )
        if(this.scene.player.body.speed > 0){
            if(distance < 4){
                stop()
            }
        }
        if(this.scene.player.x <= 75){
            stop()
            this.changeScene(this.scene.player.scene, 'left')
        }else if(this.scene.player.x >= 1230){
            this.changeScene(this.scene.player.scene, 'right')
        }
    }
    changeScene = (currentScene, direction) => {
        if(currentScene.scene.key === 'scene2'){
            if(direction === 'left'){
                // this.scene.player.x <= 50
                currentScene.game.scene.stop('scene2')
                currentScene.game.scene.start('scene1', {
                    scene: 'scene2',
                    inventory: currentScene.inventory,
                    music: currentScene.music
                })
                return
            }
            if(direction === 'right'){
                this.scene.player.x >= 1250
                console.log('no se puede avanzar más')
                return
            }
        }else if(currentScene.scene.key === 'scene1'){
            if(direction === 'left'){
                console.log('no se puede avanzar más')
            }
            if(direction === 'right'){
                this.scene.player.x >= 1250
                currentScene.game.scene.stop('scene1')
                currentScene.game.scene.start('scene2', {
                    scene: 'scene1',
                    inventory: currentScene.inventory,
                    music: currentScene.music
                })
            }
        }
    }
}