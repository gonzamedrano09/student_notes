'use strict';

const { Contract } = require('fabric-contract-api');

class InstanceType extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const instanceTypes = [
            {
                ID: 1,
                name: 'Parcial',
            },
            {
                ID: 2,
                name: 'Trabajo práctico',
            },
            {
                ID: 3,
                name: 'Presentación de clase',
            },
        ];
        for (const instanceType of instanceTypes) {
            instanceType.docType = 'instance_type';
            await ctx.stub.putState(instanceType.ID, Buffer.from(JSON.stringify(instanceType)));
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryInstanceType(ctx, instanceTypeNumber) {
        const instanceTypeAsBytes = await ctx.stub.getState(instanceTypeNumber);
        if (!instanceTypeAsBytes || instanceTypeAsBytes.length === 0) {
            throw new Error(`${instanceTypeNumber} does not exist`);
        }
        console.log(instanceTypeAsBytes.toString());
        return instanceTypeAsBytes.toString();
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

module.exports = InstanceType;
