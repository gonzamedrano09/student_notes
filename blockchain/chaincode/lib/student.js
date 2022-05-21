'use strict';

const { Contract } = require('fabric-contract-api');
var crypto = require('crypto'); 


class Student extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const students = [
            {
                FILE: 11222,
                first_name: 'Lautaro',
                last_name: 'Ramirez',
                year_of_study: 2020
            },
            {
                FILE: 223333,
                first_name: 'Ivan',
                last_name: 'Romero',
                year_of_study: 2021
            },
        ];
        for (const student of students) {
            var salt = crypto.randomBytes(16).toString('hex');
            student.salt = salt;
            var hash = crypto.pbkdf2Sync("12345678", salt, 1000, 64, `sha512`).toString(`hex`);
            student.hash = hash;
            student.docType = 'student';
            await ctx.stub.putState(student.ID, Buffer.from(JSON.stringify(student)));
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryStudet(ctx, studentNumber) {
        const studentAsBytes = await ctx.stub.getState(studentNumber);
        if (!studentAsBytes || studentAsBytes.length === 0) {
            throw new Error(`${studentNumber} does not exist`);
        }
        console.log(studentAsBytes.toString());
        return studentAsBytes.toString();
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

module.exports = Student;
