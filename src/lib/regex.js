const list_fakultas = require('../data/list_fakultas.json')
const list_jurusan = require('../data/list_jurusan.json')
const kode_fakultas = require('../data/kode_fakultas.json')
const kode_jurusan = require('../data/kode_jurusan.json')

const convertToList = (input) => {
  return input.split(" ")
}

const existInKode = (regex, data) => {
  for (let key in data) {
    if (regex.test(key)) {
      return true
    }
  }
  return false
}

const existInList = (regex, data) => {
  for (let key in data) {
    if (regex.test(data[key])) {
      return true
    }
  }
  return false
}

const getValueFromKode = (regex, data) => {
  let res = []
  for (let key in data) {
    if (regex.test(key)) {
      res.push(data[key])
    }
  }
  return res
}

const getValueFromList = (regex, data) => {
  let res = []
  for (let key in data) {
    if (regex.test(data[key])) {
      res.push(key)
    }
  }
  return res
}

const getRegex = (string) => {
  let regexRes = ""

  let result = {
    nama: [],
    nim: []
  }

  const rgx = {
    word: /[a-z]/i,
    int: /[0-9]/
  }
  
  const arrWords = convertToList(string)
  
  for (let i = 0; i < arrWords.length; i++) {
    if (arrWords[i].match(rgx.word)) {
      let kode = RegExp(arrWords[i] + '$', 'ig')
      let list = RegExp(arrWords[i], 'ig')
      if (existInKode(kode, kode_jurusan)) {
        result.nim.push(arrWords[i])
      } else if (existInKode(kode, kode_fakultas)) {
        result.nim.push(arrWords[i])
      } else if (existInList(list, list_jurusan)) {
        result.nim.push(arrWords[i])
      } else if (existInList(list, list_fakultas)) {
        result.nim.push(arrWords[i])
      } else {
        result.nama.push(arrWords[i])
      }
    } else if (arrWords[i].match(rgx.int)) {
      result.nim.push(arrWords[i])
    }
  }

  if (result.nama.length > 0) {
    regexRes += "(?=.*" + result.nama.join("|") + ")"
  }
  if (result.nim.length > 0) {
    regexRes += "(?=.*"
    let tmpNim = []
    for (let i = 0; i < result.nim.length; i++) {
      if (result.nim[i].match(rgx.word)) {
        let kode = RegExp(result.nim[i] + '$', 'ig')
        let list = RegExp(result.nim[i], 'ig')
        if (existInKode(kode, kode_jurusan)) {
          tmpNim.push(...getValueFromKode(kode, kode_jurusan))
        } else if (existInKode(kode, kode_fakultas)) {
          tmpNim.push(...getValueFromKode(kode, kode_fakultas))
        } else if (existInList(list, list_jurusan)) {
          tmpNim.push(...getValueFromList(list, list_jurusan))
        } else if (existInList(list, list_fakultas)) {
          tmpNim.push(...getValueFromList(list, list_jurusan))
        }
      }
    }
    regexRes += tmpNim.join("[0-9]{4}|")
    regexRes += "[0-9]{4})"

    for (let i = 0; i < result.nim.length; i++) {
      if (result.nim[i].match(rgx.int)) {
        if (result.nim[i].length === 2) {
          regexRes += "(?=.*[0-9]{3}" + result.nim[i] + "[0-9]{3})"
        } else {
          regexRes += "(?=.*" + result.nim[i] + ")"
        }
      }
    }
  }

  return regexRes
}

const filterMahasiswa = (datas, regex) => {
  let newDatas = datas.filter(data => (
    data.join(" ").match(regex)
  ))

  return newDatas
}

// const test = "Tito IF 19 007"

// console.log(RegExp(getRegex(test), 'i'))
// console.log(filterMahasiswa(mahasiswas, RegExp(getRegex(test), 'i')))

const library = {
  getRegex,
  filterMahasiswa
}

export default library