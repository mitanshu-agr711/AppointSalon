import mongoose, { Schema, Document } from 'mongoose';


export interface IUser extends Document {
  first: string;
  second: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new mongoose.Schema({
  first: { type: String, required: true },
  second: { type: String, required: true },
    email: {
         type: String, required: true
         },
  password: { type: String, required: true },

});
// UserSchema.index({ select: 1,service: 1, price: 1 }, { unique: true });

export const Sign = mongoose.models.User || mongoose.model<IUser>('Sign', UserSchema);

