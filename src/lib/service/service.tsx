import mongoose, { Schema, Document } from 'mongoose';


export interface IUser extends Document {
  select: string;
  service: string;
  price: number;
 
}

const ServiceSchema: Schema = new mongoose.Schema({
  agent: { 
    type: String,
     required: true 
},
  service: { 
    type: String,
     required: true
     },
  price: { 
    type: Number,
     required: true, 
     unique: true 
    },

});
// ServiceSchema.index({ select: 1,service: 1, price: 1 }, { unique: true });

export const Service= mongoose.models.User || mongoose.model<IUser>('Servicer', ServiceSchema);

