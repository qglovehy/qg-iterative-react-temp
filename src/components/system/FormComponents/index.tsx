import React, { FC, memo } from 'react';

import { Dict } from '@/utils/dictionaryData';

import CheckBox from './Components/CheckBox';
import CheckBoxAll from './Components/CheckBoxAll';
import Radio from './Components/Radio';
import RadioButton from './Components/RadioButton';
import Select from './Components/Select';
import SelectAll from './Components/SelectAll';
import { IFormComponentsProps } from './types';

const FormComponent = {
  radio: Radio,
  radioButton: RadioButton,
  select: Select,
  selectAll: SelectAll,
  checkbox: CheckBox,
  checkboxAll: CheckBoxAll,
};

//获取指定表单类型
const FormComponents: FC<IFormComponentsProps> = (props) => {
  const { init = '', type = '' } = props;

  const Component = FormComponent[type];

  return <Component componentProps={{ ...props }} dataSource={Dict()?.[init]} />;
};

const MemoFormComponents = memo(FormComponents);

export default MemoFormComponents;
