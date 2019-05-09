workflow "AWS-Rippper" {
  on = "issues"
  resolves = ["Reporter"]
}

action "debug" {
  uses = "actions/bin/debug@master"
}

action "Filters Labeled Issues" {
  uses = "actions/bin/filter@master"
  args = "action labeled"
}

action "Filters label radar" {
  uses = "actions/bin/filter@master"
  needs = ["Filters Labeled Issues"]
  args = "label radar"
}

action "Ripper" {
  needs = ["Filters label radar"]
  uses = "helaili/aws-instance-ripper@master"
  secrets = ["AWS_SECRET_ACCESS_KEY", "AWS_ACCESS_KEY_ID"]
  env = {
    DRY_RUN = "true"
  }
}

action "Reporter" {
  uses = "./"
  needs = ["Ripper", "debug"]
  secrets = ["GITHUB_TOKEN"]
}

/*

action "Reporter" {
  uses = "./../aws-instance-ripper-issue-reporter"
}
*/
