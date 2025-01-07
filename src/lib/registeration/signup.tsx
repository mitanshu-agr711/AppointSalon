import mongoose, { Schema, Document } from 'mongoose';
// import { unique } from 'next/dist/build/utils';
import bcrypt from 'bcrypt';
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
        unique: true,
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

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
      return bcrypt.compare(candidatePassword, this.password);
    };

    
  

export const Sign = mongoose.models.Sign || mongoose.model<IUser>('Sign', UserSchema);
