#!/bin/bash

# Exit on first error
set -e

CC_SRC_LANGUAGE="javascript"
CC_SRC_PATH="./../chaincode/"

# launch network; create channel and join peer to channel
pushd ./network
./network.sh down
./network.sh up createChannel -ca -c studentnotes -s couchdb
./network.sh deployCC -c studentnotes -ccn course -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
./network.sh deployCC -c studentnotes -ccn instance_type -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
./network.sh deployCC -c studentnotes -ccn professor -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
./network.sh deployCC -c studentnotes -ccn student -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
./network.sh deployCC -c studentnotes -ccn instance -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
./network.sh deployCC -c studentnotes -ccn note -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
popd
