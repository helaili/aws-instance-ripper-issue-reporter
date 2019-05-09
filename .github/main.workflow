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
  env = {
    DRY_RUN = "true"
  }
}

action "Reporter" {
  uses = "./"
  needs = ["Ripper"]
  secrets = ["GITHUB_TOKEN"]
}
