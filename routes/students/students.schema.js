const joi = require('joi')
const {
  RequiredStringSchema,
  NullableNumberSchema,
} = require('../../schema/base.schema')

const createStudentSchema = () =>
  joi.object().keys({
    name: RequiredStringSchema(),
    className: RequiredStringSchema(),
    seatNumber: NullableNumberSchema(),
  })

const modifyStudentSchema = () =>
  joi.object().keys({
    _id: RequiredStringSchema(),
    name: RequiredStringSchema(),
    className: RequiredStringSchema(),
    seatNumber: NullableNumberSchema(),
  })

module.exports = {
  createStudentSchema,
  modifyStudentSchema,
}
