import { Response as ExpressResponse } from "express";

class ResponseUtil {
  /**
   * Generic Success Response
   * @param res 
   * @param data
   * @param statusCode HTTP status code (default: 200)
   */
  static success<T>(res: ExpressResponse, data: T, message = "Success", statusCode = 200): void {
    res.status(statusCode).json({ success: true, message, data });
  }

  /**
   * Success Response with Pagination
   */
  static successWithPagination<T>(
    res: ExpressResponse,
    data: T,
    message = "Success",
    statusCode = 200,
    pagination: { draw: number; recordsTotal: number; recordsFiltered: number }
  ): void {
    res.status(statusCode).json({
      success: true,
      message,
      draw: pagination.draw,
      recordsTotal: pagination.recordsTotal,
      recordsFiltered: pagination.recordsFiltered,
      data,
    });
  }

  /**
   * Generic Error Response
   * @param res 
   * @param message 
   * @param error
   * @param statusCode HTTP status code (default: 500)
   */
  static error(
    res: ExpressResponse,
    message: string,
    error: any = null,
    statusCode = 500
  ): void {
    res.status(statusCode).json({
      success: false,
      message,
      error: error ? error.message : undefined,
    });
  }

  /**
   * Generic Not Found Response
   * @param res 
   * @param message
   */
  static notFound(res: ExpressResponse, message = "Not found"): void {
    res.status(404).json({ success: false, message });
  }

  /**
   * Bad Request Response (Validation Error)
   * @param res
   * @param message
   * @param errors
   */
  static badRequest(
    res: ExpressResponse,
    message = "Validation Error",
    errors: { context: { key: string }; message: string }[] = []
  ): void {
    res.status(400).json({
      success: false,
      message,
      errors: errors.map((err) => ({
        field: err.context.key,
        message: err.message,
      })),
    });
  }
}

export default ResponseUtil;
