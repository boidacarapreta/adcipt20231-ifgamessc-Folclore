export default class principal extends Phaser.Scene {
    constructor() {
      super("principal");
    }
  
    preload() {
      //
      // Mapa
      // Tilemap
      this.load.tilemapTiledJSON(
        "mapa-teste",
        "./assets/mapa-teste.json"
      );
      // Tilesets
      this.load.image("chao", "./assets/chao.png")
      this.load.image("tijolos", "./assets/tijolos.png")
      //
      // Personagem 1
      this.load.spritesheet("robo-1", "./robo-1.png", {
        frameWidth: 64,
        frameHeight: 64,
      });
      //
      // Personagem 2
      this.load.spritesheet("robo-2", "./robo-2.png", {
        frameWidth: 64,
        frameHeight: 64,
      });
    }
  
    create() {
      // Mapa
      // Tilemap
      this.mapa_teste = this.make.tilemap({
        key: "mapa-teste",
      });
      // Tilesets
      this.tileset_mapa_teste_chao = 
        this.mapa_teste.addTilesetImage("chao", "chao");
      this.tileset_mapa_teste_tijolo =
        this.mapa_teste.addTilesetImage("tijolos", "tijolos");
      // Layer 0: chão
      this.chao = this.mapa_teste.createLayer(
        "chao",
        this.tileset_mapa_teste_chao,
        0,
        0
      );
      // Layer 1: Parede (Tijolos)
      this.tijolo = this.mapa_teste.createLayer(
        "tijolo",
        this.tileset_mapa_teste_tijolo,
        0,
        0
      );  
      this.jogador_1 = this.physics.add.sprite(200, 225, "robo-1");
      //
      this.anims.create({
        key: "jogador-1-baixo",
        frames: this.anims.generateFrameNumbers("robo-1", {
          start: 0,
          end: 15,
        }),
        frameRate: 30,
        repeat: -1,
      });
      //
      this.jogador_1.anims.play("jogador-1-baixo", true);
      //
      this.jogador_2 = this.physics.add.sprite(600, 225, "robo-2");
      //
      this.anims.create({
        key: "jogador-2-direita",
        frames: this.anims.generateFrameNumbers("robo-2", {
          start: 32,
          end: 47,
        }),
        frameRate: 30,
        repeat: -1,
      });
      //
      this.jogador_2.anims.play("jogador-2-direita", true);
    }
  
    update() {}
  }