export type FetchResponse<T> = {
  response?: T[];
  limit: number;
  offset: number;
};
