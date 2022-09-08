import { filter } from 'rxjs/operators';
const fs = require('fs');

// @ https://www.apollographql.com/docs/react/features/pagination.html#connection-directive

interface FileObj {
    filename: string;
    matches: MatchCase[];
}
interface MatchCase {
    matchText: string;
    type: string;
    filter: Array<string>;
}

// @ Set files 
const config: Array<FileObj> = [

    // {
    //     filename: "src/app/blocks/graphql/generated/queries/patientsMediaFiles.gql",
    //     matches: [
    //         // {
    //         //     matchText: "patientsMediaFiles(",
    //         //     type: "patientsMediaFiles",
    //         //     filter: []
    //         // }
    //     ]
    // },
    {
        filename: 'src/app/blocks/graphql/generated/queries/patients.gql',
        matches: [
            {
                matchText: 'patients(',
                type: 'patients',
                filter: ['page', 'size', 'sortyBy', 'descending']
            }
        ]
    },
    // {
    //     filename: "src/app/blocks/graphql/generated/queries/activityMediaFiles.gql",
    //     matches: [
    //         // {
    //         //     matchText: "activityMediaFiles(",
    //         //     type: "activityMediaFiles",
    //         //     filter: ['patientId', 'speciality', 'conditionId', 'activitType', 'activityId']
    //         // }
    //     ]
    // },
    {
        filename: 'src/app/blocks/graphql/generated/gqlServices.ts',
        matches: [
            {
                matchText: 'patients(',
                type: 'patients',
                filter: ['page', 'size', 'sortyBy', 'descending']
            },
            // {
            //     matchText: `patientsMediaFiles(`,
            //     type: "patientsMediaFiles",
            //     filter: []
            // },
            // {
            //     matchText: 'activityMediaFiles(',
            //     type: "activityMediaFiles",
            //     filter: ['patientId', 'speciality', 'conditionId', 'activitType', 'activityId']
            // }
        ]
    }
];

config.forEach((element: FileObj) => {

    fs.readFile(element.filename, function (err, data) {
        if (err) { throw err; }
        const data__ = new String(data.toString());
        let result = data__;

        element.matches.forEach((match: MatchCase) => {

            let filter = '';

            if (match.filter.length) {
                match.filter.map((value, index) => {
                    if (index > 0) { filter += ','; }

                    filter += `"${value}"`;
                });
            }

            // @ format connection directive to appened
            const type = `@connection(key: "${match.type}", filter: [${filter ? filter : ''}])`;

            // @ first : get the index of matching query name
            const index__ = result.lastIndexOf(match.matchText);

            // @ second : get the index of closing bracket for query name
            const searchIndex = index__ + result.substring(index__).indexOf(')');

            // result = splice(result, index__ + match.matchText.length, 0, type)
            // @ finaly, add the connection after bracket (index)
            result = splice(result, searchIndex + 1, 0, type);
        });

        fs.writeFile(element.filename, result, function (err) {
            err || console.log('connection replaced :', element.matches[0].type, ' - ', element.filename);
        });
    });
});

function splice(string, idx, rem, str): string {
    return string.slice(0, idx) + str + string.slice(idx + Math.abs(rem));
}










// fs.readFile(filename, function(err, data) {
//     if (err) throw err
//     let data__ = new String(data.toString())
//     let matchText = "patientsMediaFiles(page: $page, size: $size, filter: $filter)"
//     let typename = "patientsMediaFiles"
//     let type = `@connection(key: "${typename}")`

//     let index__ = data__.indexOf("patientsMediaFiles(page: $page, size: $size, filter: $filter)")
//     var result = splice(data__, index__ + matchText.length, 0, type)

//     // fs.writeFile(filename, result, function(err) {
//     //     err || console.log("Data replaced \n", result)
//     // })
// })

// String.splice = function(idx, rem, str) {
//     return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
// };

