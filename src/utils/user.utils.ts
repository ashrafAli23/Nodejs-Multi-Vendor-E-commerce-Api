import bcrypt from "bcrypt";

export class User {
  static async isPassword(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
