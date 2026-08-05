import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

const validateRequest =(schema: ZodType) =>(req: Request, res: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  };

export default validateRequest;