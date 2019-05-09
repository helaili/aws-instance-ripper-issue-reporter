const { Toolkit } = require('actions-toolkit')
const tools = new Toolkit()

let cache = tools.store.all()
let regions = Object.getOwnPropertyNames(cache)
let report = ''

if (regions) {
  regions.forEach(region => {
    let regionTable = generateRegionTable(tools.store.get(region))
    report = report.concat(`### [${region}](https://console.aws.amazon.com/ec2/v2/home?region=${region}#Instances:sort=tag:Name)\n${regionTable}\n`)
  })

  tools.github.issues.createComment({
    ...tools.context.issue,
    body: report
  })
} else {
  tools.github.issues.createComment({
    ...tools.context.issue,
    body: 'Nothing to report about our AWS usage'
  })
}

function generateRegionTable(reportData) {
  let markdownTable = null

  if (reportData.length !== 0) {
    markdownTable = `Instance ID|Name|Owner|Stop|Terminate\n-|-|-|-|-\n`
  }
  reportData.forEach(instance => {
    markdownTable = markdownTable.concat(`${instance.instanceId}|${instance.name}|${instance.owner}|${instance.stop}|${instance.terminate}\n`)
  })
  return markdownTable
}


console.log(report)
