const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();
// const {
// 	tesxt
// } = require('./test/index.js')

exports.handler = 'heel'
exports.handler = async (event, context) => {
	let body;
	let statusCode = 200;
	const headers = {
		"Content-Type": "application/json"
	};

	try {
		switch (event.routeKey) {
			case "DELETE /test/{id}":
				await dynamo
					.delete({
						TableName: "http-crud-tutorial-items",
						Key: {
							id: event.pathParameters.id
						}
					})
					.promise();
				body = `Deleted item ${event.pathParameters.id}`;
				break;

			case "GET /test":
				body = await dynamo.scan({
					TableName: "http-crud-tutorial-items"
				}).promise();
				break;
			case "GET /test/test":
				//body = await test.handler.then(res=>res);
				body = `wnwnwnwnwnwnwnwn`//await tesxt()
				break;
			case "PUT /test":
				let requestJSON = JSON.parse(event.body);
				await dynamo
					.put({
						TableName: "http-crud-tutorial-items",
						Item: {
							id: requestJSON.id,
							price: requestJSON.price,
							name: requestJSON.name
						}
					})
					.promise();
				body = `Put item ${requestJSON.id}`;
				break;
			default:
				throw new Error(`Unsupported route: "${event.routeKey}"`);
		}
	} catch (err) {
		statusCode = 400;
		body = err.message;
	} finally {
		console.log(body)
		body = JSON.stringify(body);
	}

	return {
		statusCode,
		body,
		headers
	};
};