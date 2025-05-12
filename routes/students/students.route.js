const express = require('express')
const router = express.Router()

const {
  listStudent,
  detailStudent,
  createStudent,
  modifyStudent,
  removeStudent,
} = require('./students.service')
const {
  pagingSchema,
  idSchema,
  validateData,
} = require('../../schema/base.schema')
const {
  createStudentSchema,
  modifyStudentSchema,
} = require('./students.schema')

router.get('/', async (req, res) => {
  const { error, value } = validateData(pagingSchema(), req.query)
  if (error) {
    return res.status(400).send({ message: 'invalid page or size' })
  }
  const { page, size } = value
  const students = await listStudent(page, size)
  res.send(students)
})

router.get('/:id', async (req, res) => {
  const { error, value } = validateData(idSchema(), req.params)
  if (error) {
    return res.status(400).send({ message: 'invalid id' })
  }
  const { id } = value
  const student = await detailStudent(id)
  if (!student) {
    return res.status(404).send({ message: 'not found' })
  }
  res.send(student)
})

router.post('/', async (req, res) => {
  const { error, value } = validateData(createStudentSchema(), req.body)
  if (error) {
    return res.status(400).send({ message: 'invalid student' })
  }
  await createStudent(value)
  res.send({ message: 'ok' })
})

router.put('/', async (req, res) => {
  const { error, value } = validateData(modifyStudentSchema(), req.body)
  if (error) {
    return res.status(400).send({ message: 'invalid student' })
  }
  const matchedCount = await modifyStudent(value)
  if (matchedCount !== 1) {
    return res.status(404).send({ message: 'not found' })
  }
  res.send({ message: 'ok' })
})

router.delete('/:id', async (req, res) => {
  const { error, value } = validateData(idSchema(), req.params)
  if (error) {
    return res.status(400).send({ message: 'invalid id' })
  }
  const { id } = value
  const matchedCount = await removeStudent(id)
  if (matchedCount !== 1) {
    return res.status(404).send({ message: 'not found' })
  }
  res.send({ message: 'ok' })
})

module.exports = router
