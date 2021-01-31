import { inventory } from "../config.js";

export class Load extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload = () => {
    this.load.image("bg-scene1", "../../assets/img/scene-3-bg.png")
    this.load.image("bg-scene2", "../../assets/img/scene-1-bg.png")
    this.load.image("ui", "../../assets/img/UI.png")
    this.load.image("intro", "../../assets/img/intro-scene-bg.png")

    this.load.image("robot", "../../assets/img/robot.png")
    this.load.image("robot-light", "../../assets/img/robot-light.png")
    this.load.image("laptop", "../../assets/img/laptop.png")
    this.load.image("billboard", "../../assets/img/billboard.png")
    this.load.image("control-panel", "../../assets/img/control-panel.png")
    this.load.image("omatic", "../../assets/img/control-O-matic-3000.png")

    this.load.image("battery", "../../assets/img/laptop-battery.png")
    this.load.image("microchip", "../../assets/img/microchip.png")
    this.load.image("pcb", "../../assets/img/pcb.png")
    this.load.image("controller", "../../assets/img/controller.png")

    this.load.image("arrow1", "../../assets/img/this-way-1.png")
    this.load.image("arrow2", "../../assets/img/this-way-2.png")
    this.load.image("arrow3", "../../assets/img/this-way-3.png")

    this.load.spritesheet("player", "../../assets/img/player-sprite.png", {
      frameWidth: 98,
      frameHeight: 229,
    })

    this.load.plugin('rexbitmapzoneplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbitmapzoneplugin.min.js', true)
    this.load.atlas('flares', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/particles/flares/flares.png', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/particles/flares/flares.json')

    this.load.audio("theme", "../../assets/sound/Heuristics For The Brain - pATCHES.mp3")
    this.load.audio("playerStep", "../../assets/sound/Footstep volup.mp3")
  }
  create = () => {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("introScene");
    let music = this.sound.add("theme", { loop: true });
    this.sound.add("playerStep");
    music.play();
  }
}
