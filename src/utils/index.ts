const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

async function bcryptHash(password: string) {
  return bcrypt.hash(password, config.app.bcryptRounds);
}

async function bcryptCompare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

async function generateJWTToken(payload: any, secret = config.app.secret) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        ...payload,
        counter: generateRandomCode(6),
      },
      secret,
      { expiresIn: "720h" },
      (err: any, token: any) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}

function generateRandomCode(length: number) {
  return crypto
    .randomBytes(length * 3)
    .toString("base64")
    .split("+")
    .join("")
    .split("/")
    .join("")
    .split("=")
    .join("")
    .substr(0, length);
}

async function decodeToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.app.secret, (err: any, decoded: any) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

// function errorResponse(error: any) {
//   const response = { status: "error", message: "an error occurred" };
//   if (typeof error === "string") {
//     response.message = error;
//     return response;
//   }
//   response.error = error.toString();
//   return response;
// }

export const successResponse = (message: string, data: any) => {
  return {
    status: "success",
    message,
    data,
  };
};

function capitalizeString(s: string) {
  if (typeof s !== "string") return "";
  s = s.toLowerCase();
  return s
    .split(" ")
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

const utils = {
  bcryptHash,
  bcryptCompare,
  generateJWTToken,
  decodeToken,
  // errorResponse,
  successResponse,
  capitalizeString,
};

export default utils;
