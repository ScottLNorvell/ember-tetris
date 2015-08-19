import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'g',
  yPositions: computed(function() {
    let positions = [];
    for (let i = 30; i < 660; i+=30) {
      positions.push(i);
    }
    return positions;
  }),
  xPositions: computed(function() {
    let positions = [];
    for (let i = 30; i < 300; i+=30) {
      positions.push(i);
    }
    return positions;
  }),
});
