"use client";
import { createContext } from "react";

const LayoutThemeContext = createContext<any>(null);
const AuthContext = createContext<any>(null);
const AdminAboutContext = createContext<any>(null);
const AdminProjectContext = createContext<any>(null);

export { LayoutThemeContext, AuthContext, AdminAboutContext, AdminProjectContext };
