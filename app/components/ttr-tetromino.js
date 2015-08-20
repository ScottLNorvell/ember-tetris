import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  tetromino: inject.service(),
  tagName: 'g',
  attributeBindings: ['style'],
  scale: 30,
  style: computed('translateX', 'translateY', function() {
    let {
      translateY,
      translateX
    } = this;
    return `transform: translate(${translateX}px, ${translateY}px)`;
  }),
  positions: computed('type', 'scale', function() {
    let {
      scale,
      type
    } = this;
    let data = this.get(`tetromino.${type}`);
    let positions = [];
    for (let i = 0, len = data[0].length; i < len; i++) {
      let position = {
        x: data[0][i] * scale,
        y: data[1][i] * scale
      }
      positions.push(position);
    }
    return positions;
  })
});
