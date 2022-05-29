'use strict';

const { Contract } = require('fabric-contract-api');

class Instance extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const instances = [
            {
                ID: '1',
                course_id: 1,
                instance_type_id: 1,
                instance_number: 1
            },
            {
                ID: '2',
                course_id: 2,
                instance_type_id: 2,
                instance_number: 1
            }
        ];
        for (const instance of instances) {
            instance.docType = 'instance';
            await ctx.stub.putState(instance.ID, Buffer.from(JSON.stringify(instance)));
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async instanceExists(ctx, instanceId) {
        const instanceAsBytes = await ctx.stub.getState(instanceId);
        return instanceAsBytes && instanceAsBytes.length > 0;
    }

    async createInstance(ctx, instanceId, courseId, instanceTypeId, instanceNumber) {
        const exists = await this.instanceExists(ctx, instanceNumber);
        if (exists) {
            throw new Error(`The instance ${noteNumber} already exists`);
        }

        const newInstance = {
            ID: instanceId,
            course_id: courseId,
            instance_type_id: instanceTypeId,
            instance_number: instanceNumber
        };

        newInstance.docType = 'instance';
        await ctx.stub.putState(newInstance.ID, Buffer.from(JSON.stringify(newInstance)));

        console.info(newInstance);
        return JSON.stringify(newInstance);
    }

    async deleteInstance(ctx, instanceId) {
        const exists = await this.instanceExists(ctx, instanceId);
        if (!exists) {
            throw new Error(`The instance ${instanceId} does not exist`);
        }

        console.info(instanceId);
        return ctx.stub.deleteState(instanceId);
    }

    async queryInstance(ctx, instanceId) {
        const instanceAsBytes = await ctx.stub.getState(instanceId);
        if (!instanceAsBytes || instanceAsBytes.length === 0) {
            throw new Error(`${instanceId} does not exist`);
        }
        console.log(instanceAsBytes.toString());
        return instanceAsBytes.toString();
    }

    async queryInstanceByCourseId(ctx, courseId) {
		let queryString = {};
		queryString.selector = {};
		queryString.selector.docType = 'instance';
		queryString.selector.course_id = courseId;
		
        let resultsIterator = await ctx.stub.getQueryResult(queryString);

        let allResults = [];
		let res = await resultsIterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				let jsonRes = {};
				console.log(res.value.value.toString('utf8'));
				jsonRes.TxId = res.value.txId;
                jsonRes.Timestamp = res.value.timestamp;
                try {
                    jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Value = res.value.value.toString('utf8');
                }
				allResults.push(jsonRes);
			}
			res = await resultsIterator.next();
		}
		resultsIterator.close();

		return JSON.stringify(allResults);
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
