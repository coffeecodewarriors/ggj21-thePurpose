export class Ending extends Phaser.Scene {
    constructor(){
        super('endScene')
    }

    create = () => {
        this.add.text(200, 200, 'Has encontrado lo que buscabas...', {
            font: '25px Arial',
            fill: 'red'
        })
    }
}