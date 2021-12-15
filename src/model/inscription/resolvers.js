import { InscriptionModel } from './inscription.js';

const inscriptionResolvers = {
  Query: {
    Inscriptions: async (parent, args) => {
      const inscriptions = await InscriptionModel.find();
      return inscriptions;
    },
  },
  Mutation: {
    createInscription: async (parent, args) => {
      const inscriptionCreate = await InscriptionModel.create({
        state: args.state,
        project: args.project,
        student: args.student,
      });
      return inscriptionCreate;
    },
    approveInscription: async (parent, args) => {
      const inscriptionApproved = await InscriptionModel.findByIdAndUpdate(
        args.id,
        {
          state: 'ACCEPTED',
          date_init: Date.now(),
        },
        { new: true }
      );
      return inscriptionApproved;
    },
  },
};

export { inscriptionResolvers };
