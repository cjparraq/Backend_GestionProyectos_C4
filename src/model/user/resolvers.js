//Equivalente a los controladores
import { UserModel } from "./user.js";
import bcrypt from 'bcrypt';

const UserResolvers = {
  Query: {
    Users: async (parent, args, context) => {
      const users = await UserModel.find().populate([
        {
          path: 'inscriptions',
          populate: {
            path: 'project',
            populate: [{ path: 'leader' }, { path: 'advances' }],
          },
        },
        {
          path: 'ledProjects',
        },
      ]);
      console.log('[readUsers] => Query 1 Success!');
      return users;
    },

    User: async (parent, args) => {
      const user = await UserModel.findOne({ _id: args._id })
      console.log('[readOneUser] => Query 2 Success!');
      return user;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const userCreated = await UserModel.create({
        name: args.name,
        lastname: args.lastname,
        dni: args.dni,
        email: args.email,
        role: args.role,
        password: hashedPassword,
      });
      console.log('[createUser] => Mutation 1 Success!');
      if (Object.keys(args).includes('state')) {
        userCreated.state = args.state;
      }
      return userCreated;
    },

    updateUser: async (parents, args) => {
      const userUpdate = await UserModel.findByIdAndUpdate(args._id, {
        name: args.name,
        lastname: args.lastname,
        dni: args.dni,
        email: args.email,
        role: args.role,
        state: args.state,
      },
      { new: true }
      );

      console.log('[updateUser] => Mutation 3 Success!');
      return userUpdate;
    },

    deleteUser: async (parents, args) => {
      if (Object.keys(args).includes('_id')) {
        const userDelete = await UserModel.findOneAndDelete({ _id: args._id });
        console.log('[deleteUserById] => Mutation 2 Success!');
        return userDelete;
      } else if (Object.keys(args).includes('email')) {
        const userDelete = await UserModel.findOneAndDelete({ email: args.email });
        console.log('[deleteUserByEmail] => Mutation 2 Success!');
        return userDelete;
      }
    },
  }
};

export { UserResolvers };