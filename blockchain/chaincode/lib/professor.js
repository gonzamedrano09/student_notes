'use strict';

const { Contract } = require('fabric-contract-api');
var crypto = require('crypto'); 


class Professor extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const professors = [
            {
                ID: '1',
                first_name: 'Martín',
                last_name: 'García',
                course_id: 1
            },
            {
                ID: '2',
                first_name: 'Roberto',
                last_name: 'Fernandez',
                course_id: 2
            }
        ];
        for (const professor of professors) {
            var salt = crypto.randomBytes(16).toString('hex');
            professor.salt = salt;
            var hash = crypto.pbkdf2Sync("12345678", salt, 1000, 64, `sha512`).toString(`hex`);
            professor.hash = hash;
            professor.docType = 'professor';
            await ctx.stub.putState(professor.ID, Buffer.from(JSON.stringify(professor)));
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryProfessor(ctx, professorId) {
        const professorAsBytes = await ctx.stub.getState(professorId);
        if (!professorAsBytes || professorAsBytes.length === 0) {
            throw new Error(`${professorId} does not exist`);
        }
        console.log(professorAsBytes.toString());
        return professorAsBytes.toString();
    }

    async queryAllProfessors(ctx) {
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

    async checkPassword(ctx, professorNumber, rawPassword) {
        const professor = this.queryProfessor(professorNumber);
        var hash = crypto.pbkdf2Sync(rawPassword, professor.salt, 1000, 64, `sha512`).toString(`hex`); 
            return this.hash === hash;
    }

}

module.exports = Professor;
