import { Response } from "express";
import { IApiResponse } from "../types/apiResponse.js";

const sendResponse = <T>(res: Response,data: IApiResponse<T>) => {
  return res.status(data.statusCode).json(data);
};

export default sendResponse;