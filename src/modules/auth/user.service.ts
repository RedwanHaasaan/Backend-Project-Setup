import AppError from "../../errors/AppError.js";
import { users } from "./user.constant.js";
import { LoginUser, RegisterUser } from "./user.types.js";

const registerService = (payload: RegisterUser) => {
  const exists = users.find((user) => user.email === payload.email);

  if (exists) {
    throw new AppError(401,"User already exists",[],"User Already Exist.Instead of register try to login with Credential");
  }

  const newUser = {
    id: users.length + 1,
    ...payload,
  };

  users.push(newUser);

  return newUser;
};

  const loginService = (payload: LoginUser) => {
    const user = users.find(
      (user) =>
        user.email === payload.email &&
        user.password === payload.password
    );

    if (!user) {
      throw new AppError(401,'Invalid Credentials',[],"Check your email and password carefully and enter valid credential");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  };

export default {
  registerService,
  loginService,
};