#!/usr/bin/env node

var exec = require('child_process').exec

var helper = require('../helpers.js')
var userData = require('../user-data.js')

var addToList = helper.addToList
var markChallengeCompleted = helper.markChallengeCompleted

var currentChallenge = 'pull_never_out_of_date'

// do a fetch dry run to see if there is anything
// to pull; if there is they haven't pulled yet

module.exports = function verifyPullChallenge (path) {
  exec('git fetch --dry-run', function (err, stdout, stdrr) {
    if (err) {
      addToList('Error: ' + err.message, false)
      return helper.challengeIncomplete()
    }
    var status = stdout.trim()
    if (!err && status === '') {
      addToList('Up to date!', true)
      markChallengeCompleted(currentChallenge)
      userData.updateData(currentChallenge)
    }
    else {
      addToList('There are changes to pull in.', false)
      helper.challengeIncomplete()
    }
  })
}