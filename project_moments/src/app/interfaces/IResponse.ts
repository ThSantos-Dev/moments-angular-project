// Interface padrão para as respostas de requisições HTTP
export interface IResponse<T> {
  message?: string;
  data: T;
}
