import Ember from 'ember';
import tetrominos from 'ember-tetris/utils/tetrominos';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  classNames: ['ttr-tetromino'],
  tagName: 'g',
  attributeBindings: ['style'],

  style: computed('scale', function() {
    let scale = this.get('scale');
    return `transform: translate(${scale}px, ${scale}px);`;
  }),

  tetromino: inject.service(),

  scale: computed.reads('tetromino.scale'),

  type: computed('tetromino.queue.lastObject', function() {
    return this.get('tetromino.queue.lastObject');
  }),

  positions: computed('type', function() {
    // TODO: copied code from tetromino service (make a mixin or other service?)
    let type = this.get('type');
    let data = tetrominos[type].positions;
    let positions = [];
    for (let i = 0, len = data[0].length; i < len; i++) {
      let position = {
        x: data[0][i],
        y: data[1][i]
      };
      positions.push(position);
    }
    return positions;
  }),
});
