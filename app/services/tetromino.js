import Ember from 'ember';
import tetrominos from 'ember-tetris/utils/tetrominos';

const {
  Service,
  computed
} = Ember;

export default Service.extend({
  scale: 30,

  type: 't',

  box: computed('type', 'scale', function() {
    let {
      scale,
      type
    } = this;
    let [w, h] = tetrominos[type]['box'];
    return {
      w: w * scale,
      h: h * scale
    };
  }),

  positions: computed('type', 'scale', function() {
    let {
      scale,
      type
    } = this;
    let data = tetrominos[type].positions;
    let positions = [];
    for (let i = 0, len = data[0].length; i < len; i++) {
      let position = {
        x: data[0][i] * scale,
        y: data[1][i] * scale
      };
      positions.push(position);
    }
    return positions;
  }),

  rotation: 0,

  origin: computed('type', function() {
    let type = this.get('type');
    return tetrominos[type].origin;
  }),

  changeRotation() {
    let {
      rotation,
      type
    } = this;
    let rotations = tetrominos[type].rotations;
    if (rotations) {
      this.set('rotation', (rotation + 1) % rotations);
    }
  }
});
