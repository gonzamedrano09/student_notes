'use strict';

const { Contract } = require('fabric-contract-api');

class Note extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const notes = [
            {
                ID: 1,
                student_file: 11222,
                instance_id: 1,
                note: 8,
                date: "2020-04-10T10:00:00+0000",
                observations: "Muy buen parcial",
            },
            {
                ID: 2,
                student_file: 223333,
                instance_id: 2,
                note: 4,
                date: "2021-06-5T12:00:00+0000",
                observations: "El trabajo práctico tuvo algunos errores",
            },
        ];
        for (const note of notes) {
            note.docType = 'note';
            await ctx.stub.putState(note.ID, Buffer.from(JSON.stringify(note)));
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    // Create, update and delete methods are missing

    async queryNote(ctx, noteNumber) {
        const noteAsBytes = await ctx.stub.getState(noteNumber);
        if (!noteAsBytes || noteAsBytes.length === 0) {
            throw new Error(`${noteNumber} does not exist`);
        }
        console.log(noteAsBytes.toString());
        return noteAsBytes.toString();
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

module.exports = Note;
