export interface IBaseListProps {
  isEditTable: boolean;
  handleSaveCallBack: (a: any) => void;
  serviceFunc: (a: any, b: any) => void;
  functionControlTableTitle: string;
  columns: any[]; // 这里可以指定列的类型，比如 [string, number, boolean] 等
  otherParams: any; // 通常用于存储其他任意属性
  optionButtonGroup: any[]; // 用于存储按钮组选项或配置，类型任意
  searchParamList: any[]; // 用于存储搜索参数或选项，类型任意
  rowSelection: boolean | {};
  scrollX: null | number; // 如果用作滚动位置，可以是数字类型
  scrollY: number;
  functionControlHide: boolean;
  topPagination: boolean;
  bottomPagination: boolean;
}

export interface IStateProps {
  isHideFormItem?: boolean; //展开收起
  tableDensity?: 'small' | 'middle' | 'large' | undefined; //改变表格密度
  loading?: boolean; //加载等待
  dataSource?: object[]; //列表数据
  selectedRows?: any[]; //多选整行
  selectedRowKeys?: any[]; //多选key
  Condition?: {}; //查询条件存储
  rowSelection?: boolean | {};
  current?: number; //当前页
  pageSize?: number; //每页条数
  total?: number; //总数
}
