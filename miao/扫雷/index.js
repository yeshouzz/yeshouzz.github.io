var arr3 = []
function Mine(tr, td, mineNum) {
  this.tr = tr
  this.td = td
  this.mineNum = mineNum

  this.squares = []
  this.tds = []
  this.surplusMine = mineNum
  this.allRight = false

  this.parent = document.querySelector('.gameBox')
}
Mine.prototype.randomNum = function () {
  var square = new Array(this.tr * this.td)
  for (var i = 0; i < square.length; i++) {
    square[i] = i
  }
  square.sort(function () { return 0.5 - Math.random() })

  return square.slice(0, this.mineNum)
}
Mine.prototype.init = function () {
  var rn = this.randomNum()
  var n = 0

  for (var i = 0; i < this.tr; i++) {
    this.squares[i] = []
    for (var j = 0; j < this.td; j++) {
      if (rn.indexOf(++n) != -1) {
        this.squares[i][j] = {
          type: 'mine',
          x: j,
          y: i
        }
      } else {
        this.squares[i][j] = {
          type: 'number',
          x: j,
          y: i,
          value: 0
        }
      }
    }
  }

  // console.log(this.squares);
  this.updateNum()
  this.createDom();
  this.parent.oncontextmenu = function () {
    return false
  }
  this.mineNumDom = document.querySelector('.mineNum')
  this.mineNumDom.innerHTML = this.surplusMine
}

Mine.prototype.createDom = function () {
  var This = this
  var table = document.createElement('table')

  for (var i = 0; i < this.tr; i++) {
    var domTr = document.createElement('tr')
    this.tds[i] = []
    for (var j = 0; j < this.td; j++) {
      var domTd = document.createElement('td')
      // domTd.innerHTML = 0
      domTd.pos = [i, j]
      domTd.onmousedown = function () {
        This.play(event, this)
      }
      this.tds[i][j] = domTd

      // if (this.squares[i][j].type == 'mine') {
      //   domTd.className = 'mine'
      // }
      // if (this.squares[i][j].type == 'number') {
      //   domTd.innerHTML = this.squares[i][j].value
      // }

      domTr.appendChild(domTd)
    }
    table.appendChild(domTr)
  }
  this.parent.innerHTML = ''
  this.parent.appendChild(table)
}

Mine.prototype.getAround = function (square) {
  var x = square.x
  var y = square.y
  var result = []

  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      if (
        i < 0 || j < 0 || i > this.td - 1 || j > this.tr - 1 || (i == x && j == y) || this.squares[j][i].type == 'mine'
      ) {
        continue;
      }
      result.push([j, i])
    }
  }

  return result
}

Mine.prototype.updateNum = function () {
  for (var i = 0; i < this.tr; i++) {
    for (var j = 0; j < this.td; j++) {
      if (this.squares[i][j].type == 'mine') {
        var num = this.getAround(this.squares[i][j])

        for (var k = 0; k < num.length; k++) {

          this.squares[num[k][0]][num[k][1]].value += 1
        }
      }
    }
  }

}

Mine.prototype.play = function (ev, obj) {
  var This = this
  if (ev.which == 1 && obj.className != 'flag') {
    var curSquare = this.squares[obj.pos[0]][obj.pos[1]]
    var cl = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
    if (curSquare.type == 'number') {
      obj.innerHTML = curSquare.value
      obj.className = cl[curSquare.value]

      if (curSquare.value == 0) {
        obj.innerHTML = ''
        function getAllZero(square) {
          var around = This.getAround(square)
          for (var i = 0; i < around.length; i++) {
            var x = around[i][0]
            var y = around[i][1]
            This.tds[x][y].className = cl[This.squares[x][y].value]

            if (This.squares[x][y].value == 0) {
              if (!This.tds[x][y].check) {
                This.tds[x][y].check = true
                getAllZero(This.squares[x][y])
              }

            } else {
              This.tds[x][y].innerHTML = This.squares[x][y].value
            }
          }
        }
        getAllZero(curSquare)
      }
    } else {
      this.gameOver(obj)
    }
  }
  if (ev.which == 3) {

    if (obj.className && obj.className != 'flag') {
      return
    }
    obj.className = obj.className == 'flag' ? '' : 'flag'

    if (this.squares[obj.pos[0]][obj.pos[1]].type == 'mine') {
      this.allRight = true

      if (obj.getAttribute('data') != 1) {
        arr3.push(this.allRight);
        obj.setAttribute('data', 1);
      }
    } else {
      this.allRight = false;
      if (obj.getAttribute('data') != 1) {
        arr3.push(this.allRight);
        obj.setAttribute('data', 1);
      }
    }
    if (obj.className == 'flag') {
      this.mineNumDom.innerHTML = --this.surplusMine
    } else {
      this.mineNumDom.innerHTML = ++this.surplusMine
    }
    if (this.surplusMine == 0) {
      var a = arr3.every(function (v) {
        return v == true;
      })
      if (a) {
        alert('恭喜吾儿游戏成功');
      } else {
        alert('游戏失败 FWFW');
        this.gameOver();
      }
    }
  }
}

Mine.prototype.gameOver = function (clickTd) {
  for (var i = 0; i < this.tr; i++) {
    for (var j = 0; j < this.td; j++) {
      if (this.squares[i][j].type == 'mine') {
        this.tds[i][j].className = 'mine'
      }
      this.tds[i][j].onmousedown = null
    }
  }
  if (clickTd) {
    clickTd.style.borderColor = '#f00'
    alert('游戏失败 FWFW')
  }
}

var btns = document.querySelectorAll('.level button')
var mine = null
var ln = 0
var arr = [[9, 9, 10], [16, 16, 40], [28, 28, 99]]
for (let i = 0; i < btns.length - 1; i++) {
  (function (i) {
    btns[i].onclick = function () {
      btns[ln].className = '';
      this.className = 'active';
      mine = new Mine(...arr[i]);
      mine.init();
      ln = i;
      btns[3].onclick = function () {
        mine = new Mine(...arr[ln]);
        mine.init();
        arr3 = [];
      }
    }
  }(i))
}

btns[0].onclick();
// btns[3].onclick = function () {
//   This = this
//   mine.init()
//   This.mineNumDom.innerHTML = arr[ln][2]
// }

// var mine = new Mine(28, 28, 99)
// mine.init()
