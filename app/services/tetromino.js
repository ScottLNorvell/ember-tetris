import Ember from 'ember';

const {
  Service,
  computed
} = Ember;

export default Service.extend({
  i: computed(function() {
    return [
      [0,0,0,0],
      [0,1,2,3]
    ];
  }),
  o: computed(function() {
    return [
      [0,1,0,1],
      [0,0,1,1]
    ];
  }),
  t: computed(function() {
    return [
      [0,1,2,1],
      [0,0,0,1]
    ];
  }),
  s: computed(function() {
    return [
      [1,2,0,1],
      [0,0,1,1]
    ];
  }),
  z: computed(function() {
    return [
      [0,1,1,2],
      [0,0,1,1]
    ];
  }),
  j: computed(function() {
    return [
      [1,1,0,1],
      [0,1,2,2]
    ];
  }),
  l: computed(function() {
    return [
      [0,0,0,1],
      [0,1,2,2]
    ];
  }),
});
