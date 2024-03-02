export interface IPaginationProps {
  onChange?: (a: any, b: any) => void;
  onShowSizeChange?: (a: any, b: any) => void;
  size?: 'default';
  total?: number;
  current?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  showQuickJumper?: true;
  showSizeChanger?: true;
}
