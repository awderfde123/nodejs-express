const { ObjectId } = require('mongodb')

const { getStudentsCollection } = require('../../services/database.service')

async function listStudent(page, size) {
  const studentsCollection = await getStudentsCollection()
  const conditions = {}
  const students = await studentsCollection
    .find(conditions)
    .skip((page - 1) * size)
    .limit(size)
    .toArray()
  return students
}

async function detailStudent(id) {
  const studentsCollection = await getStudentsCollection()
  const conditions = {
    _id: new ObjectId(id),
  }
  const student = await studentsCollection.findOne(conditions)
  return student
}

async function createStudent(student) {
  const studentsCollection = await getStudentsCollection()
  const newStudent = {
    name: student.name,
    className: student.className,
    seatNumber: student.seatNumber,
  }
  const { insertedId } = await studentsCollection.insertOne(newStudent)
  return insertedId
}

async function modifyStudent(student) {
  const studentsCollection = await getStudentsCollection()
  const conditions = {
    _id: new ObjectId(student._id),
  }
  const update = {
    $set: {
      name: student.name,
      className: student.className,
      seatNumber: student.seatNumber,
    },
  }
  const { matchedCount } = await studentsCollection.updateOne(
    conditions,
    update,
  )
  return matchedCount
}

async function removeStudent(id) {
  const studentsCollection = await getStudentsCollection()
  const conditions = {
    _id: new ObjectId(id),
  }
  const { matchedCount } = await studentsCollection.deleteOne(conditions)
  return matchedCount
}

module.exports = {
  listStudent,
  detailStudent,
  createStudent,
  modifyStudent,
  removeStudent,
}
