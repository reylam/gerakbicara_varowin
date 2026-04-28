import type { AxiosError } from 'axios';

type ApiErrorPayload = {
  message?: string;
};

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  const axiosError = error as AxiosError<ApiErrorPayload>;
  return axiosError.response?.data?.message ?? fallback;
};
