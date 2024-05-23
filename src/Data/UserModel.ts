/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IUser extends Document {
  user_id: number;
  name: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  user_id: { type: Number },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

export const UserModel = mongoose.model<IUser>('User', UserSchema);

