import type { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  category: string;
  keywords: string[];
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
}
