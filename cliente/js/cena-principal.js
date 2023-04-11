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
      this.cima = this.add
      .sprite(120, 330, "cima", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-200)
        this.jogador_1.anims.play("jogador-1-cima")
      })
      .on("pointerup", () =>{
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
    
      })
      .setScrollFactor(0);
      
      this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.baixo.setFrame(1);
        this.jogador_1.setVelocityY(200)
        this.jogador_1.anims.play("jogador-1-baixo")
      })
      .on("pointerup", () =>{
        this.baixo.setFrame(0);
        this.jogador_1.setVelocityY(0);
      })
      .setScrollFactor(0);

      this.esquerda = this.add
      .sprite(50, 400, "esquerda", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.esquerda.setFrame(1);
        this.jogador_1.setVelocityX(-200)
        this.jogador_1.anims.play("jogador-1-esquerda")
      })
      .on("pointerup", () =>{
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
      })
      .setScrollFactor(0);

      this.direita = this.add
      .sprite(190, 400, "direita", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.direita.setFrame(1);
        this.jogador_1.setVelocityX(200)
        this.jogador_1.anims.play("jogador-1-direita")
      })
      .on("pointerup", () =>{
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(0);
      })
      .setScrollFactor(0);    
    
    // Colisões por tile
    this.chao.setCollisionByProperty({ collides: true});
    this.tijolos.setCollisionByProperty({ collides: true});
    
    // Colisão entre P1 e mapa (por layer)
    this.physics.add.collider(
      this.jogador_1,
      this.chao,
      this.collision,
      null,
      this
    );
    this.physics.add.collider(
      this.jogador_1,
      this.tijolos,
      this.collision,
      null,
      this
    );
    // Cena (1920x1920) maior que a tela (800x450)
    this.cameras.main.setBounds(0, 0, 1920, 1920);
    this.physics.world.setBounds(0, 0, 1920, 1920);
    this.cameras.main.startFollow(this.jogador_1); 

    
  
  
  }

  
    update() {}
  }