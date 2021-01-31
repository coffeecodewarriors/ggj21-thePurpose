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
        this.cameras.main.fadeIn(2000, 0, 0, 0)
        this.ending = this.add.sprite(0, 0, 'ending').setOrigin(0,0).play('ending')
        this.adri = this.add.text(750, 625, '', {font: '23px Arial', fill: 'white'})
        this.mark = this.add.text(750, 660, '', {font: '23px Arial', fill: 'white'})
        setTimeout(() => {
            this.createCredits('Adrián Casas', this.adri)
            this.createCredits('Mark Sanjuán', this.mark)
        }, 3000)
    }
    createCredits = (text, holder) => {
        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                holder.text += text[i]
                i++
            },
            repeat: length - 1,
            delay: 300
        })
    }
}