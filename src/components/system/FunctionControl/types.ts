export interface IOptionProps {
  fileName: string;
  datas: any[];
}

export interface IFunctionControlProps {
  dataSource?: object[];
  columns?: any[];
  optionButtonGroup?: any[];
  loading?: boolean;
  onSearch?: () => void;
  onResetForm?: () => void;
  onChangeListSize?: (e) => void;
  onChangeIsHideFormItem?: () => void;
  isHideFormItem?: boolean;
  isHideText?: boolean;
  functionControlTableTitle?: string;
  functionControlHide?: boolean;
}
