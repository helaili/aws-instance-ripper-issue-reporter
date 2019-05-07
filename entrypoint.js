const { Toolkit } = require('actions-toolkit')
const tools = new Toolkit()

let cache = tools.store.all()

console.log(cache)
