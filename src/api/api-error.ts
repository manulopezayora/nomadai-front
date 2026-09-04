export class ApiError extends Error {
  code: string;
  status?: number;

  constructor(code: string, status?: number) {
    super(code);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}
