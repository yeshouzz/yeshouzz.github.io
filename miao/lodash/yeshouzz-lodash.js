var yeshouzz = {
  chunk: function (array, size) {
    var a = []
    var x = -1
    for (var i = 0; i < array.length; i++) {
      if (i % size == 0) {
        a.push([array[i]])
        x++
      } else {
        a[x].push(array[i])
      }
    }
    return a
  },
  compact: function (array) {
    var a = []
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        a.push(array[i])
      }
    }
    return a
  },
  difference: function (array, valuse) {
    var a = []
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < valuse.length; j++) {
        if (array[i] == valuse[j]) {
          break
        }
        if (j == valuse.length - 1) {
          a.push(array[i])
        }
      }
    }
    return a
  },
  drop: function (array, n) {
    if (n == 0) return array
    if (!n) n = 1
    while (n > 0) {
      array.shift()
      n--
    }
    return array
  },











}
