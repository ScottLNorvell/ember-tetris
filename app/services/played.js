import Ember from 'ember';
import toSquareKey from 'ember-tetris/utils/to-square-key';

const {
  Service,
  computed
} = Ember;

// TODO: make squares a special object that adds to set on pushObject?
// make this better!

export default Service.extend({
  squares: computed(function() {
    let squares = [];
    squares.__pushObject = squares.pushObject;
    let squareSet = this.get('squareSet');
    squares.pushObject = function(o) {
      squareSet.add(toSquareKey(o));
      // add to lines...
      this.__pushObject(o);
    };
    return squares;
  }),

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
