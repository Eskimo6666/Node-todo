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

module.exports.showAll = async () => {
  //读取之前的任务
  //打印之前的任务
  const list = await db.read()
  //   list.forEach((task, index) => {
  //     console.log(`${task.done ? '[X]' : '[_]'}${index + 1}-${task.title}`)
  //   })

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
    .then((answers) => {
      console.log(answers.index)
      let index = parseInt(answers.index)
      if (index >= 0) {
        //选择了一个任务
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
          .then((ans) => {
            console.log(ans)
            switch (ans.action) {
              case 'markAsDone':
                list[index].done = true
                db.write(list)
                break
              case 'markAsUnDone':
                list[index].done = false
                db.write(list)
                break
              case 'remove':
                list.splice(index, 1)
                db.write(list)
                break
              case 'edit':
                inquirer
                  .prompt({
                    type: 'input',
                    name: 'newTitle',
                    message: '输入新名称',
                    default: list[index].title,
                  })
                  .then((answers2) => {
                      console.log('该哈哈哈');
                      
                    list[index].title = answers2.newTitle
                    db.write(list)
                  })
                break
              default:
                break
            }
          })
      } else if (index == -2) {
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
    })
}
