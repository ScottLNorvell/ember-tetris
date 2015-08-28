import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  classNames: ['ttr-scoreboard'],
  scoring: inject.service()
});
