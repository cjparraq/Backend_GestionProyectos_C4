import { UserModel } from '../../model/user/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/tokenUtils.js';

const authResolvers = {
  Mutation: {
    register: async (parent, args) => {
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
      console.log('[UserRegister] =>', userCreated);
      return {
        token: generateToken({
          _id: userCreated._id,
          name: userCreated.name,
          lastname: userCreated.lastname,
          dni: userCreated.dni,
          email: userCreated.email,
          role: userCreated.role,
        }),
      };
    },

    login: async (parent, args) => {
      const userFound = await UserModel.findOne({ email: args.email });
      if (await bcrypt.compare(args.password, userFound.password)) {
        return {
          token: generateToken({
            _id: userFound._id,
            name: userFound.name,
            lastname: userFound.lastname,
            dni: userFound.dni,
            email: userFound.email,
            role: userFound.role,
          }),
        };
      }
    },

    refreshToken: async (parent, args, context) => {
      console.log('[Context] =>', context);
      if (!context.userData) {
        return {
          error: '[Token no valid]',
        };
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            name: context.userData.name,
            lastname: context.userData.lastname,
            dni: context.userData.dni,
            email: context.userData.email,
            role: context.userData.role,
          }),
        };
      }
        },
  },
};

export { authResolvers };
