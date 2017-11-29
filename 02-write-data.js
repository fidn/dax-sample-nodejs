var AWS = require("aws-sdk");
var program = require("commander");
program
.option("-r, --region [n]", "AWS region.")
.parse(process.argv);

var region = "us-east-1";

if (program.region) {
    region = program.region;
}

AWS.config.update({
  region: region
});

console.log('region: %s', region);

var ddbClient = new AWS.DynamoDB.DocumentClient() 

var tableName = "TryDaxTable";


var someData = "X".repeat(1000);
var pkmax = 10;
var skmax = 10;

for (var ipk = 1; ipk <= 10; ipk++)  {

    for (var isk = 1; isk <= skmax; isk++) {
        var params = {
            TableName: tableName,
            Item: {
                "pk": ipk,
                "sk": isk,
                "someData": someData
            }
        };

        //
        //put item

        ddbClient.put(params, function(err, data) {
            if (err) {
               console.error("Unable to write data: ", JSON.stringify(err, null, 2));
            } else {
               console.log("PutItem succeeded");
            }
        });

    }
}

