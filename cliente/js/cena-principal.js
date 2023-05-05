export default class principal extends Phaser.Scene {
    constructor() {
      super("principal");
    }
  
    preload() {
      
      /*Mapa*/
      /*TileMap*/
      this.load.tilemapTiledJSON(
        "mapa-teste",
        "./assets/mapa-teste.json"
      );
      /*Tilesets*/
      this.load.image("chao", "./assets/chao.png")
      this.load.image("tijolos", "./assets/tijolos.png")
     
      /* Personagem 1 */ 
      this.load.spritesheet("robo-1", "./assets/robo-1.png", {
        frameWidth: 64,
        frameHeight: 64,
      });
      
      /* Personagem 2 */ 
      this.load.spritesheet("robo-2", "./assets/robo-2.png", {
        frameWidth: 64,
        frameHeight: 64,
      });
      
      /* Artefato */
      this.load.spritesheet("cristal", "./assets/cristal.png", {
        frameWidth: 32,
        frameHeight: 56,
      });

      /*Botões*/ 
      this.load.spritesheet("cima","./assets/cima.png",{
        frameWidth: 64,
        frameHeight: 64
      });

      this.load.spritesheet("baixo","./assets/baixo.png",{
        frameWidth: 64,
        frameHeight: 64
      });

      this.load.spritesheet("esquerda","./assets/esquerda.png",{
        frameWidth: 64,
        frameHeight: 64
      });

      this.load.spritesheet("direita","./assets/direita.png",{
        frameWidth: 64,
        frameHeight: 64
      });
      
      this.load.spritesheet("tela-cheia", "./assets/tela-cheia.png",{
        frameWidth: 64,
        frameHeight: 64,
      });

      /* Sons*/
      this.load.audio("tecno-trilha", "./assets/techno.mp3")
      this.load.audio("metal-som", "./assets/metal.mp3")
      this.load.audio("cristal-som", "./assets/cristal.mp3")
    }
 
    create() {
      /* Trilha Sonora */
      this.trilha = this.sound.add("tecno-trilha");
      this.trilha.loop = true;
      this.trilha.play();
      
      /* Tilemap */ 
      this.mapa_teste = this.make.tilemap({
        key: "mapa-teste",
      });
      
      /* Tilesets */ 
      this.tileset_mapa_teste_chao = 
        this.mapa_teste.addTilesetImage("chao", "chao");
      
      this.tileset_mapa_teste_tijolo =
        this.mapa_teste.addTilesetImage("tijolos", "tijolos");
     
      /* Layer 0: chão */ 
      this.chao = this.mapa_teste.createLayer(
        "chao",
        this.tileset_mapa_teste_chao,
        0,
        0
      );
      
      if (this.game.jogadores.primeiro === this.game.socket.id) {
        this.local = "robo-1";
        this.jogador_1 = this.physics.add.sprite(300, 225, this.local);
        this.remoto = "robo-2";
        this.jogador_2 = this.add.sprite(600, 225, this.remoto);
      } else {
        this.remoto = "robo-1";
        this.jogador_2 = this.add.sprite(300, 225, this.remoto);
        this.local = "robo-2";
        this.jogador_1 = this.physics.add.sprite(600, 225, this.local);
      }
  
      
      /* Layer 1: Parede (Tijolos) */ 
      this.tijolos = this.mapa_teste.createLayer(
        "tijolos",
        this.tileset_mapa_teste_tijolo,
        0,
        0
      );  
      /* Personagem 1 */ 
      this.jogador_1 = this.physics.add.sprite(200, 225, "robo-1");
      
      this.anims.create({
        key: "jogador-parado",
        frames: this.anims.generateFrameNumbers(this.local, {
          start: 0,
          end: 0,
        }),
        frameRate: 1,
      });

      this.anims.create ({
        key: "jogador-1-cima",
        frames: this.anims.generateFrameNumbers("robo-1", {
          start: 64,
          end: 79,
        }),
        frameRate: 30,
        repeat: -1,
      });
      
      this.anims.create ({
        key: "jogador-1-baixo",
        frames: this.anims.generateFrameNumbers("robo-1", {
          start: 0,
          end: 15,
        }),
        frameRate: 30,
        repeat: -1,
      });
      this.anims.create ({
        key: "jogador-1-esquerda",
        frames: this.anims.generateFrameNumbers("robo-1", {
          start: 96,
          end: 111,
        }),
        frameRate: 30,
        repeat: -1,
      });
      
      this.anims.create ({
        key: "jogador-1-direita",
        frames: this.anims.generateFrameNumbers("robo-1", {
          start: 32,
          end: 47,
        }),
        frameRate: 30,
        repeat: -1,
      });
      
      /* Personagem 2 */ 
      this.jogador_2 = this.add.sprite(600, 225, "robo-2");
      
      this.cristal = this.physics.add.sprite(700, 300, "cristal");

      this.anims.create ({
        key: "cristal-brilhando",
        frames: this.anims.generateFrameNumbers("cristal", {
          start: 0,
          end: 3,
        }),
        frameRate: 4,
        repeat: -1,
      });
  
      this.cristal.anims.play("cristal-brilhando");


      /* Botões */ 
      this.cima = this.add
      .sprite(120, 330, "cima", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-200);
        this.jogador_1.anims.play("jogador-cima");
      })
      .on("pointerup", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador-parado");
      })
      .setScrollFactor(0);
      
      this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.baixo.setFrame(1);
        this.jogador_1.setVelocityY(200);
        this.jogador_1.anims.play("jogador-baixo");
      })
      .on("pointerup", () => {
        this.baixo.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador-parado");
      })
      .setScrollFactor(0);

      this.esquerda = this.add
      .sprite(50, 400, "esquerda", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.esquerda.setFrame(1);
        this.jogador_1.setVelocityX(-200);
        this.jogador_1.anims.play("jogador-esquerda");
      })
      .on("pointerup", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-parado");
      })
      .setScrollFactor(0);


      this.direita = this.add
      .sprite(190, 400, "direita", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.direita.setFrame(1);
        this.jogador_1.setVelocityX(200);
        this.jogador_1.anims.play("jogador-direita");
      })
      .on("pointerup", () => {
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador-parado");
      })
      .setScrollFactor(0);
      
      this.tela_cheia = this.add
        .sprite(750, 50, "tela-cheia", 0 )
        .setInteractive()
        .on("pointerdown", () => {
          if (this.scale.isFullscreen) {
            this.tela_cheia.setFrame(0);
            this.scale.stopFullscreen();
          } else {
            this.tela_cheia.setFrame(1);
            this.scale.startFullscreen();
          }
        })
        .setScrollFactor(0);

    /* Colisões por tile */ 
    this.chao.setCollisionByProperty({ collides: true});
    this.tijolos.setCollisionByProperty({ collides: true});
    
    /* Colisão entre P1 e mapa (por layer) */ 
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
    
    /* Cena (960) maior que a tela (800x450) */
    this.cameras.main.setBounds(0, 0, 960, 960);
    this.physics.world.setBounds(0, 0, 960, 960);
    this.cameras.main.startFollow(this.jogador_1); 

    /* Colisão com os limites da cena */
    this.jogador_1.setCollideWorldBounds(true);
    
    /* Colisão com objeto */
    this.physics.add.collider(
      this.jogador_1,
      this.cristal,
      this.coletar_cristal,
      null,
      this
      );

    /* Efeitos Sonoros*/
    this.metal_som = this.sound.add("metal-som");
    this.cristal_som = this.sound.add("cristal-som");
    
    this.game.socket.on("estado-notificar", ({ frame, x, y }) => {
      this.jogador_2.setFrame(frame);
      this.jogador_2.x = x;
      this.jogador_2.y = y;
    });

    this.game.socket.on("arfetatos-notificar", (artefatos) => {
      if (artefatos.cristal) {
        this.cristal.disableBody(true, true);
      }
    });  
}
  
  update() {
    let frame;
    try {
      frame = this.jogador_1.anims.getFrameName();
    } catch (e) {
      frame = 0;
    }
    this.game.socket.emit("estado-publicar", this.game.sala, {
      frame: frame,
      x: this.jogador_1.body.x + 32,
      y: this.jogador_1.body.y + 32,
    });
  }
    
    colidir_mapa() {
    /* Tremer a tela por 100 ms com baixa intensidade (0.01) */
      this.cameras.main.shake(100, 0.01);
  
    /* Vibrar o celular pelos mesmos 100 ms */
      if (window.navigator.vibrate) {
        window.navigator.vibrate([100]);
    }

    /* Tocar efeito sonoro */
      this.metal_som.play();
    }

    coletar_cristal() {
  
    /* Ocultar e remover física/colisão */
      this.cristal.disableBody(true, true);
    
    /* Tocar efeito sonoro*/
      this.cristal_som.play();

    }
  }