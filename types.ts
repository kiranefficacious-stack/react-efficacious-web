import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}