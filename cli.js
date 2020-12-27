const { program } = require('commander')
const api = require('./index.js')

program.option('-x, --xxx', 'output extra debugging')
program
  .command('add')
  .description('添加一个任务')
  .action((...args) => {
    const title = args[0].args.join(',')
    api.add(title).then(
      () => {
        console.log('添加成功')
      },
      () => {
        console.log('添加失败')
      }
    )
  })

program
  .command('clear')
  .description('删除全部任务')
  .action(() => {
    api.clear().then(
      () => {
        console.log('删除成功')
      },
      () => {
        '删除失败'
      }
    )
  })
program
  .command('all')
  .description('展示全部')
  .action(() => {
    api.showAll()
  })

program.parse(process.argv)
