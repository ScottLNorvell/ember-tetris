import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  controls: inject.service(),
  paused: computed.reads('controls.paused'),
  gameOver: computed.reads('controls.stopped'),
  isPlaying: computed('paused', 'gameOver', function() {
    return !(this.get('paused') || this.get('gameOver'));
  }),
  showControls: false,
  actions: {
    pause() {
      this.get('controls').pauseGame();
    },
    newGame() {
      this.get('controls').resetBoard();
    },
    toggleControls() {
      this.toggleProperty('showControls');
    }
  }
});
