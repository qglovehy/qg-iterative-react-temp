import { ReactNode } from 'react';

export interface IConditionalRenderProps {
  conditional?: boolean | string | number | object | any[];
  noMatch?: () => ReactNode;
  children?: () => ReactNode;
}

export interface IConditionalRenderShowProps {
  conditional?: boolean | string | number | object | any[];
  children?: () => ReactNode;
  className: string;
}
