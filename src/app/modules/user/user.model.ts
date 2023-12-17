/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'faculty', 'student'],
      },
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
      },
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//pre save middleware/hook:   will work on create() and save()
userSchema.pre('save', async function (next) {
  const user = this;
  //hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware/hook
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

userSchema.statics.isPasswordMatched = async function (
  planTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(planTextPassword, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
