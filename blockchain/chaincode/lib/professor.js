'use strict';

const { Contract } = require('fabric-contract-api');

class Professor extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const professors = [
            {
                ID: 1,
                first_name: 'Martín',
                last_name: 'García',
                course_id: 1,
            },
            {
                ID: 2,
                first_name: 'Roberto',
                last_name: 'Fernandez',
                course_id: 2,
            },
        ];
        for (const professor of professors) {
            professor.docType = 'professor';
            await ctx.stub.putState(professor.ID, Buffer.from(JSON.stringify(professor)));
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    /*
    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
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

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }
    */

}

module.exports = Professor;
