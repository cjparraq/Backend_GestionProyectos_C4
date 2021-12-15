import mongoose from 'mongoose';
import { UserModel } from '../user/user.js';

const { Schema, model } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String, //tipos de datos de mongo
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  date_init: {
    type: Date,
    required: true,
  },
  date_end: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'INACTIVE',
  },
  phase: {
    type: String,
    enum: ['INITIATED', 'DEVELOPING', 'FINISHED', 'NULL'],
    default: 'NULL',
  },
  leader: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: UserModel,
  },
  objectives: [
    {
      description: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['GENERAL', 'SPECIFIC'],
        required: true,
      },
    },
  ],
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.virtual('Advances', {
  ref: 'Advance',
  localField: '_id',
  foreignField: 'project',
});

projectSchema.virtual('Inscriptions', {
  ref: 'Inscription',
  localField: '_id',
  foreignField: 'project',
});

export const ProjectModel = model('Project', projectSchema, 'project');