const core = require('@actions/core')
const core = require('@actions/github')

try {
  const data = core.getInput('data')
  const regions = Object.getOwnPropertyNames(JSON(data))
  let report = ''

  if (regions) {
    regions.forEach(region => {
      let regionTable = generateRegionTable(data.get(region))
      report = report.concat(`### [${region}](https://console.aws.amazon.com/ec2/v2/home?region=${region}#Instances:sort=tag:Name)\n${regionTable}\n`)
    })

  } else {
    
  }

  function generateRegionTable(reportData) {
    let markdownTable = null

    if (reportData.length !== 0) {
      markdownTable = `Instance ID|Name|Owner|Stop|Terminate\n-|-|-|-|-\n`
    }
    reportData.forEach(instance => {
      markdownTable = markdownTable.concat(`${instance.instanceId}|${instance.name.value}|${instance.owner.value}|${instance.stop.value}|${instance.terminate.value}\n`)
    })
    return markdownTable
  }


  console.log(report)

} catch (error) {
  core.setFailed(error.message);
}