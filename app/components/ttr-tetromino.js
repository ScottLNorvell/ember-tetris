import Ember from 'ember';

const {
  Component,
  computed,
  inject
} = Ember;

export default Component.extend({
  classNames: ['ttr-tetromino'],
  tagName: 'g',
  attributeBindings: ['style'],

  tetromino: inject.service(),

  box: computed.reads('tetromino.box'),
  scale: computed.reads('tetromino.scale'),
  positions: computed.reads('tetromino.positions'),
  type: computed.reads('tetromino.type'),
  rotation: computed.reads('tetromino.rotation'),
  origin: computed.reads('tetromino.origin'),

  style: computed('translateX', 'translateY', 'rotation', 'origin', 'scale', function() {
    let translateX = this.get('translateX');
    let translateY = this.get('translateY');
    let rotation = this.get('rotation');
    let origin = this.get('origin');
    let scale = this.get('scale');
    if (typeof origin !== 'string') {
      origin = `${origin[0] * scale}px ${origin[1] * scale}px`;
    }
    return `transform: translate(${translateX}px, ${translateY}px) rotate(${rotation * 90}deg); transform-origin: ${origin}`;
  })
});
