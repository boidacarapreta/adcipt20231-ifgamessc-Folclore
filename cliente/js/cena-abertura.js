export default class abertura extends Phaser.Scene {
  constructor () {
    super('abertura')
  }

  preload () {
    this.load.spritesheet('letreiro', './assetsdef/letreiro.png',{
      frameWidth: 800,
      frameHeight: 450
    })
  }

  create () {
    this.imagem = this.add.image(400, 225, 'letreiro')
    this.timer = 2
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.countdown,
      callbackScope: this,
      loop: true
    
    })
  }

  countdown () {
    this.timer -= 1
    if (this.timer <= 0) {
      this.imagem.destroy()
      this.timedEvent.destroy()
      this.game.scene.start('sala')
    }
  }
}