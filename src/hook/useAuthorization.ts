import { useEffect, useCallback } from "react";
import { useFetchData } from "./useFetchData";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

type User = {
  user: {
    username: string;
    email: string;
    role: "admin" | "user";
    token: string;
  };
};

type ApiResponse<T> = {
  data: T | null;
  hasError: boolean;
  isLoading: boolean;
  errorMessage: string;
  status: number | null;
  statusText: string | null;
  error: AxiosError | null;
};

export const useAuthorization = <T extends User>(
  url: string,
  token?: string,
  admin: boolean = false
): ApiResponse<T> => {
  const navigate = useNavigate();
  const { data, isLoading, hasError, errorMessage, status, statusText, error } =
    useFetchData<T>(url, token);

  const { user } = data || { user: { token: "", role: "" } };

  const memoizedNavigate = useCallback(
    (path: string) => navigate(path),
    [navigate]
  );

  useEffect(() => {
    if (isLoading) return;
    if (!user.token) {
      memoizedNavigate("/login");
      return;
    }

    if (admin) {
      if (user.role !== "admin") {
        memoizedNavigate("/login");
        return;
      }
    }
  }, [admin, isLoading, memoizedNavigate, user.role, user.token]);

  return {
    data,
    isLoading,
    hasError,
    errorMessage,
    status,
    statusText,
    error,
  };
};
