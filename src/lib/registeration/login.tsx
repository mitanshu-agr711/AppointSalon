import mongoose, { Schema, Document } from 'mongoose';
// import bcrypt from 'bcrypt';
export interface IUser extends Document {
  first: string;
  second: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new mongoose.Schema({
  
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
},
{ timestamps: true } );

// UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
//     return bcrypt.compare(candidatePassword, this.password);
//   };

export const Login = mongoose.models.Sign || mongoose.model<IUser>('Login', UserSchema);
