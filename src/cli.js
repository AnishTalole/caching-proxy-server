const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('port', {
    type: 'number',
    default: 3000,
  })
  .option('ttl', {
    type: 'number',
    default: 60,
  })
  .option('maxCache', {
    type: 'number',
    default: 100,
  })
  .parse();

module.exports = argv;