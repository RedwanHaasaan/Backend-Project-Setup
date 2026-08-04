import { users } from "./user.constant.js";
import { LoginUser, RegisterUser } from "./user.types.js";

const registerService = (payload: RegisterUser) => {
  const exists = users.find((user) => user.email === payload.email);

  if (exists) {
    throw new Error("User already exists");
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
    throw new Error("Invalid credentials");
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