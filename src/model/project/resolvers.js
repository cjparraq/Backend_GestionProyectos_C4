import { ProjectModel } from './project.js';

const projectResolvers = {
  Query: {
    Projects: async (parent, args) => {
      const projects = await ProjectModel.find();
      return projects;
    },
  },
  Mutation: {
    createProject: async (parent, args, context) => {
      const projectCreated = await ProjectModel.create({
        name: args.name,
        state: args.state,
        phase: args.phase,
        date_init: args.date_init,
        date_end: args.date_end,
        budget: args.budget,
        leader: args.leader,
        objectives: args.objectives,
      });
      return projectCreated;
    },
    updateProject: async (parent, args) => {
      const updateProjected = await ProjectModel.findByIdAndUpdate(
        args._id,
        { ...args.fields },
        { new: true }
      );
      return updateProjected;
    },
    createObjective: async (parent, args) => {
      const projectWithObjectives = await ProjectModel.findByIdAndUpdate(
        args.idProject,
        {
          $addToSet: {
            objectives: { ...args.fields },
          },
        },
        { new: true }
      );

      return projectWithObjectives;
    },
    updateObjective: async (parent, args) => {
      const projectEdited = await ProjectModel.findByIdAndUpdate(
        args.idProject,
        {
          $set: {
            [`objectives.${args.indexObjective}.description`]: args.fields.description,
            [`objectives.${args.indexObjective}.type`]: args.fields.type,
          },
        },
        { new: true }
      );
      return projectEdited;
    },
    deleteObjective: async (parent, args) => {
      const ObjectiveProject =
   await ProjectModel.findByIdAndUpdate(
        { _id: args.idProject },
        {
          $pull: {
            objectives: {
              _id: args.idObjective,
            },
          },
        },
        { new: true }
      );
      return ObjectiveProject;
    },
   },
};

export { projectResolvers };
