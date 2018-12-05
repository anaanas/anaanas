const mongodb = require('mongodb')
const f = require('util').format;
const MongoClient = mongodb.MongoClient;
var db;

const connectToDBIfNotAlive = async () =>  {
	if (db && db.isConnected()) {
        return;
    }
	const user = encodeURIComponent(process.env.MONGODB_USER);
	const password = encodeURIComponent(process.env.MONGODB_PASS);
	const host = process.env.MONGODB_HOST;
	const authMechanism = 'DEFAULT';

	const uri = f('mongodb://%s:%s@%s:27017/?authMechanism=%s',
	  user, password, host, authMechanism);

	console.log("connecting : ", uri)

    try {
        db = await MongoClient.connect(uri, { useNewUrlParser: true });
    } catch (e) {
    	// TODO: custome error.
        throw e;
    }
}

exports.getHelloWorld = (req, res) => {
	res.send("Hello World");
}

exports.getHTTP = async (req, res) => {
	await connectToDBIfNotAlive().catch(
		(err) => {res.status(500).end(err.message);}
	)

	console.log('Hello World: db is ' + db.isConnected());
	res.send('Hello World: db is ' + db.isConnected());
}