const { program } = require('commander');
program
    .option('-x, --xxx', 'output extra debugging')
program
    .command('add <source>')
    .description('添加一个任务')
    .action((...args) => {
        console.log(args);
    });
program.parse(process.argv);
console.log(program.xxx)
// if (program.debug) console.log(program.opts());
// console.log('pizza details:');
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(`- ${program.pizzaType}`);