import type { Response } from 'express';

export class ResponseService {
  static sendRequestSuccess(res: Response, message?: unknown) {
    return res.status(200).json({
      success: true,
      message: message ?? 'Request was succesfull.',
    });
  }

  static sendAuthorizationSuccess(
    res: Response,
    token: string,
    message?: unknown,
  ) {
    return res.status(200).json({
      success: true,
      message: message ?? 'User authorized.',
      token,
    });
  }

  static sendRequestBodySuccess(res: Response, body: unknown) {
    return res.status(200).json({
      success: true,
      body: body ?? {},
    });
  }

  static sendCreateSuccess(res: Response, message?: unknown) {
    return res.status(203).json({
      success: true,
      message: message ?? 'Resource created succesfully.',
    });
  }

  static sendBadRequestError(res: Response, message?: unknown) {
    return res.status(400).json({
      success: false,
      message: message ?? 'Bad request, review parameters and try again.',
    });
  }

  static sendServerError(res: Response, message?: unknown) {
    return res.send(500).json({
      success: false,
      message: message ?? 'Server error ocurred, try again later.',
    });
  }

  static sendNotFoundError(res: Response, message?: unknown) {
    return res.status(404).json({
      success: false,
      message: message ?? 'Resource was not found.',
    });
  }

  static sendUnauthorizedError(res: Response, message?: unknown) {
    res.status(401).json({
      success: false,
      message: message ?? 'User is not authorized.',
    });
  }

  static sendForbidenError(res: Response, message?: unknown) {
    res.status(403).json({
      success: false,
      message: message ?? 'User is forbiden.',
    });
  }
}
