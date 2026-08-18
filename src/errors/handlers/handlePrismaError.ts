import { Prisma } from "../../generated/prisma/client.js";

const handlePrismaError = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      // ==========================================
      // DATA / FIELD ERRORS
      // ==========================================

      case "P2000":
        return {
          statusCode: 400,
          message: "Invalid Data",
          hints: "Check the length of the provided value and make sure it matches the field requirements.",
          errors: [
            {
              path: String(error.meta?.column_name ?? ""),
              message: "The provided value is too long.",
            },
          ],
        };

      case "P2005":
        return {
          statusCode: 400,
          message: "Invalid Data",
          hints: "Check the value format and make sure it matches the expected database field type.",
          errors: [
            {
              path: String(error.meta?.field_name ?? ""),
              message: "The provided value has an invalid format.",
            },
          ],
        };

      case "P2006":
      case "P2007":
      case "P2019":
        return {
          statusCode: 400,
          message: "Invalid Data",
          hints: "Check the submitted values against the expected schema and provide valid data.",
          errors: [
            {
              path: String(
                error.meta?.field_name ??
                error.meta?.column_name ??
                "",
              ),
              message: "The provided data is invalid.",
            },
          ],
        };

      case "P2020":
        return {
          statusCode: 400,
          message: "Value Out of Range",
          hints: "Provide a value within the allowed range for this field.",
          errors: [
            {
              path: String(error.meta?.field_name ?? ""),
              message: "The provided value is outside the allowed range.",
            },
          ],
        };

      case "P2023":
        return {
          statusCode: 400,
          message: "Invalid Data",
          hints: "Check the value format and make sure it matches the expected database field type.",
          errors: [
            {
              path: String(
                error.meta?.field_name ??
                error.meta?.column_name ??
                "",
              ),
              message:
                "The provided data is inconsistent with the expected field type.",
            },
          ],
        };

      case "P2033":
        return {
          statusCode: 400,
          message: "Invalid Data",
          hints: "Provide a numeric value within the supported database range.",
          errors: [
            {
              path: "",
              message: "The provided number is too large.",
            },
          ],
        };

      // ==========================================
      // RECORD NOT FOUND
      // ==========================================

      case "P2001":
      case "P2015":
      case "P2018":
      case "P2025":
        return {
          statusCode: 404,
          message: "Not Found",
          hints: "Verify the provided ID or resource identifier and try again.",
          errors: [
            {
              path: "",
              message: "The requested record was not found.",
            },
          ],
        };

      // ==========================================
      // UNIQUE CONSTRAINT
      // ==========================================

      case "P2002": {
        let target = "";

        if (Array.isArray(error.meta?.target)) {
          target = error.meta.target.join(", ");
        } else if (typeof error.meta?.target === "string") {
          target = error.meta.target;
        }

        if (!target) {
          // Extract field name from Prisma error message (e.g. `Unique constraint failed on the fields: (`email`)`)
          const match =
            error.message.match(/fields:\s*\(`?([^`\s\)]+)`?\)/i) ||
            error.message.match(/fields:\s*\(([^)]+)\)/i);
          if (match && match[1]) {
            target = match[1].replace(/`/g, "").trim();
          }
        }

        if (!target && error.meta?.modelName && typeof error.meta.modelName === "string") {
          target = error.meta.modelName.toLowerCase();
        }

        if (!target) {
          target = "field";
        }

        return {
          statusCode: 409,
          message: "Conflict",
          hints: `Use a different value for ${target}.`,
          errors: [
            {
              path: target,
              message: `${target} already exists.`,
            },
          ],
        };
      }

      // ==========================================
      // FOREIGN KEY CONSTRAINT
      // ==========================================

      case "P2003": {
        const field =
          (typeof error.meta?.field_name === "string" && error.meta.field_name) ||
          (typeof error.meta?.column_name === "string" && error.meta.column_name) ||
          (error.message.match(/foreign key constraint failed on the field:\s*`?([^`\s\)]+)`?/i)?.[1]) ||
          "";

        return {
          statusCode: 409,
          message: "Conflict",
          hints: "Make sure the referenced record exists before performing this operation.",
          errors: [
            {
              path: field.replace(/`/g, "").trim(),
              message: "The operation violates a foreign key constraint.",
            },
          ],
        };
      }

      // ==========================================
      // RELATION CONSTRAINT
      // ==========================================

      case "P2014": {
        const relation =
          (typeof error.meta?.relation_name === "string" && error.meta.relation_name) ||
          "";

        return {
          statusCode: 409,
          message: "Relationship Conflict",
          hints: "Make sure the required related record exists before modifying this relationship.",
          errors: [
            {
              path: relation,
              message: "This operation violates a required relationship.",
            },
          ],
        };
      }

      case "P2017": {
        const relation =
          (typeof error.meta?.relation_name === "string" && error.meta.relation_name) ||
          "";

        return {
          statusCode: 409,
          message: "Relationship Conflict",
          hints: "Verify the related record IDs and make sure the required relationship exists.",
          errors: [
            {
              path: relation,
              message: "The requested records are not connected.",
            },
          ],
        };
      }

      // ==========================================
      // NULL / REQUIRED VALUE
      // ==========================================

      case "P2011": {
        const field =
          (typeof error.meta?.constraint === "string" && error.meta.constraint) ||
          (typeof error.meta?.column_name === "string" && error.meta.column_name) ||
          "";

        return {
          statusCode: 400,
          message: "Invalid Data",
          hints: "Provide a valid value for the required field.",
          errors: [
            {
              path: field,
              message: "This field cannot be null.",
            },
          ],
        };
      }

      case "P2012":
      case "P2013": {
        const field =
          (typeof error.meta?.field_name === "string" && error.meta.field_name) ||
          (typeof error.meta?.column_name === "string" && error.meta.column_name) ||
          "";

        return {
          statusCode: 400,
          message: "Invalid Data",
          hints: "Make sure all required fields and arguments are provided.",
          errors: [
            {
              path: field,
              message: "A required value is missing.",
            },
          ],
        };
      }

      // ==========================================
      // QUERY ERRORS
      // ==========================================

      case "P2008":
      case "P2009":
      case "P2016":
      case "P2029":
        return {
          statusCode: 400,
          message: "Invalid Request",
          hints: "Check your request parameters, filters, fields, and query arguments.",
          errors: [
            {
              path: "",
              message: "The database query could not be processed.",
            },
          ],
        };

      // ==========================================
      // DATABASE UNAVAILABLE
      // ==========================================

      case "P2024":
        return {
          statusCode: 503,
          message: "Database Unavailable",
          hints: "Please try again later. If the problem persists, contact the system administrator.",
          errors: [
            {
              path: "",
              message:
                "The database service is temporarily unavailable.",
            },
          ],
        };

      // ==========================================
      // TRANSACTION CONFLICT
      // ==========================================

      case "P2034":
        return {
          statusCode: 409,
          message: "Transaction Conflict",
          hints: "Retry the operation. If the problem persists, review transaction concurrency.",
          errors: [
            {
              path: "",
              message:
                "The transaction could not be completed. Please try again.",
            },
          ],
        };

      // ==========================================
      // SERVER-SIDE DATABASE ERRORS
      // ==========================================

      case "P2010":
      case "P2021":
      case "P2022":
      case "P2026":
      case "P2027":
      case "P2028":
      case "P2030":
      case "P2031":
        return {
          statusCode: 500,
          message: "Database Error",
          hints: "Please try again later. If the problem persists, contact the system administrator.",
          errors: [
            {
              path: "",
              message: "An unexpected database error occurred.",
            },
          ],
        };

      // ==========================================
      // UNKNOWN PRISMA ERROR
      // ==========================================

      default:
        return {
          statusCode: 500,
          message: "Database Error",
          hints: "Please try again later. If the problem persists, contact the system administrator.",
          errors: [
            {
              path: "",
              message: "An unexpected database error occurred.",
            },
          ],
        };
    }
  }

  // ==========================================
  // PRISMA VALIDATION ERROR
  // ==========================================

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      statusCode: 400,
      message: "Invalid Request",
      hints: "Check the request data and make sure all required fields have valid values.",
      errors: [
        {
          path: "",
          message: "The provided data could not be processed.",
        },
      ],
    };
  }

  // ==========================================
  // DATABASE INITIALIZATION
  // ==========================================

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      statusCode: 503,
      message: "Database Unavailable",
      hints: "Please try again later. If the problem persists, contact the system administrator.",
      errors: [
        {
          path: "",
          message:
            "The database service is currently unavailable.",
        },
      ],
    };
  }

  // ==========================================
  // UNKNOWN PRISMA REQUEST ERROR
  // ==========================================

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      statusCode: 500,
      message: "Database Error",
      hints: "Please try again later. If the problem persists, contact the system administrator.",
      errors: [
        {
          path: "",
          message: "An unexpected database error occurred.",
        },
      ],
    };
  }

  // ==========================================
  // PRISMA ENGINE PANIC
  // ==========================================

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return {
      statusCode: 500,
      message: "Database Error",
      hints: "Please try again later. If the problem persists, contact the system administrator.",
      errors: [
        {
          path: "",
          message: "An unexpected database error occurred.",
        },
      ],
    };
  }

  // ==========================================
  // FALLBACK
  // ==========================================

  return {
    statusCode: 500,
    message: "Internal Server Error",
    hints: "Please try again later. If the problem persists, contact the system administrator.",
    errors: [
      {
        path: "",
        message: "Something went wrong.",
      },
    ],
  };
};

export default handlePrismaError;