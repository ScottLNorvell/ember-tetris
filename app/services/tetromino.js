import Ember from 'ember';
import tetrominos from 'ember-tetris/utils/tetrominos';

const {
  Service,
  computed
} = Ember;

const [
  rightLimit,
  leftLimit,
  downLimit
] = [9,0,21];

export default Service.extend({
  xPos: 0,
  yPos: 0,

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

  positions: computed('type', function() {
    let {
      type
    } = this;
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


  locations: computed('positions', 'xPos', 'yPos', function() {
    let positions = this.get('positions');
    let xPos = this.get('xPos');
    let yPos = this.get('yPos');
    return positions.map(pos => ({ x: pos.x + xPos, y: pos.y + yPos }));
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
  },

  willCollide(direction) {
    let locations = this.get('locations');
    switch (direction) {
      case 'right':
        // Soon this will be:
        // ```javascript
        // locations.any((loc) => {
        //   let outOfBounds = loc.x === rightLimit;
        //   let willCollide = setOfPoints.has(`${loc.x + 1},${loc.y}`);
        //   return outOfBounds && willCollide;
        // });
        // ```
        return locations.any(loc => loc.x === rightLimit);
      case 'left':
        return locations.any(loc => loc.x === leftLimit);
      case 'down':
        return locations.any(loc => loc.y === downLimit);
    }
  }
});
