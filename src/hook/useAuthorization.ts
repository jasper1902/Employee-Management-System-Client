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
  admin: boolean = true
): ApiResponse<T> => {
  const navigate = useNavigate();
  const { data, isLoading, hasError, errorMessage, status, statusText, error } =
    useFetchData<T>(url, token);

  const memoizedNavigate = useCallback(
    (path: string) => navigate(path),
    [navigate]
  );

  useEffect(() => {
    if (isLoading) return;
    if (!data?.user?.token) {
      memoizedNavigate("/login");
      return;
    }
    localStorage.setItem("token", data?.user.token);
    if (!admin) return alert("You do not have permission");
    if (data?.user?.role !== "admin") {
      memoizedNavigate("/login");
      return;
    }
  }, [isLoading, memoizedNavigate, data, admin]);

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
