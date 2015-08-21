import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

const increment = 30;
const tetrominoTypes = ['t', 'z', 's', 'j', 'l', 'i', 'o'];
let ttrI = 0;

export default Ember.Component.extend({
  classNames: ['tetris-board'],
  tetromino: inject.service(),
  tagName: 'svg',
  attributeBindings: ['width', 'height'],
  width: computed('scale', function() {
    let scale = this.get('scale');
    return `${scale * 10}px`
  }),
  height: computed('scale', function() {
    let scale = this.get('scale');
    return `${scale * 22}px`
  }),
  xPos: 0,
  yPos: 0,
  tetrominoType: computed.alias('tetromino.type'),
  scale: computed.alias('tetromino.scale'),
  tetrominoRotation: 0,
  downRect() {
    this.set('yPos', this.get('yPos') + increment);
  },
  rightRect() {
    this.set('xPos', this.get('xPos') + increment);
  },
  leftRect() {
    this.set('xPos', this.get('xPos') - increment);
  },
  changeTetromino() {
    ttrI = (ttrI + 1) % tetrominoTypes.length;
    this.set('tetrominoType', tetrominoTypes[ttrI]);
  },
  rotateTetromino() {
    this.get('tetromino').changeRotation();
  },
  didInsertElement() {
    Ember.$(document).on('keypress', (e) => {
      e.preventDefault();
      console.log(e.keyCode);
      if (e.keyCode === 115) {
        this.downRect();
      } else if (e.keyCode === 97) {
        this.leftRect();
      } else if (e.keyCode === 100) {
        this.rightRect();
      } else if (e.keyCode === 108) {
        this.changeTetromino();
      } else if (e.keyCode === 107) {
        this.rotateTetromino();
      }
    });
  }
});
