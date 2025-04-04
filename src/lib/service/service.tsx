import mongoose, { Schema, Document } from 'mongoose';
// import { unique } from 'next/dist/build/utils';

export interface IService extends Document {
  agent: string;
  service: string;
  price: number;
}

const ServiceSchema: Schema = new mongoose.Schema(
  {
    index: { 
      required: true,
      type: Number,
    },
    agent: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    email:{
        type: String,
        required: true,
    },
    slot:{
        type: String,
        required: true
    }
  },
  { timestamps: true } 
);

// ServiceSchema.index({ agent: 1, service:  }, { unique: true });

export const Service =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
