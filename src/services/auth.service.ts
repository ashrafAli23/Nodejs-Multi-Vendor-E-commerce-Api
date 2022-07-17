import { NotFoundError } from "../apiResponse/notFoundError";
import { TokenTypes } from "../enum/token.enum";
import TokenModel from "../models/Token";
import UserModel, { IUser } from "../models/User";
import { User } from "../utils/user.utils";
import tokenService from "./token.service";

/**
 * @desc    Sign In Service
 * @param   { Object } body - User email address
 * @return  { Object<user> }
 */
const login = async (body: any): Promise<IUser> => {
  const { email, password } = body;

  const user = await UserModel.findOne({ email });

  if (!user || !(await User.isPassword(password, user.password))) {
    throw new NotFoundError("Invalid Email or Password");
  }

  return user;
};

/**
 * @desc    Logout Service
 * @param   { String } refreshToken - User's refresh token
 * @return  { Void }
 */
const logout = async (refreshToken: string): Promise<void> => {
  const token = await TokenModel.findOneAndDelete({
    token: refreshToken,
    type: TokenTypes.REFRESH,
  });

  if (!token) {
    throw new NotFoundError("Invalid Token");
  }
};

/**
 * @desc    Logout Service
 * @param   { String } refreshToken - User's refresh token
 * @return  { Object }
 */
const refreshToken = (refreshToken: string) => {
  return tokenService.refreshToken(refreshToken);
};

export default {
  login,
  logout,
  refreshToken,
};
