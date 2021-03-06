var ease = require('ease-component');
var offset = require('offset');
var raf = require('component-raf');

function scrollTo(el, duration, easingType, scrollOffset) {
  scrollOffset = scrollOffset == null ? 0 : scrollOffset;
  var easing = easingType ? ease[easingType] : ease['linear'];
  var stop = false;
  var start = Date.now();
  var html = document.getElementsByTagName('html')[0];
  var fromY = document.body.scrollTop || html.scrollTop;
  var toY = fromY + offset(el).top + scrollOffset;

  function animate() {
    var now = Date.now();
    if (now - start >= duration) stop = true;
    var p = (now - start) / duration;
    var tick = Math.round(fromY + (toY - fromY) * easing(p));
    document.body.scrollTop = tick;
    html.scrollTop = tick;
    if (!stop) raf(animate);
  }

  animate();
}

module.exports = scrollTo;
