import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
import { BaseList, Intl, ProtectedButton } from 'qg-react-components';
import React, { useRef, useState } from 'react';

import { requestClearSuperviseUser, requestGetSuperviseUser } from '@/services/black';

import LocalizedModal from '../SaveOrUpdate';

import styles from './index.scss';

function BannerList() {
  //执行子组件 (列表组件) 方法
  const ref = useRef();

  const [visible, setVisible] = useState(false);

  //搜索表单
  const searchData = useRef([]);

  //表头
  const columns = useRef([
    {
      title: '序号',
      align: 'center',
      dataIndex: 'index',
      key: 'index',
      width: 80,
    },
    {
      title: '用户名',
      align: 'center',
      dataIndex: 'SuspiciousUsers',
      key: 'SuspiciousUsers',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'CreateTime',
      key: 'CreateTime',
    },
    {
      title: Intl.v('操作'),
      dataIndex: 'option',
      key: 'option',
      width: 120,
      render: (_, record) => (
        <ProtectedButton action="delete" key="delete" onClick={() => onDelete(record)} type="link">
          删除
        </ProtectedButton>
      ),
    },
  ]);

  //列头操作按钮
  const optionButtonGroup = useRef([]);

  function onSetModalStatus(visible) {
    setVisible(visible);

    //刷新列表
    !visible && ref.current?.onSearch?.();
  }

  function onDelete(record) {
    Modal.confirm({
      title: `确认删除【${record?.SuspiciousUsers}】？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      wrapClassName: 'centered-modal',
      onOk: async () => {
        const res = await requestClearSuperviseUser({ Id: record.Id });

        if (res?.code !== 200) {
          message.warning(res?.msg);

          return;
        }

        message.success(res?.msg);

        //刷新列表
        ref.current?.onSearch?.();
      },
    });
  }

  //查询列表数据
  async function requestListAllData(params = {}, callback) {
    debugger;
    const res = await requestGetSuperviseUser(params);

    if (res?.code !== 200) {
      message.warning(res?.msg ?? '请求失败');

      callback?.(false);

      return;
    }

    //将数据格式整理成 如下然后传入查询表格组件
    const resData = {
      dataSource: res.data,
      total: res?.data?.length,
    };

    callback?.(resData);
  }

  return (
    <div className={styles.DrawIndex}>
      <BaseList
        columns={columns.current} //表头
        optionButtonGroup={optionButtonGroup.current} //表头上方操作按钮
        ref={ref}
        rowSelection={false} // 禁用列表多选 默认启用
        searchParamList={searchData.current}
        serviceFunc={requestListAllData} // 请求数据方法
        // otherParams={{ showHeader: false }} //其他 antd 表格属性
      />

      {/*弹出层*/}
      <LocalizedModal onSetModalStatus={onSetModalStatus} visible={visible} />
    </div>
  );
}

export default BannerList;
