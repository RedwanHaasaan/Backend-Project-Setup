import HttpStatus from "../../constants/httpStatus.js";
import AppError from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { LoginUser, RegisterUser } from "../../types/auth/auth.types.js";

const registerService = async (payload: RegisterUser) => {
  const createdUser = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      email: true,
      fullname: true,
    },
  });
  return createdUser;
};

const loginService = async (payload: LoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      email: true,
      fullname: true,
      password: true,
    },
  });

  if (!user) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid Credentials', [], "Check your email and password carefully and enter valid credential");
  }

  const isPasswordValid = (payload.password === user.password);
  if (!isPasswordValid) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid Credentials', [], "Check your email and password carefully and enter valid credential");
  }
  return user;
};

export default {
  registerService,
  loginService,
};