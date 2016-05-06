const EVENTS = [
  'webkitAnimationEnd',
  'mozAnimationEnd',
  'MSAnimationEnd',
  'oanimationend',
  'animationend'
];

export function onAnimationEnd(elem, callback) {
  addMultipleListeners(elem, callback, ...EVENTS);
}

function addMultipleListeners(elem, callback, ...evts) {
  evts.forEach(e => elem.addEventListener(e, callback));
}
