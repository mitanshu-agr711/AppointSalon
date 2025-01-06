import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {

        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
      },
      message: "Only Gmail addresses are allowed!",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long!"],
  },
});


export const Sign = mongoose.models.Sign || mongoose.model<IUser>('Sign', UserSchema);
