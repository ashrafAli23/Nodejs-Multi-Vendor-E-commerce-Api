import UserModel, { IUser } from "../models/User";
import { ErrorResponse } from "../apiResponse/errorResponse";
import { NotFoundError } from "../apiResponse/notFoundError";

/**
 * @docs    Create New User
 * @param   { Object } body - Body object data
 * @returns { Object<user> }
 */

const createUser = async (body: IUser): Promise<IUser> => {
  const { email } = body;

  const isEmailTaken = await UserModel.findOne({ email });

  //   Check if email already taken
  if (!isEmailTaken) {
    throw new ErrorResponse("Email already taken");
  }

  const user = await UserModel.create(body);
  return user;
};

/**
 * @docs    Find User By ID
 * @param   { Object } userId - Body user data
 * @returns { Object<user> }
 */
const findUserById = async (userId: string): Promise<IUser> => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundError("User Not Found");
  }
  return user;
};

export default {
  createUser,
  findUserById,
};
