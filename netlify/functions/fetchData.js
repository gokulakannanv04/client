// netlify/functions/fetchData.js
const { MongoClient } = require('mongodb');

exports.handler = async (event, context) => {
  try {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('your-database-name');
    const collection = database.collection('your-collection-name');

    // Fetch data from MongoDB
    const result = await collection.find().toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error in Netlify Function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
};

