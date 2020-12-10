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
  difference: function (array, ...values) {
    var a = []
    var b = []
    for (var i = 0; i < values.length; i++) {
      b.push(...values[i])
    }
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < b.length; j++) {
        if (array[i] == b[j]) {
          break
        }
        if (j == b.length - 1) {
          a.push(array[i])
        }
      }
    }
    return a
  },
  drop: function (array, n = 1) {
    while (n > 0) {
      array.shift()
      n--
    }
    return array
  },
  dropRight: function (array, n = 1) {
    while (n > 0 && array) {
      array.pop()
      n--
    }
    return array
  },
  fill: function (array, value, start = 0, end = array.length) {
    for (var i = 0; i < array.length; i++) {
      if (i >= start && i < end) {
        array[i] = value
      }
    }
    return array
  },
  flatten: function (arr) {
    var a = []
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        a.push(...arr[i])
      } else {
        a.push(arr[i])
      }
    }
    return a
  },
  flattenDeep: function (arr) {
    var a = []
    var flDeep = function (arr) {
      if (!Array.isArray(arr)) {
        return arr
      }
      arr.forEach((it) => {
        if (Array.isArray(it)) {
          flDeep(it)
        } else {
          a.push(it)
        }
      })
    }
    flDeep(arr)
    return a
  },
  concat: function (array, ...values) {
    var a = []
    a.push(...array)
    for (var i = 0; i < values.length; i++) {
      if (Array.isArray(values[i])) {
        a.push(...values[i])
      } else {
        a.push(values[i])
      }
    }
    return a
  },
  head: function (array) {
    if (Array.isArray(array)) {
      return array[0]
    } else {
      return undefined
    }
  },
  flattenDepth: function (arr, depth = 1) {
    var a = []
    if (depth = 0) return arr;
    var flDeep = function (arr, depth) {
      arr.forEach((it) => {
        if (Array.isArray(it) && depth > 0) {
          flDeep(it, depth--)
        } else {
          a.push(it)
        }
      })
    }
    flDeep(arr, depth)
    return a
  },
  indexOf: function (array, value, fromIndex = 1) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == value) {
        fromIndex--
        if (fromIndex == 0) {
          break
        }
      }
    }
    return i
  },
  initial: function (array) {
    array.pop()
    return array
  },














}
