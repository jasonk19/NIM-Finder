const computeFail = (pattern) => {
  let fail = []
  fail[0] = 0

  const m = pattern.length
  let j = 0
  let i = 1

  while (i < m) {
    if (pattern.charAt(j) === pattern.charAt(i)) {
      fail[i] = j+1
      i++
      j++
    } else if (j > 0) {
      j = fail[j-1]
    } else {
      fail[i] = 0
      i++
    }
  }
  return fail
}

const kmp = (text, pattern) => {
  const n = text.length
  const m = pattern.length

  let fail = computeFail(pattern)

  let i = 0
  let j = 0

  while (i < n) {
    if (pattern.charAt(j) === text.charAt(i)) {
      if (j === m - 1) {
        return true
      }
      i++
      j++
    } else if (j > 0) {
      j = fail[j-1]
    } else {
      i++
    }
  }
  return false
}

module.exports = { kmp }