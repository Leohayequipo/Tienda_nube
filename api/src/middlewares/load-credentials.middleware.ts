import { NextFunction, Request, Response } from "express";
import { HttpErrorException } from "@utils";
import userRepository from "../repository/UserRepository";

export const loadCredentialsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header missing or invalid",
        description: "Bearer token is required"
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    
    // Buscar en las credenciales guardadas
    const credentials = userRepository.findFirst();
    
    if (!credentials || credentials.access_token !== token) {
      return res.status(401).json({
        message: "Invalid access token",
        description: "The provided access token is not valid"
      });
    }

    // Asignar el usuario al request
    req.user = {
      access_token: credentials.access_token,
      user_id: credentials.user_id
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      description: "Unable to verify credentials"
    });
  }
}; 