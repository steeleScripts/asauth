const { MongoClient } = require("mongodb")
const uri = "mongodb://localhost:3000"
const client = new MongoClient(uri);

async funtion run() { 
	try {
		//Connect the client to server
		await clinet.connect();

		//Establish and verify connection
		await client.db("admin").command({ping: 1});
		console.log("Connected successfully to server");		
	} finally {
		//Closes client when finished/error
		await client.close();
	}
}
run().catch(console.dir);