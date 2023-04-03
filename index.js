import config from "./config.js";

import abertura from "./cena-abertura.js";
import principal from "./cena-principal.js";
import fim_do_jogo from "./cena-fim-do-jogo.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("abertura", abertura);
    this.scene.add("principal", principal);
    this.scene.add("fim-do-jogo", fim_do_jogo);

    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};