export interface ResponseDTO {
  code: string;
  data: unknown;
  message: string;
  errorMsg: string;
  success?: boolean;
}

declare module "*.html"
