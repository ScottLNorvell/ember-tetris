import Ember from 'ember';

const {
  Component,
  computed,
  inject,
  $
} = Ember;

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

  didInsertElement() {
    $(document).on('keydown', (e) => {
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 40:
          e.preventDefault();
          this.downRect();
          break;
        case 37:
          e.preventDefault();
          this.leftRect();
          break;
        case 39:
          e.preventDefault();
          this.rightRect();
          break;
        case 67:
          e.preventDefault();
          this.changeTetromino();
          break;
        case 38:
          e.preventDefault();
          this.rotateTetromino();
          break;
        case 32:
          e.preventDefault();
          this.playTetromino();
          break;
      }
    });
  }
});
