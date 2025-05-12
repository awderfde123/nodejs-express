const joi = require('joi')

const requiredStringSchema = () => joi.string().required()

const nullableStringSchema = () => joi.string().allow(null, '').default(null)

const requiredNumberSchema = () => joi.number().required()

const nullableNumberSchema = () => joi.number().allow(null, '').default(null)

const requiredIntegerSchema = () => requiredNumberSchema().integer()

const nullableIntegerSchema = () => nullableNumberSchema().integer()

const OBJECTID_REGEX = /^[0-9a-fA-F]{24}$/

const requiredObjectIdSchema = () =>
  requiredStringSchema().pattern(OBJECTID_REGEX)

const nullableObjectIdSchema = () =>
  nullableStringSchema().pattern(OBJECTID_REGEX)

const pagingSchema = () =>
  joi.object().keys({
    page: nullableIntegerSchema().default(1),
    size: nullableIntegerSchema().default(10),
  })

const idSchema = () =>
  joi.object().keys({
    id: requiredObjectIdSchema(),
  })

const validateData = (schema, data) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  })
  return { error, value }
}

module.exports = {
  requiredObjectIdSchema,
  nullableObjectIdSchema,
  requiredStringSchema,
  nullableStringSchema,
  requiredNumberSchema,
  nullableNumberSchema,
  requiredIntegerSchema,
  nullableIntegerSchema,
  pagingSchema,
  idSchema,
  validateData,
}
