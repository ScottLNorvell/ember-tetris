import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'g',
  attributeBindings: ['style'],
  style: computed('translateX', 'translateY', function() {
    let {
      translateY,
      translateX
    } = this;
    return "transform: translate("+ translateX +"px, "+ translateY +"px)";
  }),
  yPositions: [0,30,60,90]
});
