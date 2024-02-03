import React from 'react';

export interface IBreadcrumbNavProps {
  firstTitle: string;
  separator: React.ReactNode;
  onClick: (a: any) => void;
  items: any[];
}
