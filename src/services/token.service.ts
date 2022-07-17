import { sign, verify } from "jsonwebtoken";
import config from "../config/dotenv";
import { TokenTypes } from "../enum/token.enum";
import { IUser } from "../models/User";
import TokenModel from "../models/Token";
import { IToken } from "../models/Token";
import { ErrorResponse } from "../apiResponse/errorResponse";
import moment from "moment";
import { NotFoundError } from "../apiResponse/notFoundError";
import userService from "./user.service";

/**
 * Generate token
 * @param {Object} data
 * @param {Enum} TokenTypes
 * @returns {string}
 */
const generateToken = (
  data: object,
  expires: moment.Moment,
  TokenTypes: TokenTypes
): string => {
  const payload = {
    data,
    iat: moment().unix(),
    expires: expires.unix(),
    type: TokenTypes,
  };

  return sign(payload, config.jwtKey);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} tokenType
 * @returns { Promise <IToken> }
 */
const verifyToken = async (
  token: string,
  tokenType: TokenTypes
): Promise<IToken> => {
  const payload: any = verify(token, config.jwtKey);

  if (payload == null) {
    throw new ErrorResponse("Invalid or Expired token");
  }

  const tokenDoc = await TokenModel.findOne({
    token,
    user: payload._id,
    type: tokenType,
  });

  if (!tokenDoc) {
    throw new ErrorResponse("Token not found", 404);
  }

  return tokenDoc;
};

/**
 * Save a token
 * @param   { String }    token
 * @param   { ObjectId }  userId
 * @param   { String }    type
 * @returns { Promise <IToken> }
 */
const saveToken = async (
  token: string,
  userId: string,
  type: TokenTypes,
  expires: moment.Moment
): Promise<IToken> => {
  const tokenDoc = await TokenModel.create({
    token,
    user: userId,
    type,
    expires: expires.toDate(),
  });

  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user: IUser): Promise<object> => {
  const { _id, role } = user;

  const payload = { _id, role };

  const accessTokenExpires = moment().add(config.accessExpires, "minutes");
  const accessToken = generateToken(
    payload,
    accessTokenExpires,
    TokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(config.refreshExpires, "days");
  const refreshToken = generateToken(
    payload,
    refreshTokenExpires,
    TokenTypes.REFRESH
  );

  await saveToken(
    refreshToken,
    user._id,
    TokenTypes.REFRESH,
    refreshTokenExpires
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  const verified = await verifyToken(refreshToken, TokenTypes.REFRESH);
  if (!verified) {
    throw new NotFoundError("Refresh Token not found");
  }

  const user = await userService.findUserById(verified._id);

  return generateAuthTokens(user._id);
};

export default {
  generateAuthTokens,
  refreshToken,
};
