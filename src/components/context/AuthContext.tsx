"use client";
import { useConst } from "@/hooks/useConst";
import { useMutation } from "@/hooks/useMutation";
import { UserContextData } from "@/interface/auth.interface";
import { Response } from "@/interface/response.interface";
import { AuthSchemaType } from "@/schemas/auth/auth.schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import cookie from "js-cookie";

interface UserContext {
  user?: UserContextData;
  token: string;
  login: (data: AuthSchemaType) => void;
  logout: () => void;
}

const AuthContext = createContext<UserContext | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [user, setUser] = useState<UserContextData | undefined>(undefined);
  const [token, setToken] = useState<string>("");
  const cookieKey = useConst("obstetra_token");
  const localStorageKey = useConst("obstetra_user");

  useEffect(() => {
    const token = cookie.get(cookieKey);
    const user = localStorage.getItem("obstetra_user");

    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, []);

  const { mutate } = useMutation<AuthSchemaType, Response<UserContextData>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.post(`${urlApi}/auth/login`, {
        user: data.user,
        password: data.password,
        postaId: Number(data.posta.value),
      });

      return res.data;
    },
    onSuccess: ({ data }) => {
      setUser(data);
      setToken(data.token);
      toast.success("Inicio de sesión exitoso");
      localStorage.setItem(localStorageKey, JSON.stringify(data));
      cookie.set(cookieKey, data.token);
      router.push("/");
    },
    onError: () => {
      toast.error("Error al iniciar sesión");
    },
  });

  const logout = useCallback(() => {
    setUser(undefined);
    setToken("");
    localStorage.removeItem(localStorageKey);
    cookie.remove(cookieKey);
    router.push("/login");
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, token, login: mutate, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
