import Ember from 'ember';

const increment = 30;
export default Ember.Component.extend({
  classNames: ['tetris-board'],
  tagName: 'svg',
  attributeBindings: ['width', 'height'],
  width: '300px',
  height: '660px',
  xPos: 0,
  yPos: 0,
  downRect() {
    this.set('yPos', this.get('yPos') + increment);
  },
  rightRect() {
    this.set('xPos', this.get('xPos') + increment);
  },
  leftRect() {
    this.set('xPos', this.get('xPos') - increment);
  },
  didInsertElement() {
    Ember.$(document).on('keypress', (e) => {
      console.log(e.keyCode);
      if (e.keyCode === 115) {
        this.downRect();
      } else if (e.keyCode === 97) {
        this.leftRect();
      } else if (e.keyCode === 100) {
        this.rightRect();
      }
    });
  }
});
