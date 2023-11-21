import Joi from 'joi';

//creating a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, 'capitalize'),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/, 'alpha'),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherContact: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContact: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string(),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .required(),
});

export default studentValidationSchema;
