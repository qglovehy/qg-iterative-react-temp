import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone } from '@ant-design/icons';
import { DatePicker, Form, Input, Space, Table } from 'antd';
import { FormInstance } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, {
  FC,
  ForwardRefRenderFunction,
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

import { IRootStateProps } from '@/store/types';

import ConditionalRender from '../../../ConditionalRender';
import FormComponents from '../../../FormComponents';
import WangEditorFrame from '../../../WangEditorFrame';
import { IEditTableListBodyProps, IEditableCellProps } from './types';

// @ts-ignore
import styles from './index.scss';

const EditableContext = React.createContext<FormInstance | null>(null);

const { TextArea } = Input;

//表单项类型
const formType = ['select', 'radio', 'checkbox', 'checkboxAll', 'selectAll'];

//表单规则
const onSetRules = (title: string) => [
  {
    required: true,
    message: `${title} 为必填项.`,
  },
];

//自定义编辑行
const EditableRow = (props: any) => {
  const [form] = Form.useForm();

  return (
    <Form component={false} form={form}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

//自定义编辑列
const EditableCell: FC<IEditableCellProps> = ({
  title = '',
  editable = false,
  children = <></>,
  dataIndex = '',
  record = {},
  handleSave = (a: any, b: any) => ({ a, b }),
  type = 'input',
  typeValue = '',
  dictItemMap = new Map(),
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);

  const form = useContext(EditableContext);

  //开始编辑
  const toggleEdit = () => {
    setEditing(!editing);

    let value = record[dataIndex];

    if ('date' === type) {
      value = dayjs(record[dataIndex], 'YYYY/MM/DD');
    }

    if ('datetime' === type) {
      value = dayjs(record[dataIndex], 'YYYY/MM/DD HH:mm:ss');
    }

    if (formType.includes(type)) {
      value = dictItemMap?.get(value);
    }

    form!.setFieldsValue({ [dataIndex]: value });
  };

  //确认保存  第一步
  const onSave = async () => {
    try {
      const values = await form?.validateFields();

      toggleEdit();

      //假设当前有多个form表单项  只处理当前指定单元格
      const newValues = { [dataIndex]: values[dataIndex] };

      if ('datetime' === type) {
        newValues[dataIndex] = newValues[dataIndex]?.format('YYYY-MM-DD HH:mm:ss');
      }

      if ('date' === type) {
        newValues[dataIndex] = newValues[dataIndex]?.format('YYYY-MM-DD');
      }

      if (formType.includes(type)) {
        newValues[dataIndex] = dictItemMap?.get(newValues[dataIndex]);
      }

      handleSave(newValues, record);
    } catch (errInfo) {
      console.error('system-编辑表格组件:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Space className={styles.EditableFormItem} size={6}>
        <ConditionalRender conditional={formType.includes(type)}>
          {() => (
            <Form.Item className={styles.ETFormItem} name={dataIndex} rules={onSetRules(title)}>
              <FormComponents init={typeValue} placeholder="请选择" type={type} />
            </Form.Item>
          )}
        </ConditionalRender>

        <ConditionalRender conditional={type === 'input'}>
          {() => (
            <Form.Item className={styles.ETFormItem} name={dataIndex} rules={onSetRules(title)}>
              <Input placeholder="请输入" />
            </Form.Item>
          )}
        </ConditionalRender>

        <ConditionalRender conditional={type === 'number'}>
          {() => (
            <Form.Item className={styles.ETFormItem} name={dataIndex} rules={onSetRules(title)}>
              <Input placeholder="请输入" type="number" />
            </Form.Item>
          )}
        </ConditionalRender>

        <ConditionalRender conditional={type === 'textarea'}>
          {() => (
            <Form.Item className={styles.ETFormItem} name={dataIndex} rules={onSetRules(title)}>
              <TextArea placeholder="请输入"></TextArea>
            </Form.Item>
          )}
        </ConditionalRender>

        <ConditionalRender conditional={type === 'date'}>
          {() => (
            <Form.Item className={styles.ETFormItem} name={dataIndex} rules={onSetRules(title)}>
              <DatePicker />
            </Form.Item>
          )}
        </ConditionalRender>

        <ConditionalRender conditional={type === 'datetime'}>
          {() => (
            <Form.Item className={styles.ETFormItem} name={dataIndex} rules={onSetRules(title)}>
              <DatePicker showTime />
            </Form.Item>
          )}
        </ConditionalRender>

        <ConditionalRender conditional={type === 'editor'}>
          {() => (
            <Form.Item className={styles.ETFormItem} name={dataIndex} rules={onSetRules(title)}>
              <WangEditorFrame width="600px" />
            </Form.Item>
          )}
        </ConditionalRender>

        {/* 输入完成后操作 */}
        <Space className={styles.EditTableConfirmIconBox} size={6}>
          <CheckCircleTwoTone className={styles.EditTableConfirmIcon} onClick={onSave} />
          <CloseCircleTwoTone className={styles.EditTableConfirmIcon} onClick={toggleEdit} />
        </Space>
      </Space>
    ) : (
      <div className={styles.EditableCellValueWrap} onClick={toggleEdit}>
        <div>{children}</div>

        <EditTwoTone
          className={classNames(
            styles.EditableCellValueWrapIcon,
            styles.EditableCellValueWrapIconActive,
          )}
        />
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditTableListBodyIndex: ForwardRefRenderFunction<unknown, IEditTableListBodyProps> = (
  {
    onRowChange = (selectedRowKeys: any[], selectedRows: any[]) => null,
    handleSaveCallBack = (a: {}) => a,
    columns: defaultColumns = [],
    dataSource: dataList = [],
    rowSelection = false,
    otherParams = {},
    tableDensity = 'small',
    scrollX = null,
    scrollY = 0,
  },
  ref,
) => {
  const { dict } = useSelector((state: IRootStateProps) => state.counter.value);

  const [dataSource, setDataSource] = useState([]);

  //更新多选参数 selectedRowKeys:多选id  selectedRows:多选整条数据
  const onRowSelectionChange = (selectedRowKeys: any[], selectedRows: any[]) =>
    onRowChange(selectedRowKeys, selectedRows);

  //保存 第二步
  //values: 已经改过的属性对象
  //dataIndex: 当前需要修改的字段名  即使当下点击了多个单元格
  const handleSave = (values: any, record: any) => {
    const newData = [...dataSource] as any;

    //找到values对应的行
    const index = newData.findIndex((item) => item.rowKey === record.rowKey);

    //设置新值
    newData[index] = {
      ...((newData[index] as any) || {}),
      ...values,
    };

    setDataSource(newData);

    const saveRecord = { ...((newData[index] as any) || {}) };

    //处理字典项和时间等等
    Object.keys(saveRecord)?.forEach((item) => {
      const row = defaultColumns?.find((el) => el.dataIndex === item);
      const typeValue = row?.typeValue;

      //Map 通过寻找对应值
      if (typeValue) {
        saveRecord[item] = dict[`${typeValue}Map`]?.get(saveRecord[item]);
      }
    });

    //执行外部的回调
    handleSaveCallBack?.(saveRecord);
  };

  //对传入的列做二次处理
  const columns =
    defaultColumns?.map((col) => {
      if (!col.editable) return col;

      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          type: col.type,
          typeValue: col.typeValue,
          dictItemMap: col.typeValue && dict[`${col.typeValue}Map`],
          handleSave,
        }),
      };
    }) || [];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  useImperativeHandle(ref, () => ({
    onSearch: () => {},
  }));

  useEffect(() => {
    dataList && setDataSource([...((dataList as []) || [])]);
  }, [dataList]);

  return (
    <div className={styles.EditableIndex}>
      <ConditionalRender conditional={dataList?.length > 0}>
        {() => (
          <Table
            className={styles.EditableListBodyTable}
            {...otherParams}
            columns={columns}
            components={components}
            dataSource={dataSource}
            pagination={false}
            rowKey={(record) => record?.rowKey}
            rowSelection={
              typeof rowSelection === 'object'
                ? {
                    onChange: onRowSelectionChange,
                    ...rowSelection,
                  }
                : undefined
            }
            scroll={{
              y: scrollY!,
              x: scrollX!,
              scrollToFirstRowOnChange: true,
            }}
            size={tableDensity}
          />
        )}
      </ConditionalRender>
    </div>
  );
};

const Index = memo(forwardRef<unknown, IEditTableListBodyProps>(EditTableListBodyIndex));

export default Index;
