import mongoose from 'mongoose';
import { ProjectModel } from '../project/project.js';
import { UserModel } from '../user/user.js';

const { Schema, model } = mongoose;

//Schema
const inscriptionSchema = new Schema({
  date_init: {
    type: Date,
    required: true,
  },
  date_end: {
    type: Date,
    required: true,
  },
  state: [
    {
      type: String,
      enum: ['ACCEPTED', 'REJECTED', 'PENDING'],
      default: 'PENDING',
      required: true,
    }
  ],
  project: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

export const InscriptionModel = model('Inscription', inscriptionSchema, 'inscription');