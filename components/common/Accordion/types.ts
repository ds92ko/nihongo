import { ReactNode } from 'react';

export interface AccordionProps {
  title: string;
  suffix?: ReactNode;
  children: ReactNode;
  maxHeight: number;
  defaultExpanded?: boolean;
}
