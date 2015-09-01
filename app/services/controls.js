import Ember from 'ember';

const {
  Service,
  computed,
  inject,
  $,
  run
} = Ember;

const raf = window.requestAnimationFrame;
const caf = window.cancelAnimationFrame;

let afID = null;

// TODO: get these from tetrominos.keys()?
const tetrominoTypes = ['t', 'z', 's', 'j', 'l', 'i', 'o'];
let ttrI = 0;

export default Service.extend({
  tetromino: inject.service(),
  played: inject.service(),

  xPos: computed.alias('tetromino.xPos'),
  yPos: computed.alias('tetromino.yPos'),

  tetrominoType: computed.alias('tetromino.type'),

  playedSquares: computed.alias('played.squares'),

  downRect() {
    let tetromino = this.get('tetromino');
    let played = this.get('played');
    let playedSquares = this.get('playedSquares');
    if (tetromino.willCollide('down')) {
      // push locations into Played, check lines, remove
      let locations = tetromino.get('locations');
      let type = this.get('tetrominoType');
      for (let i = 0, len = locations.length; i < len; i++) {
        let {x,y} = locations[i];
        playedSquares.pushObject({x: x, y: y, type: type});
      }
      played.checkLines();
      tetromino.resetTetromino();
      return true;
    } else {
      this.incrementProperty('yPos');
      return false;
    }
  },
  rightRect() {
    if (!this.get('tetromino').willCollide('right')) {
      this.incrementProperty('xPos');
    }
  },
  leftRect() {
    if (!this.get('tetromino').willCollide('left')) {
      this.decrementProperty('xPos');
    }
  },
  changeTetromino() {
    ttrI = (ttrI + 1) % tetrominoTypes.length;
    this.set('tetrominoType', tetrominoTypes[ttrI]);
  },
  rotateTetromino() {
    this.get('tetromino').changeRotation();
  },

  playTetromino() {
    let played = false;
    while (!played) {played = this.downRect();}
  },

  paused: false,

  stopGame() {
    this.set('paused', true);
    caf(afID);
    run.next(() => alert('Game Over!!!'));
  },

  pauseGame() {
    // TODO: we should disable all keys when paused... this just stops autofall
    // ok for now...
    if (this.get('paused')) {
      this.set('paused', false);
      this.setAutoFall();
    } else {
      this.set('paused', true);
      caf(afID);
    }
  },

  now: null,

  fallInterval: 1000,

  autoFall(timestamp) {
    if (this.get('paused')) { return; }
    let now = this.get('now');
    let elapsed = timestamp - now;
    if (elapsed >= this.get('fallInterval')) {
      this.set('now', timestamp);
      this.downRect();
    }
    this.setAutoFall();
  },

  setAutoFall() {
    afID = raf(this.autoFall.bind(this));
  },

  setup() {
    $(document).on('keydown', (e) => {
      switch (e.keyCode) {
        case 40: // down arrow
          e.preventDefault();
          this.downRect();
          break;
        case 37: // up arrow
          e.preventDefault();
          this.leftRect();
          break;
        case 39: // right arrow
          e.preventDefault();
          this.rightRect();
          break;
        case 67: // 'c' key
          e.preventDefault();
          this.changeTetromino();
          break;
        case 38: // up arrow
          e.preventDefault();
          this.rotateTetromino();
          break;
        case 32: // space bar
          e.preventDefault();
          this.playTetromino();
          break;
        case 80: // 'p' key
          e.preventDefault();
          this.pauseGame();
          break;
      }
    });
    run.next(() => this.setAutoFall());
  }
});
