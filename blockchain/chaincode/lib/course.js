'use strict';

const { Contract } = require('fabric-contract-api');

class Course extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const courses = [
            {
                ID: '1',
                name: 'Arquitectura de software'
            },
            {
                ID: '2',
                name: 'Diseño de sistemas'
            }
        ];
        for (const course of courses) {
            course.docType = 'course';
            await ctx.stub.putState(course.ID, Buffer.from(JSON.stringify(course)));
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCourse(ctx, courseId) {
        const courseAsBytes = await ctx.stub.getState(courseId);
        if (!courseAsBytes || courseAsBytes.length === 0) {
            throw new Error(`${courseId} does not exist`);
        }
        console.log(courseAsBytes.toString());
        return courseAsBytes.toString();
    }

    async queryAllCourses(ctx) {
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

module.exports = Course;
