import Ember from 'ember';

const {
  Component,
  computed,
  inject,
  run,
  $
} = Ember;

const raf = window.requestAnimationFrame;

// TODO: get these from tetrominos.keys()?
const tetrominoTypes = ['t', 'z', 's', 'j', 'l', 'i', 'o'];
let ttrI = 0;

export default Component.extend({
  classNames: ['tetris-board'],
  tetromino: inject.service(),
  played: inject.service(),
  tagName: 'svg',
  attributeBindings: ['width', 'height'],
  width: computed('scale', function() {
    let scale = this.get('scale');
    return `${scale * 10}px`;
  }),
  height: computed('scale', function() {
    let scale = this.get('scale');
    return `${scale * 22}px`;
  }),
  xPos: computed.alias('tetromino.xPos'),
  yPos: computed.alias('tetromino.yPos'),
  tetrominoType: computed.alias('tetromino.type'),
  scale: computed.alias('tetromino.scale'),
  playedSquares: computed.alias('played.squares'),

  // TODO: move these to a tetromino service or a Controls Service?
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

  now: null,

  fallInterval: 1000,

  autoFall(timestamp) {
    let now = this.get('now');
    let elapsed = timestamp - now;
    if (elapsed >= this.fallInterval) {
      this.set('now', timestamp);
      this.downRect();
    }
    this.setAutoFall();
  },

  setAutoFall() {
    raf(this.autoFall.bind(this));
  },

  didInsertElement() {
    $(document).on('keydown', (e) => {
      console.log(e.keyCode);
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
      }
    });
    // TODO: put this and ctrls in a service all it's own!
    run.next(() => this.setAutoFall())
  }
});
