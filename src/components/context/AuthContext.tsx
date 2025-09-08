"use client";

import { UserContextData } from "@/interface/auth.interface";
import { createContext, PropsWithChildren, useState } from "react";

interface UserContext {
  user: UserContextData;
  setUser: (user: UserContextData) => void;
  token: string;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<UserContext | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserContextData | undefined>(undefined);
  const [token, setToken] = useState<string>("");
}
