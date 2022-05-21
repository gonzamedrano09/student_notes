'use strict';

const { Contract } = require('fabric-contract-api');

class Instance extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const instances = [
            {
                ID: 1,
                course_id: 1,
                instance_type_id: 1,
                instance_number: 1,
            },
            {
                ID: 2,
                course_id: 2,
                instance_type_id: 2,
                instance_number: 1
            },
        ];
        for (const instance of instances) {
            instance.docType = 'instance';
            await ctx.stub.putState(instance.ID, Buffer.from(JSON.stringify(instance)));
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    // Create, update and delete methods are missing

    async queryInstance(ctx, instanceNumber) {
        const instanceAsBytes = await ctx.stub.getState(instanceNumber);
        if (!instanceAsBytes || instanceAsBytes.length === 0) {
            throw new Error(`${instanceNumber} does not exist`);
        }
        console.log(instanceAsBytes.toString());
        return instanceAsBytes.toString();
    }

    async queryAllInstanceTypes(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

}

module.exports = Instance;
