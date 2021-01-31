export class Ending extends Phaser.Scene {
    constructor(){
        super('endScene')
    }

    create = () => {
        this.anims.create({
            key: 'ending',
            frames: [
                { key: 'final1' },
                { key: 'final2' },
                { key: 'final3' },
                { key: 'final4' },
                { key: 'final5' },
                { key: 'final6' },
                { key: 'final7' },
                { key: 'final8' },
                { key: 'final9' },
                { key: 'final10', duration: 10000 },
            ],
            frameRate: 2,
            repeat: 0
        })
        this.ending = this.add.sprite(0, 0, 'ending').setOrigin(0,0).play('ending')
    }
}