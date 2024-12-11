import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  service: string;
  price: number;
 
}

const UserSchema: Schema = new mongoose.Schema({
  service: { type: String, required: true },
  price: { type: Number, required: true, unique: true },

});
UserSchema.index({ service: 1, price: 1 }, { unique: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

