import UserModel, { IUser } from "../models/User";
import { ErrorResponse } from "../apiResponse/errorResponse";
import { NotFoundError } from "../apiResponse/notFoundError";
import { Request } from "express";

/**
 * @docs    Create New User
 * @param   { Object } body - Body object data
 * @returns { Object<user> }
 */

const createUser = async (body: IUser): Promise<IUser> => {
  const { email } = body;

  const isEmailTaken = await UserModel.findOne({ email });

  //   Check if email already taken
  if (isEmailTaken) {
    throw new ErrorResponse("Email already taken");
  }

  const user = await UserModel.create(body);
  return user;
};

/**
 * @desc    Update User Details Using It's ID
 * @param   { String } userId - An string from logged in user data
 * @param   { Object } body - Body object data
 * @returns { Object<user> }
 */
const updateUser = async (userId: string, body: any): Promise<IUser> => {
  const user = await UserModel.findByIdAndUpdate({ _id: userId }, body, {
    new: true,
  });

  if (!user) {
    throw new ErrorResponse("User update failed");
  }

  return user;
};

/**
 * @desc    Update User Password Using It's ID
 * @param   { String } userId - An string from logged in user data
 * @param   { Object } body - Body object data
 * @returns { Object<user> }
 */
const updateUserPassword = async (
  userId: string,
  body: any
): Promise<IUser> => {
  const { newPassword, oldPassword } = body;

  if (newPassword === oldPassword) {
    throw new ErrorResponse("Old password can't be same with new password");
  }

  const user = await UserModel.findByIdAndUpdate(
    userId,
    {
      password: newPassword,
    },
    { new: true }
  );

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

/**
 * @desc    Update User Photo Using It's ID
 * @param   { String } userId - An string from logged in user data
 * @param   { File } image - File data
 */
const UserProfileImage = async (userId: string, image: any) => {
  if (!image) {
    throw new ErrorResponse("Profile Image Required");
  }

  await UserModel.findByIdAndUpdate(
    userId,
    { photo: image.path },
    { new: true }
  );
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
  updateUser,
  updateUserPassword,
  UserProfileImage,
};
