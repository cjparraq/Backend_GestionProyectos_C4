import { progressModel } from './advance.js';

const progressResolvers = {
  Query: {
    Advances: async (parent, args) => {
      const advance = await progressModel.find().populate('project').populate('createBy');
      return advance;
    },
    AdvanceFilter: async (parents, args) => {
      const progressFiltered = await progressModel.find({ project: args._id })
        .populate('project')
        .populate('createBy');
      return progressFiltered;
    },
  },
  Mutation: {
    createAdvance: async (parents, args) => {
      const progressCreated = progressModel.create({
        date: args.date,
        description: args.description,
        project: args.project,
        createBy: args.createBy,
      });
      return progressCreated;
    },
  },
};

export { progressResolvers };
