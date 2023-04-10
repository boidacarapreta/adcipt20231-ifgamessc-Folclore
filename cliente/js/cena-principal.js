export default class principal extends Phaser.Scene {
    constructor() {
      super("principal");
    }
  
    preload() {
      
      // Mapa
      // Tilemap
      this.load.tilemapTiledJSON(
        "mapa-teste",
        "./assets/mapa-teste.json"
      );
      // Tilesets
      this.load.image("chao", "./assets/chao.png")
      this.load.image("tijolos", "./assets/tijolos.png")
     
      // Personagem 1
      this.load.spritesheet("robo-1", "./assets/robo-1.png", {
        frameWidth: 64,
        frameHeight: 64,
      });
      
      // Personagem 2
      this.load.spritesheet("robo-2", "./assets/robo-2.png", {
        frameWidth: 64,
        frameHeight: 64,
      });
      
      // Botões
      this.load.spritesheet("cima","./assets/cima.png",{
        frameWidth: 64,
        frameHeight: 64
      })
      this.load.spritesheet("baixo","./assets/baixo.png",{
        frameWidth: 64,
        frameHeight: 64
      })
      this.load.spritesheet("esquerda","./assets/esquerda.png",{
        frameWidth: 64,
        frameHeight: 64
      })
      this.load.spritesheet("direita","./assets/direita.png",{
        frameWidth: 64,
        frameHeight: 64
      })   
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
      this.tijolos = this.mapa_teste.createLayer(
        "tijolos",
        this.tileset_mapa_teste_tijolo,
        0,
        0
      );  
      // Personagem 1
      this.jogador_1 = this.physics.add.sprite(200, 225, "robo-1");
      
      this.anims.create({
        key: "jogador-1-cima",
        frames: this.anims.generateFrameNumbers("robo-1", {
          start: 64,
          end: 79,
        }),
        frameRate: 30,
        repeat: -1,
      });
      
      this.anims.create({
        key: "jogador-1-baixo",
        frames: this.anims.generateFrameNumbers("robo-1", {
          start: 0,
          end: 15,
        }),
        frameRate: 30,
        repeat: -1,
      });
      this.anims.create({
        key: "jogador-1-esquerda",
        frames: this.anims.generateFrameNumbers("robo-1", {
          start: 96,
          end: 111,
        }),
        frameRate: 30,
        repeat: -1,
      });
      
      this.anims.create({
        key: "jogador-1-direita",
        frames: this.anims.generateFrameNumbers("robo-1", {
          start: 32,
          end: 47,
        }),
        frameRate: 30,
        repeat: -1,
      });
      
      // Personagem 2
      this.jogador_2 = this.add.sprite(600, 225, "robo-2");
      
      // Botões
      this.cima = this.add.sprite(100, 350, "cima", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-70)
        this.jogador_1.anims.play("jogador-1-cima")
      })
      .on("pointerup", () =>{
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
      });

    }
  
    update() {}
  }