(function () {

  var try_clicking = function (element) {
    window.alert('flub!');
    element.active = true;
    element.click();
    return true;
  };

  var average_distance_from = function (x, y, element) {
    var rect = element.getBoundingClientRect();
    var distance_x = Math.min(Math.abs(x - rect.right), Math.abs(x - rect.left));
    var distance_y = Math.min(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return (distance_x + distance_y) / 2;
  };

  var search_elements_within = function (x, y, perimeter, flub_tapped) {
    var elements = [
      document.elementFromPoint(x + perimeter, y),
      document.elementFromPoint(x - perimeter, y),
      document.elementFromPoint(x, y + perimeter),
      document.elementFromPoint(x, y - perimeter)
    ].filter(function (element) {
      return element && element !== flub_tapped;
    }).sort(function (a, b) {
      return average_distance_from(x, y, a) - average_distance_from(x, y, b);
    });

    for (var i = 0; i < elements.length; i++) {
      if (try_clicking(elements[i])) {
        return;
      }
    }
  };

  document.addEventListener('touchstart', function (e) {
    if (e.target.dataset.flub) {
      search_elements_within(e.pageX, e.pageY, 100, e.target);
    }
  });

})();
