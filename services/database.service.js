const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

async function getDb() {
  await client.connect()
  const db = client.db('StudentManagement')
  return db
}

async function getCollection(collectionName) {
  const db = await getDb()
  const collection = db.collection(collectionName)
  return collection
}

async function getStudentsCollection() {
  const studentsCollection = await getCollection('Students')
  return studentsCollection
}

module.exports = {
  getDb,
  getCollection,
  getStudentsCollection,
}
