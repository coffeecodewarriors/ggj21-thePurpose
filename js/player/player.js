export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(config){
        super(config.scene, config.x, config.y, 'player')
        config.scene.add.existing(this)
    }
    movePlayer = () => {
        let isMoving = true
        const worldBounds = this.physics.world.bounds

        if(this.pointer.isDown && isMoving === true){
            this.target.x = this.pointer.x
            this.target.y = this.pointer.y
            this.player.play()
            this.physics.moveToObject(this.player, this.target, 200)
            this.sound.play()
        }
        if(this.pointer.x > this.player.x){
            this.player.scaleX = 1
            this.player.body.offset = {x: 0, y: 0}
        }else {
            this.player.scaleX = -1
            this.player.body.offset = {x: 46, y: 0}
        }
    }
    stopPlayer = (target) => {
        if(!target){
            this.scene.player.body.reset(this.scene.player.x, this.scene.player.y)
            this.scene.player.anims.pause(this.scene.player.anims.currentAnim.frames[0])
            return
        }
        const stop = () => {
            this.scene.player.body.reset(target.x, target.y)
            this.scene.player.anims.pause(this.scene.player.anims.currentAnim.frames[0])
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
        if(this.scene.player.x <= 50){
            stop()
            this.changeScene(this.scene.player.scene, 'left')
        }else if(this.scene.player.x >= 1250){
            this.changeScene(this.scene.player.scene, 'right')
        }
    }
    changeScene = (currentScene, direction) => {
        if(currentScene.scene.key === 'scene1'){
            if(direction === 'left'){
                this.scene.player.x <= 50
                currentScene.game.scene.stop('scene1')
                currentScene.game.scene.start('scene2', currentScene)
                return
            }
            if(direction === 'right'){
                this.scene.player.x >= 1250
                currentScene.game.scene.stop('scene1')
                currentScene.game.scene.start('scene3', currentScene)
                return
            }
        }else if(currentScene.scene.key === 'scene2'){
            if(direction === 'left'){
                console.log('no se puede avanzar más')
            }
            if(direction === 'right'){
                this.scene.player.x >= 1250
                currentScene.game.scene.stop('scene2')
                currentScene.game.scene.start('scene1', {
                    scene: 'scene2'
                })
            }
        }
    }
}