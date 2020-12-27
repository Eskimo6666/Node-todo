const homedir = require('os').homedir() //nodejs get home directory
const port = process.env.HOME //nodejs get home varible
const fs = require('fs')
const p = require('path')
const home = port || homedir
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {
        if (err) {
          return reject(err)
        }
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (err2) {
          list = [] //list 通过promise返回给read函数(异步操作不能直接return)
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    const string = JSON.stringify(list)
    return new Promise((resolve, reject) => {
      fs.writeFile(path, string, (err3) => {
        if (err3) {
          console.log(err3, '写文件出错')
          return reject(err3)
        }
        resolve()
      })
    })
  },
}

module.exports = db
