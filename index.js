const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  //读文件
  let list = await db.read()
  //添加任务到文件
  list.push({ title, done: false })
  //存储任务到文件
  await db.write(list)
}

module.exports.clear = async (title) => {
  await db.write([])
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
}

function markAsUnDone(list, index) {
  list[index].done = false
  db.write(list)
}

function remove(list, index) {
  list.splice(index, 1)
  db.write(list)
}

function updatetitle(list, index) {
  inquirer
    .prompt({
      type: 'input',
      name: 'newTitle',
      message: '输入新名称',
      default: list[index].title,
    })
    .then((answers2) => {
      console.log('该哈哈哈')

      list[index].title = answers2.newTitle
      db.write(list)
    })
}

function askForAction(list, index) {
    const actions = {
        markAsDone, markAsUnDone, remove, updatetitle
    }
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: '请选择操作',
      choices: [
        { name: '退出', value: 'quit' },
        { name: '已完成', value: 'markAsDone' },
        { name: '未完成', value: 'markAsUnDone' },
        { name: '删除', value: 'remove' },
        { name: '改标题', value: 'edit' },
      ],
    })
    //根据所选操作做事情
    .then((ans) => {
      const action = actions[ans.action]
      action && action(list, index)
    })
}

function askForCreatTask(list) {
  inquirer
    .prompt({
      type: 'input',
      name: 'newTitle',
      message: '名称',
    })
    .then((ans3) => {
      list.push({ title: ans3.newTitle, done: false })
      db.write(list)
    })
  //创建任务
}

function pritnTasks(list) {
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: '请选择你想操作的任务',
      choices: [
        { name: '退出', value: '-1' },
        ...list.map((task, index) => {
          return { name: `${task.done ? '[X]' : '[_]'}${index + 1}-${task.title}`, value: index }
        }),
        { name: '创建', value: '-2' },
      ],
    })
    //询问操作
    .then((answers) => {
      console.log(answers.index)
      let index = parseInt(answers.index)
      if (index >= 0) {
        //选择了一个任务
        askForAction(list, index)
      } else if (index == -2) {
        askForCreatTask(list)
      }
    })
}

module.exports.showAll = async () => {
  //读取之前的任务
  //打印之前的任务
  const list = await db.read()
  //   list.forEach((task, index) => {
  //     console.log(`${task.done ? '[X]' : '[_]'}${index + 1}-${task.title}`)
  //   })
  //打印之前的任务
  pritnTasks(list)
}
