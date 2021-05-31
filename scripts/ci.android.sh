#!/bin/bash -ex

# Approve unapproved SDK licenses
yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses

source $(dirname "$0")/ci.sh

pushd detox/test
run_f "npm run integration"
popd

if [[ -z ${SKIP_UNIT_TESTS} ]]; then
  pushd detox/android
  run_f "./gradlew testFullRelease"
  popd
else
  echo "SKIP_UNIT_TESTS is set: Skipping Android unit tests"
fi

mkdir -p coverage

run_f "scripts/ci.genycloud-login.sh"

pushd detox/test

run_f "npm run build:android"
cp ../coverage/lcov.info ../../coverage/unit.lcov

#DO NOT MERGE
#run_f "npm run e2e:android-ci-genycloud"
#cp coverage/lcov.info ../../coverage/e2e-android-ci.lcov

run_f "npm run e2e:android-ci-google -- e2e/01* e2e/02* e2e/03*"

run_f "scripts/ci_unhappy.sh android"

# run_f "npm run verify-artifacts:android"
popd
