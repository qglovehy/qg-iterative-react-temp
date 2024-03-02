import { Form, Space, message } from 'antd';
import React, { useRef, useState } from 'react';

import { BaseList, FormComponents, Intl, ProtectedButton, RenderDom } from '@/components/system';

import LocalizedModal from '../SaveOrUpdate';

import styles from './index.scss';

function TableIndex() {
  //执行子组件 (列表组件) 方法
  const ref = useRef();

  const [localData, setLocalData] = useState({});

  const [visible, setVisible] = useState(false);

  //搜索表单
  const searchData = useRef([
    {
      key: 'active_id',
      value: (
        <Form.Item label="性别" name="active_id">
          <FormComponents init="SystemSex" placeholder="请选择" type="select" />
        </Form.Item>
      ),
    },
  ]);

  //表头
  const columns = useRef([
    {
      title: Intl.v('输入框'),
      dataIndex: 'input1',
      width: 200,
      editable: true,
      type: 'input',
    },
    {
      title: Intl.v('数字框'),
      dataIndex: 'number1',
      editable: true,
      type: 'number',
    },
    {
      title: Intl.v('下拉框'),
      dataIndex: 'select1',
      editable: true,
      type: 'select',
      typeValue: 'SystemSex',
    },
    {
      title: Intl.v('单选框'),
      dataIndex: 'radio1',
      editable: true,
      type: 'radio',
      typeValue: 'SystemSex',
    },
    {
      title: Intl.v('日期'),
      dataIndex: 'date1',
      editable: true,
      type: 'date',
    },
    {
      title: Intl.v('时间'),
      dataIndex: 'datetime1',
      editable: true,
      type: 'datetime',
    },
    {
      title: Intl.v('文本框'),
      dataIndex: 'textarea1',
      editable: true,
      type: 'textarea',
    },
    {
      title: Intl.v('富文本编辑器'),
      dataIndex: 'editor1',
      editable: true,
      type: 'editor',
      width: 850,
      render: (html) => <RenderDom dom={html} />,
    },
    {
      title: Intl.v('操作'),
      dataIndex: 'option',
      key: 'option',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size={20}>
          <ProtectedButton action="edit" key="awardEdit" onClick={() => onEdit(record)} type="link">
            {Intl.v('编辑')}
          </ProtectedButton>
          <ProtectedButton
            action="delete"
            key="deleteDanger"
            onClick={() => onDelete(record)}
            type="link"
          >
            {Intl.v('删除')}
          </ProtectedButton>
        </Space>
      ),
    },
  ]);

  //列头操作按钮
  const optionButtonGroup = useRef([
    <ProtectedButton action="add" key="save" onClick={onSave} type="primary">
      {Intl.v('新增')}
    </ProtectedButton>,
  ]);

  //弹出层
  function onSetModalStatus(visible) {
    setVisible(visible);

    //刷新列表
    !visible && ref.current?.onSearch?.();
  }

  //新增
  function onSave() {
    setLocalData({
      data: null,
      title: '新增',
    });

    onSetModalStatus(true);
  }

  //编辑
  function onEdit(data) {
    setLocalData({
      data,
      title: '编辑',
    });

    onSetModalStatus(true);
  }

  //删除
  function onDelete(data) {
    message.success('进入测试删除');
  }

  //编辑表格完成回调
  const handleSaveCallBack = (record) => {
    console.log(record);

    message.success('编辑表格完成回调');
  };

  //查询列表数据
  async function requestTableData(params = {}, callback) {
    //将数据格式整理成 如下然后传入查询表格组件
    const resData = {
      dataSource: [
        {
          id: 1,
          zone_Name: '新60L服',
          input1: '是对',
          number1: 1,
          select1: '男',
          radio1: '女',
          date1: '2023-12-12',
          datetime1: '2023-12-12 12:12:12',
          textarea1: '是对啊是丢阿斯蒂阿萨德',
          editor1: '<p>helloworld</p>',
        },
        {
          id: 2,
          zone_Name: '新60L服（新区）刚开一秒',
          input1: 'sdasd ',
          number1: 2,
          select1: '男',
          radio1: '女',
          date1: '2023-12-12',
          datetime1: '2023-12-12 12:12:12',
          textarea1: '是对啊是丢阿斯蒂阿萨德',
          editor1: '<p>helloworldasdaasdasd</p>',
        },
      ],
      total: 2,
    };

    callback?.(resData);
  }

  return (
    <div className={styles.IndexPageList}>
      <BaseList
        columns={columns.current} //表头
        functionControlTableTitle="主页表格"
        handleSaveCallBack={handleSaveCallBack} //编辑表格回调
        isEditTable //是否是可编辑表格
        optionButtonGroup={optionButtonGroup.current} //表头上方操作按钮
        ref={ref}
        rowSelection={false} // 禁用列表多选 默认启用
        scrollX={2600}
        searchParamList={searchData.current}
        serviceFunc={requestTableData} // 请求数据方法
      />

      {/*弹出层*/}
      <LocalizedModal {...localData} onSetModalStatus={onSetModalStatus} visible={visible} />
    </div>
  );
}

export default TableIndex;
