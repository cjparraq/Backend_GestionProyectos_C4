import mongoose from 'mongoose';
import { ProjectModel } from '../project/project.js';
import { UserModel } from '../user/user.js';

const { Schema, model } = mongoose;

const advanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  observation: [
    {
      type: String,
    }
  ],
  project: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

export const progressModel = model('Advance', advanceSchema, 'advance');