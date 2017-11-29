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

var dynamodb = new AWS.DynamoDB();  //low-level client

var tableName = "TryDaxTable";


var params = { 
    TableName : tableName
};


dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
