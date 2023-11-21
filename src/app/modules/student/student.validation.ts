import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: 'firstName should be in capitalize format' },
    ),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherContact: z.string().min(1),
  fatherOccupation: z.string().min(1),
  motherName: z.string().min(1),
  motherContact: z.string().min(1),
  motherOccupation: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contact: z.string().min(1),
  address: z.string().min(1),
});

const studentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'others']),
  dateOfBirth: z.string().optional(),
  email: z.string().email().min(1),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
