import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import React, { useContext, useRef, useState } from 'react';

import { requestDelUserById, requestUserList } from '@/services/black';

import {
  BaseList,
  ConditionalRender,
  Intl,
  MessageContext,
  ProtectedButton,
} from '@/components/system';

import BannerListSaveOrUpdateWrap from '../SaveOrUpdate/wrap';
import BannerListViewModal from '../View';

import styles from './index.scss';

function BannerList() {
  const message = useContext(MessageContext);

  //执行子组件 (列表组件) 方法
  const ref = useRef();

  const [localEditData, setLocalData] = useState({});
  const [localViewData, setLocalViewData] = useState({});
  const [saveVisible, setSaveVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);

  //表格多选
  const rowSelection = useRef({
    getCheckboxProps: (record) => ({
      disabled: record.username === 'admin',
    }),
  });

  //搜索表单
  const searchData = useRef([
    {
      key: 'username',
      value: (
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
      ),
    },
  ]);

  //表头
  const columns = useRef([
    {
      title: Intl.v('序号'),
      align: 'center',
      dataIndex: 'index',
      key: 'index',
      width: 80,
    },
    {
      title: Intl.v('用户名'),
      align: 'center',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: Intl.v('创建时间'),
      align: 'center',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: Intl.v('操作'),
      dataIndex: 'option',
      key: 'option',
      render: (_, record) => (
        <>
          <ConditionalRender conditional={record.username !== 'admin'}>
            {() => (
              <>
                <ProtectedButton
                  action="edit"
                  key="edit"
                  onClick={() => onEdit(record)}
                  type="link"
                >
                  {Intl.v('编辑')}
                </ProtectedButton>
                <ProtectedButton
                  action="delete"
                  key="del"
                  onClick={() => onDelete(record)}
                  type="link"
                >
                  {Intl.v('删除')}
                </ProtectedButton>
              </>
            )}
          </ConditionalRender>

          <ProtectedButton action="view" key="view" onClick={() => onView(record)} type="link">
            {Intl.v('查看')}
          </ProtectedButton>
        </>
      ),
    },
  ]);

  //列头操作按钮
  const optionButtonGroup = useRef([
    <ProtectedButton action="add" key="save" onClick={onSave} type="primary">
      {Intl.v('新增')}
    </ProtectedButton>,
    <ProtectedButton action="del" danger key="del" onClick={onBatchDelete} type="primary">
      {Intl.v('批量删除')}
    </ProtectedButton>,
  ]);

  //查询列表数据
  async function requestListAllData(params = {}, callback) {
    //message.success('触发查询' + JSON.stringify(params));

    const res = await requestUserList(params);

    if (res?.code !== 200) {
      message.warning(res?.msg ?? '请求失败');

      callback?.(false);

      return;
    }

    //将数据格式整理成 如下然后传入查询表格组件
    const resData = {
      dataSource: res.data,
      total: res?.total,
    };

    callback?.(resData);
  }

  //删除
  function onDelete(record) {
    Modal.confirm({
      title: `${Intl.v('确认删除')}【${record?.username}】？`,
      icon: <ExclamationCircleOutlined />,
      okText: Intl.v('确认'),
      cancelText: Intl.v('取消'),
      wrapClassName: 'centered-modal',
      onOk: async () => {
        const res = await requestDelUserById({ id: record.id });

        if (res?.code !== 200) {
          message.warning(res?.msg);

          return;
        }

        //清理多选项
        ref.current?.onChangeRowSelection(record.id);

        message.success(res?.msg + record?.username);

        //刷新列表
        ref.current?.onSearch?.();
      },
    });
  }

  //批量删除
  function onBatchDelete() {
    const usernames = ref.current?.state.selectedRows.map((item) => item.username).join('，');
    const ids = ref.current?.state.selectedRowKeys.join(',');

    if (!usernames) {
      message.warning('请先选择用户');

      return;
    }

    Modal.confirm({
      title: `${Intl.v('确认删除')}【${usernames}】？`,
      icon: <ExclamationCircleOutlined />,
      okText: Intl.v('确认'),
      cancelText: Intl.v('取消'),
      wrapClassName: 'centered-modal',
      onOk: async () => {
        const res = await requestDelUserById({
          id: ids,
        });

        if (res?.code !== 200) {
          message.warning(res?.msg);

          return;
        }

        //清理多选项
        ref.current?.onChangeRowSelection(ids);

        message.success(res?.msg + usernames);

        //刷新列表
        ref.current?.onSearch?.();
      },
    });
  }

  //新增
  function onSave() {
    setLocalData({
      data: null,
      title: Intl.v('新增'),
    });

    onBannerListEditOpen();
  }

  //编辑
  function onEdit(data) {
    setLocalData({
      data,
      title: '编辑',
    });

    onBannerListEditOpen();
  }

  //查看
  function onView(data) {
    setLocalViewData({
      data,
      title: '查看',
    });

    onBannerListViewOpen();
  }

  //关闭编辑弹窗
  function onBannerListEditCancel(isRefresh) {
    setSaveVisible(false);

    isRefresh && ref.current?.onSearch?.();
  }

  //打开编辑弹窗
  function onBannerListEditOpen() {
    setSaveVisible(true);
  }

  //关闭查看弹窗
  function onBannerListViewCancel() {
    setViewVisible(false);
  }

  //打开查看弹窗
  function onBannerListViewOpen() {
    setViewVisible(true);
  }

  return (
    <div className={styles.BannerList}>
      <BaseList
        columns={columns.current} //表头
        isShowRowTitleName="username"
        optionButtonGroup={optionButtonGroup.current} //表头上方操作按钮
        ref={ref}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection.current,
        }} // 禁用列表多选
        searchParamList={searchData.current}
        serviceFunc={requestListAllData} // 请求数据方法
        // rowSelection={false} // 禁用列表多选
        // otherParams={{ showHeader: false }} //其他 antd 表格属性
      />

      {/*新建编辑弹出层*/}
      <BannerListSaveOrUpdateWrap
        {...localEditData}
        onCancel={onBannerListEditCancel}
        visible={saveVisible}
      />

      {/*查看弹出层*/}
      <BannerListViewModal
        {...localViewData}
        onCancel={onBannerListViewCancel}
        visible={viewVisible}
      />
    </div>
  );
}

export default BannerList;
