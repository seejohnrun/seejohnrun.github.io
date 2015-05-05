var colors = ['red', 'green', 'blue'];

var click = function () {
  while (this.firstChild) { this.removeChild(this.firstChild); }

  var toArray = Array.prototype.slice;
  var slides = toArray.call(this.previousSibling.children).concat(toArray.call(this.nextSibling.children));

  for (var i = 0; i < slides.length; i++) {
    this.appendChild(slides[i].cloneNode());
  }
};

for (var i = 0; i < 25; i++) {
  var div = document.createElement('div');
  div.className = 'box';
  div.onclick = click;

  var slide = document.createElement('div');
  slide.className = 'slide';
  slide.style.backgroundColor = colors[i % 3];
  div.appendChild(slide);

  document.body.appendChild(div);
}
