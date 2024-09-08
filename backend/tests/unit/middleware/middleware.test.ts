import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../../../src/middleware/auth';
import errorHandler from '../../../src/middleware/errorHandler';

jest.mock('jsonwebtoken');

describe('Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('authMiddleware', () => {
    it('should call next with an error if no token is provided', () => {
      authMiddleware(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
    });

    it('should call next with an error if token verification fails', () => {
      req.headers.authorization = 'Bearer invalidtoken';
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      authMiddleware(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
    });

    it('should call next if token is valid', () => {
      req.headers.authorization = 'Bearer validtoken';
      (jwt.verify as jest.Mock).mockReturnValue({ userId: 'testUserId' });

      authMiddleware(req as Request, res as Response, next);

      expect(req.user).toEqual({ userId: 'testUserId' });
      expect(next).toHaveBeenCalled();
    });
  });

  describe('errorHandler', () => {
    it('should respond with 500 and error message', () => {
      const error = new Error('Test error');
      errorHandler(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Something broke!' });
    });
  });
});