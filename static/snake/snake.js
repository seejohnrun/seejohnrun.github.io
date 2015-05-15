$(function () {

  var APPLE_COUNT = 2;
  var GAME_INTERVAL = 50;
  var BOARD_WIDTH = 50;
  var BOARD_HEIGHT = 50;
  var GROWTH_SPEED = 3;
  var START_LENGTH = 5;

  var Box = function () {
    this.$el = $('<div>').appendTo(document.body);
  };

  Box.prototype = {

    owner: undefined,

    setOwner: function (owner) {
      this.owner = owner;
      this.$el.css({ backgroundColor: owner ? owner.backgroundColor : 'blue' });
    },

    setBackgroundColor: function (bg) {
      this.$el[0].style.backgroundColor = bg;
    }

  };

  var Wall = function (board, buildFunc) {
    this.board = board;
    buildFunc(this, board);
  };

  Wall.prototype = {
    backgroundColor: 'black',

    collisionFrom: function () {
      this.board.end('you ran into a wall!');
    }
  };

  var Snake = function (board, keys, backgroundColor) {
    this.board = board;
    this.keys = keys;
    this.backgroundColor = backgroundColor;

    var box = board.getRandomBoardBox();
    box.setOwner(this);
    this.positions = [];
    this.positions.push(box);
    this.x = box.x;
    this.y = box.y;

    this.interval = setInterval(function () {
      this.move();
    }.bind(this), GAME_INTERVAL);

    var keyOrder = ['up', 'right', 'down', 'left']; // like css, yo
    $(document).on('keyup', function (e) {
      var idx = this.keys.indexOf(e.which);
      if (idx !== -1) {
        this.setDirection(keyOrder[idx]);
      }
    }.bind(this));
  };

  Snake.prototype = {

    mx: 0,
    my: 0,

    length: START_LENGTH,

    collisionFrom: function (fromWho) {
      this.board.end('you ran into ' + fromWho === this ? 'yourself' : 'another snake');
    },

    stop: function () {
      clearInterval(this.interval);
    },

    move: function () {
      if (!this.mx && !this.my) { return; }

      this.x += this.mx;
      this.y += this.my;

      if (this.x === this.board.width) { this.x = 0; }
      if (this.x === -1) { this.x = this.board.width - 1; }
      if (this.y === this.board.height) { this.y = 0; }
      if (this.y === -1) { this.y = this.board.height - 1; }

      var box = this.board.getBox(this, this.x, this.y);
      box.setOwner(this);
      this.positions.unshift(box);
      if (this.positions.length - 1 === this.length) {
        var lessBox = this.positions.pop();
        lessBox.setOwner(undefined);
      }
    },

    setDirection: function (direction) {
      var toSet;
      if (direction === 'up') {
        toSet = [0, -1];
      } else if (direction === 'down') {
        toSet = [0, 1];
      } else if (direction === 'left') {
        toSet = [-1, 0];
      } else if (direction === 'right') {
        toSet = [1, 0];
      }

      if (this.mx === -toSet[0] && this.my === toSet[1] ||
          this.my === -toSet[1] && this.mx === toSet[0]) {
        return; // don't allow self-killing
      }

      this.mx = toSet[0];
      this.my = toSet[1];
    }

  };

  var Apple = function (board) {
    this.backgroundColor = 'red';
    this.board = board;

    this.claimRandomSpot();
  };

  Apple.prototype = {
    collisionFrom: function (fromWho) {
      this.box.setOwner(undefined);
      fromWho.length += GROWTH_SPEED;

      this.claimRandomSpot();
    },

    claimRandomSpot: function () {
      this.box = this.board.getRandomBoardBox();
      this.box.setOwner(this);
    }
  };

  // all around the outside
  var standardWallBuilder = function (wall, board) {
    for (var y = 0; y < board.height; y++) {
      board.getBox(wall, 0, y).setOwner(wall);
      board.getBox(wall, board.width - 1, y).setOwner(wall);
    }

    for (var x = 1; x < board.width - 1; x++) {
      board.getBox(wall, x, 0).setOwner(wall);
      board.getBox(wall, x, board.height - 1).setOwner(wall);
    }
  };

  // holes in the sides
  var wallWithHoleBuilder = function (wall, board) {
    standardWallBuilder(wall, board);

    var offX = Math.floor(board.width / 3);
    var offY = Math.floor(board.height / 3);

    for (var y = offY; y < board.height - offY; y++) {
      board.boxes[y][0].setOwner(undefined);
      board.boxes[y][board.width - 1].setOwner(undefined);
    }

    for (var x = offX; x < board.width - offX; x++) {
      board.boxes[0][x].setOwner(undefined);
      board.boxes[board.height - 1][x].setOwner(undefined);
    }
  };

  var Board = function (width, height) {
    this.width = width;
    this.height = height;

    this.boxes = {};
    for (var y = 0; y < height; y++) {
      this.boxes[y] = {};
      for (var x = 0; x < width; x++) {
        var box = new Box();
        box.setOwner(undefined);
        box.x = x;
        box.y = y;
        this.boxes[y][x] = box;
      }
      $(document.body).append('<br/>'); // TODO
    }

    this.walls = [];
    this.apples = [];
    this.snakes = [];
  };

  Board.prototype = {

    end: function (why) {
      this.snakes.forEach(function (snake) { snake.stop(); });

      window.alert('GAME OVER: ' + why);
      throw('game over'); // TODO allow restart
    },

    getRandomBoardBox: function () {
      var box;
      while (!box || box.owner) {
        var randx = Math.floor(Math.random() * this.width);
        var randy = Math.floor(Math.random() * this.height);
        box = this.boxes[randy][randx];
      }
      return box;
    },

    getBox: function (forWho, x, y) {
      var box = this.boxes[y][x];
      if (box.owner) {
        box.owner.collisionFrom(forWho);
      }
      return box;
    }

  };

  // Setup the game!
  if (window.location.search === '?0') {
    var board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    board.walls.push(new Wall(board, standardWallBuilder));
    for (var idx = 0; idx < 1; idx++) { board.apples.push(new Apple(board)); }
    board.snakes.push(new Snake(board, [38, 39, 40, 37], 'lightgreen'));

  } else if (window.location.search === '?1') {
    var board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    board.walls.push(new Wall(board, standardWallBuilder));
    for (var idx = 0; idx < 5; idx++) { board.apples.push(new Apple(board)); }
    board.snakes.push(new Snake(board, [38, 39, 40, 37], 'lightgreen'));

  } else if (window.location.search === '?2') {
    var board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    board.walls.push(new Wall(board, wallWithHoleBuilder));
    for (var idx = 0; idx < 5; idx++) { board.apples.push(new Apple(board)); }
    board.snakes.push(new Snake(board, [38, 39, 40, 37], 'lightgreen'));

  } else if (window.location.search === '?3') {
    var board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
    board.walls.push(new Wall(board, wallWithHoleBuilder));
    for (var idx = 0; idx < 5; idx++) { board.apples.push(new Apple(board)); }
    board.snakes.push(new Snake(board, [38, 39, 40, 37], 'lightgreen'));
    board.snakes.push(new Snake(board, [87, 68, 83, 65], 'pink'));
  }

});

// TODO: idea: snake carcass (let other snakes keep playing)
