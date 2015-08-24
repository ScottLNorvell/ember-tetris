import Ember from 'ember';
import toSquareKey from 'ember-tetris/utils/to-square-key';

const {
  Service,
  computed,
  observes,
  A
} = Ember;

// TODO: make squares a special object that adds to set on pushObject?
// make this better!

export default Service.extend({
  squares: A(),

  squareSet: computed(function() {
    return new Set();
  }),

  addToSet(locations) {
    let squareSet = this.get('squareSet');
    for (let i = 0, len = locations.length; i < len; i++) {
      squareSet.add(toSquareKey(locations[i]));
    }
  }
});
