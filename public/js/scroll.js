(function() {
  'use strict';

  var section = document.querySelectorAll(".section");
  var sections = {};
  var i = 100;

  Array.prototype.forEach.call(section, function(e) {
    sections[e.id] = e.offsetTop;
  });

  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        document.querySelector('.active').setAttribute('class', 'list list-action');
        document.querySelector('a[href*=' + i + ']').setAttribute('class', 'list list-action active');
      }
    }
  };
})();
