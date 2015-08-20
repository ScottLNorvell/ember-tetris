import Ember from 'ember';

const increment = 30;
const tetrominoTypes = ['i', 'o', 't', 'z', 's', 'j', 'l'];
let ttrI = 0;
export default Ember.Component.extend({
  classNames: ['tetris-board'],
  tagName: 'svg',
  attributeBindings: ['width', 'height'],
  width: '300px',
  height: '660px',
  xPos: 0,
  yPos: 0,
  tetrominoType: 'i',
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
      }
    });
  }
});
