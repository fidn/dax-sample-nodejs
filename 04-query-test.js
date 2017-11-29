const AmazonDaxClient = require('amazon-dax-client');
var AWS = require("aws-sdk");
var program = require("commander");
program
.option("-r, --region [n]", "AWS region.")
.option("-e, --endpoint [n]", "DAX cluster endpoint:port.")
.parse(process.argv);

var region = "us-east-1";

if (program.region) {
    region = program.region;
}

AWS.config.update({
  region: region
});

console.log('region: %s', region);

var ddbClient = new AWS.DynamoDB.DocumentClient();

if (program.endpoint) {
    var dax = new AmazonDaxClient({endpoints: [program.endpoint], region: region})
    ddbClient = new AWS.DynamoDB.DocumentClient({service: dax });
}
var tableName = "TryDaxTable";

var pk = 5;
var sk1 = 2;
var sk2 = 9;
var iterations = 5;

var params = {
    TableName: tableName,
    KeyConditionExpression: "pk = :pkval and sk between :skval1 and :skval2",
    ExpressionAttributeValues: {
        ":pkval":pk,
        ":skval1":sk1,
        ":skval2":sk2
    }
};

for (var i = 0; i < iterations; i++) {
    var startTime = new Date().getTime();

    ddbClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // Query succeeded
        }
    });

    var endTime = new Date().getTime();
    console.log("\tTotal time: ", (endTime - startTime) , "ms - Avg time: ", (endTime - startTime) / iterations, "ms");

}
