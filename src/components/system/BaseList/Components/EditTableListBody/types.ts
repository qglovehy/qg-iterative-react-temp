import { ReactNode } from 'react';

//
export interface IEditableCellProps {
  title: string;
  editable: boolean;
  children: ReactNode;
  dataIndex: string;
  record: Record<string, any>;
  handleSave: () => void;
  type: string;
  typeValue: string;
  dictItemMap: Map<any, any>;
  // 这里假设 restProps 是一个包含任意数量任意类型属性的对象
  [key: string]: any;
}

export interface IEditTableListBodyProps {
  onRowChange?: (selectedRowKeys: any[], selectedRows: any[]) => void;
  handleSaveCallBack?: (a: any) => void;
  columns?: any[];
  dataSource?: any[];
  selectedRows?: any[];
  rowSelection?:
    | boolean
    | {
        selectedRowKeys?: any[];
        selectedRows?: any[];
      };
  otherParams?: object;
  tableDensity?: 'small' | 'middle' | 'large' | undefined;
  scrollX?: string | number | true | null;
  scrollY?: string | number | undefined;
  className?: string; // 添加这行来定义 className 属性
}
