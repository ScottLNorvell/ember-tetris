import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'rect',
  attributeBindings: ['x', 'y', 'width', 'height'],
  classNameBindings: ['squareClass'],
  squareClass: computed('type', function() {
    let type = this.get('type');
    return `ttr-tetromino__square--${type}`;
  }),
  x: computed('pos', function() { return `${this.get('pos.x')}px`; }),
  y: computed('pos', function() { return `${this.get('pos.y')}px`; }),
  width: computed('scale', function() { return `${this.get('scale')}px`; }),
  height: computed('scale', function() { return `${this.get('scale')}px`; })
});
