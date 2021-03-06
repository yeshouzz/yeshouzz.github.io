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
  flattenDepth: function (ary, depth = 0) {
    var a = []
    for (var i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i]) && depth > 0) {
        depth--
        var arys = this.flattenDepth(ary[i], depth)
        a.push(...arys)
      } else {
        a.push(ary[i])
      }
    }
    return a
  },
  indexOf: function (array, value, fromIndex = 1) {//考虑多次循环的数以及负数，记录相等的个数x，fromIndex % x
    var a = 0
    var b = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] == value) {
        b.push(i)
        a++
      }
    }
    if (fromIndex > 0) {
      var c = fromIndex % (a + 1)
      if (c == 0) {
        return b[b.length - 1]
      }
      return b[c - 1]
    }
    if (fromIndex < 0) {
      var c = -fromIndex % (a + 1)
      if (c == 0) {
        return b[0]
      }
      return b[b.length - c]
    }
  },
  initial: function (array) {
    array.pop()
    return array
  },
  intersection: function (ary, ...array) {
    var a = []
    var y = []
    var b = array.length
    for (var i = 0; i < b; i++) {
      a.push(...array[i])
    }
    for (var i = 0; i < ary.length; i++) {
      var x = 0
      for (var j = a.length - 1; 0 <= j; j--) {
        if (ary[i] == a[j]) {
          x++
        }
      }
      if (x == b) {
        y.push(ary[i])
      }
    }
    return y
  },
  join: function (array, separator) {
    var a = array[0] + ''
    for (var i = 1; i < array.length; i++) {
      a = a + separator + array[i]
    }
    return a
  },
  last: function (array) {
    return array[array.length - 1]
  },
  lastIndexOf: function (array, value, fromIndex = array.length - 1) {
    var a = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] == value) {
        a.push(i)
      }
    }
    if (fromIndex > 0) {
      var b = fromIndex % a.length
      if (b == 0) {
        return a[0]
      }
      return a[a.length - b]
    }
    if (fromIndex < 0) {
      var b = -fromIndex % a.length
      if (b == 0) {
        return (a[a.length - 1] - array.length)
      }
      return ((a[b - 1]) - array.length)
    }
  },
  nth: function (array, n = 0) {
    if (n > 0) {
      return array[n]
    }
    if (n < 0) {
      return array[array.length + n]
    }
    return array[0]
  },
  pull: function (array, ...values) {
    var a = []
    var b = []
    for (var i = 0; i < values.length; i++) {
      a.push(values[i])
    }
    for (var j = 0; j < array.length; j++) {
      var x = 0
      for (var i = 0; i < a.length; i++) {
        if (array[j] != a[i]) {
          x++
        } else {
          break
        }
      }
      if (x == a.length) {
        b.push(array[j])
      }
    }
    return b
  },
  pullAll: function (array, values) {
    var a = []
    for (var j = 0; j < array.length; j++) {
      var x = 0
      for (var i = 0; i < values.length; i++) {
        if (array[j] != values[i]) {
          x++
        } else {
          break
        }
      }
      if (x == values.length) {
        a.push(array[j])
      }
    }
    return a
  },
  reverse: function (array) {
    var j = array.length - 1
    for (var i = 0; i < j; i++) {
      var a = array[i]
      array[i] = array[j]
      array[j] = a
      j--
    }
    return array
  },
  sortedIndex: function (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] >= value) {
        return i
      }
    }
  },
  union: function (...arrays) {
    var a = arrays.length
    var b = {}
    var c = []
    for (var i = 0; i < a; i++) {
      for (var j = 0; j < arrays[i].length; j++) {
        if (arrays[i][j] in b) {

        } else {
          b[arrays[i][j]] = 1
          c.push(arrays[i][j])
        }
      }
    }
    return c
  },
  uniq: function (array) {
    var a = {}
    var b = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] in a) {

      } else {
        a[array[i]] = 1
        b.push(array[i])
      }
    }
    return b
  },
  unzip: function (array) {
    var a = array.length
    var b = array[0].length
    var c = []
    for (var i = 0; i < b; i++) {
      c[i] = []
    }
    for (var i = 0; i < a; i++) {
      for (var j = 0; j < b; j++) {
        c[j].push(array[i][j])
      }
    }
    return c
  },
  fromPairs: function (pairs) {
    var a = {}
    for (var i = 0; i < pairs.length; i++) {
      a[pairs[i][0]] = pairs[i][1]
    }
    return a
  },
  unionBy: function (...arrays) {
    var f = arrays.pop()
    if (f.__proto__ === Function.prototype) {
      var a = arrays.length
      var b = {}
      var c = []
      for (var i = 0; i < a; i++) {
        for (var j = 0; j < arrays[i].length; j++) {
          if (!(f(arrays[i][j]) in b)) {
            b[f(arrays[i][j])] = 1
            c.push(arrays[i][j])
          }
        }
      }
      return c
    }
    if (f.__proto__ === Object.prototype) {
      var a = this.flattenDeep(arrays)
      var x = {}
      var y = []
      for (var i = 0; i < a.length; i++) {
        if (!(a[i].key in x)) {
          x[a[i].key] = a[i][key]
        }
      }
      y.push(x)
      return y
    }
  },
  without: function (array, ...values) {
    var result = {}
    var re = []
    for (var i = 0; i < values.length; i++) {
      result[values[i]] = 1
    }
    for (var j = 0; j < array.length; j++) {
      if (!(array[j] in result)) {
        re.push(array[j])
      }
    }
    return re
  },
  xor: function (...arrays) {
    var a = []
    for (var i = 0; i < arrays.length; i++) {
      a.push(...arrays[i])
    }
    var b = []
    for (var i = 0; i < a.length; i++) {
      var x = 0
      for (var j = a.length - 1; j >= 0; j--) {
        if (a[i] != a[j]) {
          x++
        }
      }
      if (x == a.length - 1) {
        b.push(a[i])
      }
    }
    return b
  },
  zip: function (...arrays) {
    var a = []
    for (var i = 0; i < arrays[0].length; i++) {
      a[i] = []
    }
    for (var j = 0; j < arrays[0].length; j++) {
      for (var i = 0; i < arrays.length; i++) {
        a[j].push(arrays[i][j])
      }
    }
    return a
  },
  countBy: function (collection, predicate) {
    var obj = {}
    if (predicate.__proto__ == Function.prototype) {
      collection.forEach(it => {
        if (predicate(it) in obj) {
          obj[predicate(it)]++
        } else {
          obj[predicate(it)] = 1
        }
      })
    }
    if (predicate == "length") {
      collection.forEach(it => {
        if (it.length in obj) {
          obj[it.length]++
        } else {
          obj[it.length] = 1
        }
      })
    }
    return obj
  },







}
