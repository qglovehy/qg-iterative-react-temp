import { Spin } from 'antd';
import classNames from 'classnames';
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { v4 as uuidV4 } from 'uuid';

import {
  ConditionalRender,
  DriverGroup,
  EditTableListBody,
  FunctionControl,
  ListBody,
  Pagination,
  SearchForm,
  Svg,
  useSetState,
} from '@/components/system';

import { IBaseListProps, IStateProps } from './types';

// @ts-ignore
import styles from './index.scss';

const BaseList: ForwardRefRenderFunction<unknown, IBaseListProps> = (
  {
    isEditTable = false,
    handleSaveCallBack = () => {},
    serviceFunc = (a, b) => {},
    functionControlTableTitle = '查询表格',
    columns = [],
    otherParams = {},
    optionButtonGroup = [],
    searchParamList = [],
    rowSelection = false,
    scrollX = null,
    scrollY = 0,
    functionControlHide = true,
    topPagination = false,
    bottomPagination = true,
    isShowRowTitleName = '',
  },
  ref,
) => {
  //查询表单ref
  const searchRef = useRef<HTMLFormElement>();

  //列表组件ref
  const tableRef = useRef();

  const [state, setState] = useSetState<IStateProps>({
    isHideFormItem: true, //展开收起
    tableDensity: 'small', //改变表格密度
    loading: false, //加载等待
    dataSource: [], //列表数据
    selectedRows: [], //多选整行
    selectedRowKeys: [], //多选key
    isShowRowTitleName, //展示多选title 的字段值
    Condition: {}, //查询条件存储
    rowSelection: rowSelection
      ? {
          onChange: onRowSelectionChange,
          ...rowSelection,
        }
      : rowSelection, //多选配置
    current: 1, //当前页
    pageSize: 10, //每页条数
    total: 1, //总数
  });

  //表格多选事件
  function onRowSelectionChange(selectedRowKeys: [], selectedRows: []) {
    setState({ selectedRowKeys, selectedRows });
  }

  //改变表格密度
  function onChangeListSize(data: any) {
    setState({ tableDensity: data?.key });
  }

  //展开收起
  function onChangeIsHideFormItem() {
    setState({ isHideFormItem: !state.isHideFormItem });
  }

  //查询按钮 => 更新查询表单
  const onSearch = (condition?: any) => {
    const Condition = condition || searchRef?.current?.searchForm?.getFieldsValue();

    //处理查询列表参数
    for (let item in Condition) {
      if (Condition[item] === void 0) delete Condition[item];
    }

    //更新查询表单  点击查询按钮 列表页数置为1
    setState(
      {
        current: 1,
        Condition,
      },
      onRefreshList,
    );
  };

  //刷新列表 => 不更新查询表单
  const onRefreshList = (newState: IStateProps = {}) => {
    setState({ loading: true });

    const page = newState.current || state.current;
    const limit = newState.pageSize || state.pageSize;
    const Condition = newState.Condition || state.Condition;

    const params = {
      Condition,
      Page: page,
      Limit: limit,
    };

    //5秒钟后自动关闭loading
    setTimeout(() => setState({ loading: false }), 5000);

    //查询列表数据
    serviceFunc?.(params, ({ dataSource, total }) => {
      setState({ loading: false });

      //添加rowKey 序号等信息
      const tableDataSource = dataSource?.map?.((item: any, index: any) => ({
        ...(item || {}),
        rowKey: item?.id || uuidV4(),
        index: (params.Page! - 1) * params.Limit! + (index + 1),
      }));

      setState({
        dataSource: tableDataSource,
        total,
      });
    });
  };

  //重置表单
  const onResetForm = () => searchRef.current?.searchForm?.resetFields();

  //页码点击事件 current:改变后的页码  pageSize:每页条数
  const onPaginationJump = (current: number, pageSize: number) => {
    setState(
      {
        current,
        pageSize,
      },
      onRefreshList,
    );
  };

  //每页条数改变事件 current:当前页  pageSize:每页条数
  const onPaginationSizeChange = (current: number, pageSize: number) =>
    setState(
      {
        current,
        pageSize,
      },
      onRefreshList,
    );

  //多选参数改变
  const onRowChange = (selectedRowKeys: any[], selectedRows: any[]) => {
    setState({ selectedRowKeys, selectedRows });
  };

  //取消指定多选
  const onCloseRowByIndex = (id: string | number) => {
    const selectedRows = state.selectedRows?.filter((item) => item.id !== id);
    const selectedRowKeys = selectedRows?.map((item) => item.id);

    setState({ selectedRowKeys, selectedRows });
  };

  //删除成功删除指定多选
  const onChangeRowSelection = (ids: string | number) => {
    const del_ids = String(ids).split(',');

    const selectedRows = state.selectedRows?.filter((item) => !del_ids.includes(String(item.id)));
    const selectedRowKeys = selectedRows?.map((item) => item.id);

    setState({ selectedRowKeys, selectedRows });
  };

  //向父组件暴露信息
  useImperativeHandle(
    ref,
    () => ({
      state,
      onSearch,
      onChangeRowSelection,
    }),
    [state], //要获取state最新状态
  );

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <Spin size="large" spinning={state.loading}>
      <div className={styles.BaseList}>
        {/* 查询表单 */}
        <ConditionalRender.Show
          className={styles.BaseListHeader}
          conditional={searchParamList?.length > 0 && !state.isHideFormItem}
        >
          {() => (
            <SearchForm
              loading={state.loading}
              onSearch={() => onSearch()}
              ref={searchRef}
              searchParamList={searchParamList}
            />
          )}
        </ConditionalRender.Show>

        {/*功能列表*/}
        <div className={styles.BaseListFunctionControl}>
          <FunctionControl
            columns={columns || []}
            dataSource={state.dataSource}
            functionControlHide={functionControlHide}
            functionControlTableTitle={functionControlTableTitle}
            isHideFormItem={state.isHideFormItem}
            isHideText={searchParamList?.length > 0}
            onChangeIsHideFormItem={onChangeIsHideFormItem}
            onChangeListSize={onChangeListSize}
            onResetForm={onResetForm}
            onSearch={() => onSearch()}
            optionButtonGroup={optionButtonGroup}
          />
        </div>

        {/* 上分页 */}
        <ConditionalRender conditional={state.total !== 0 && topPagination}>
          {() => (
            <div className={styles.BaseListFooter}>
              <Pagination
                current={state.current}
                onChange={onPaginationJump}
                onShowSizeChange={onPaginationSizeChange}
                pageSize={state.pageSize}
                total={state.total}
              />
            </div>
          )}
        </ConditionalRender>

        {/* 列表体 分为可编辑和不可编辑 */}
        <div
          className={classNames(
            styles.BaseListContent,
            scrollY === 0 && styles.BaseListContentFlexGrow,
          )}
        >
          {/* 多选 项title */}
          <ConditionalRender conditional={state.isShowRowTitleName}>
            {() => (
              <div className={styles.BaseListRowSelection}>
                <DriverGroup size={5}>
                  {state.selectedRows?.map((item, index) => (
                    <div className={styles.BaseListRowSelectionItem} key={item.id || index}>
                      <span>{item[state.isShowRowTitleName!]}</span>
                      <Svg name="close_err" onClick={() => onCloseRowByIndex(item.id)} size={16} />
                    </div>
                  ))}
                </DriverGroup>
              </div>
            )}
          </ConditionalRender>

          {/*表格体*/}
          <ConditionalRender conditional={!isEditTable}>
            {() => (
              <ListBody
                columns={columns || []}
                dataSource={state.dataSource}
                onRowChange={onRowChange}
                otherParams={otherParams}
                ref={tableRef}
                rowSelection={{
                  ...(state.rowSelection || {}),
                  selectedRows: state.selectedRows,
                  selectedRowKeys: state.selectedRowKeys,
                }}
                scrollX={scrollX}
                scrollY={scrollY}
                selectedRows={state.selectedRows}
                tableDensity={state.tableDensity}
              />
            )}
          </ConditionalRender>
          <ConditionalRender conditional={isEditTable}>
            {() => (
              <EditTableListBody
                columns={columns || []}
                dataSource={state.dataSource}
                handleSaveCallBack={handleSaveCallBack}
                onRowChange={onRowChange}
                otherParams={otherParams}
                ref={tableRef}
                rowSelection={{
                  ...(state.rowSelection || {}),
                  selectedRows: state.selectedRows,
                  selectedRowKeys: state.selectedRowKeys,
                }}
                scrollX={scrollX}
                scrollY={scrollY}
                selectedRows={state.selectedRows}
                tableDensity={state.tableDensity}
              />
            )}
          </ConditionalRender>
        </div>

        {/* 下分页 */}
        <ConditionalRender conditional={state.total !== 0 && bottomPagination}>
          {() => (
            <div className={styles.BaseListFooter}>
              <Pagination
                current={state.current}
                onChange={onPaginationJump}
                onShowSizeChange={onPaginationSizeChange}
                pageSize={state.pageSize}
                total={state.total}
              />
            </div>
          )}
        </ConditionalRender>
      </div>
    </Spin>
  );
};

const Index = memo(forwardRef<unknown, IBaseListProps>(BaseList));

export default Index;
