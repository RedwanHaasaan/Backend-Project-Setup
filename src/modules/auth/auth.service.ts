import { uuidv4 } from "zod";
import HttpStatus from "../../constants/httpStatus.js";
import AppError from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { LoginUser, RegisterUser } from "./auth.types.js";

const registerService = async (payload: RegisterUser) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new AppError(HttpStatus.CONFLICT,"User already exists",[],"User Already Exist.Instead of register try to login with Credential");
  }
  const createdUser = await prisma.user.create({
    data: {
      id: uuidv4().toString(),
      fullname: payload.fullname,
      email: payload.email,
      password: payload.password,
    },
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
      throw new AppError(HttpStatus.UNAUTHORIZED,'Invalid Credentials',[],"Check your email and password carefully and enter valid credential");
    }

    const isPasswordValid = (payload.password === user.password);
    if (!isPasswordValid) {
      throw new AppError(HttpStatus.UNAUTHORIZED,'Invalid Credentials',[],"Check your email and password carefully and enter valid credential");
    }
    return user;
  };

export default {
  registerService,
  loginService,
};