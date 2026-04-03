import { UserRepository } from '../repositories/UserRepository.js';
import * as bcrypt from 'bcrypt';
import type { Request, Response, NextFunction } from 'express';
import { assertNonEmptyString, assertObject } from '../utils/TypeAssertions.js';
import { ResponseService } from '../utils/ResponseFactory.js';
import { assertCreateUserDTO } from '../DTOs/User/CreateUserDTO.js';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger.js';
type LoginBody = {
  email: string;
  password: string;
};

const expiresIn = process.env.JWT_EXPIRES
  ? parseInt(process.env.JWT_EXPIRES)
  : 3000;

function AssertsLoginBody(data: unknown): asserts data is LoginBody {
  assertObject(data);
  assertNonEmptyString(data.email);
  assertNonEmptyString(data.password);
}

const BLACKLIST: Record<string, boolean> = {};
//teste
export class AuthController {
  static async login(req: Request, res: Response) {
    const payload = req.body;
    try {
      AssertsLoginBody(payload);
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      return ResponseService.sendBadRequestError(res, err);
    }

    const user = await UserRepository.getUserByEmail(payload.email);

    const isValidPassword = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!isValidPassword) {
      return ResponseService.sendUnauthorizedError(res, 'Invalid password.');
    }

    const signedToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET ?? '',
      {
        expiresIn,
      },
    );

    return ResponseService.sendRequestSuccess(res, {
      id: user.id,
      token: signedToken,
    });
  }

  static async signup(req: Request, res: Response) {
    try {
      const payload = req.body;
      logger.info('Chegamos aqui');
      try {
        assertCreateUserDTO(payload);
      } catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        return ResponseService.sendBadRequestError(res, err);
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const encriptedPwd = await bcrypt.hash(payload.password, salt);

      const userId = await UserRepository.createUser({
        ...payload,
        password: encriptedPwd,
      });

      const signedToken = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET ?? '',
        {
          expiresIn,
        },
      );

      return ResponseService.sendRequestSuccess(res, {
        id: userId,
        token: signedToken,
      });
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      return ResponseService.sendServerError(res, err);
    }
  }

  static async logout(req: Request, res: Response) {
    if (
      !('authorization' in req.headers) ||
      typeof req.headers.authorization !== 'string' ||
      !req.headers.authorization.length
    )
      return ResponseService.sendBadRequestError(
        res,
        'Authorization header missing in request.',
      );

    const token = req.headers.authorization.replace('Bearer ', '');

    BLACKLIST[token] = true;

    setTimeout(() => {
      delete BLACKLIST[token];
    }, expiresIn * 1000);

    return ResponseService.sendRequestSuccess(res, { token: null });
  }

  static async verifyJWT(req: Request, res: Response, next: NextFunction) {
    let token = req.headers['authorization'];

    if (!token) {
      return ResponseService.sendForbidenError(res, 'Token não fornecido.');
    }

    token = token.replace('Bearer ', '');

    if (Object.hasOwn(BLACKLIST, token) && BLACKLIST[token]) {
      return ResponseService.sendForbidenError(res, 'Token inválido.');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '');

      if (!decoded) {
        return ResponseService.sendForbidenError(res, 'Token inválido.');
      }

      res.locals.token = decoded;

      return next();
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error);
      return ResponseService.sendServerError(res, err);
    }
  }
}
