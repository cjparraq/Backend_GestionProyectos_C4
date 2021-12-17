import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, //unico en la BD
    validate: {
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email); //expresion regular que valida el correo (patrones) - regex
      },
    message: '[CreateUSer] => the email is not valid',

  }
},
  password: {
    type: String,
    required: true,
},
  dni: {
    type: String,
    required: true,
    unique: true,
},
  name: {
    type: String,
    required: true,
},
  lastname: {
    type: String,
    required: true,
},
  role: {
    type: String,
    required: true,
    enum: ['STUDENT', 'LEADER', 'ADMINISTRATOR'],
},
  state: {
    type: String,
    enum: ['PENDING', 'AUTHORIZED', 'NO_AUTHORIZED'],
    default: 'PENDING',
}
});

userSchema.virtual('ledProjects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'leadaer',
});

userSchema.virtual('advancesCreated', {
  ref: 'Advance',
  localField: '_id',
  foreignField: 'createdBy',
});

userSchema.virtual('inscriptions', {
  ref: 'Inscription',
  localField: '_id',
  foreignField: 'student',
});

export const UserModel = model('User', userSchema, 'user');


