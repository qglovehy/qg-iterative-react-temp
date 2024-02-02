export interface IListBodyProps {
  onRowChange?: (selectedRowKeys: any[], selectedRows: any[]) => void;
  columns?: any[];
  dataSource?: any[];
  rowSelection?:
    | boolean
    | {
        selectedRowKeys?: any[];
        selectedRows?: any[];
      };
  otherParams?: object;
  tableDensity?: 'small' | 'middle' | 'large' | undefined;
  selectedRows?: any[];
  scrollX?: string | number | true | null;
  scrollY?: string | number | undefined;
  className?: string; // 添加这行来定义 className 属性
}
