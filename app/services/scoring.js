import Ember from 'ember';

const {
  Service,
  computed
} = Ember;

export default Service.extend({
  score: 0,
  lines: 0,
  level: computed('lines', function() {
    let lines = this.get('lines');
    if (lines) {
      return Math.ceil(lines/5)
    } else {
      return 1;
    }
  }),
  addScore(lines) {
    let linesCleared = lines.length;
    // TODO: make an exponential scale based on number of lines and level
    this.incrementProperty('score', linesCleared * 100);
    this.incrementProperty('lines', linesCleared);
  }
});
