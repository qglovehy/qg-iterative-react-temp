import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { Dropdown, Space, Tooltip } from 'antd';
import ExportJsonExcel from 'js-export-excel';
import moment from 'moment';
import React, { FC, memo } from 'react';

import ConditionalRender from '../ConditionalRender';
import Intl from '../Intl';
import ProtectedButton from '../ProtectedButton';
import Svg from '../Svg';
import { IFunctionControlProps, IOptionProps } from './types';

//@ts-ignore
import styles from './index.scss';

const dropDown = [
  {
    key: 'small',
    label: '较小',
  },
  {
    key: 'default',
    label: '默认',
  },
  {
    key: 'large',
    label: '较大',
  },
];

const FunctionControl: FC<IFunctionControlProps> = ({
  dataSource = [],
  columns = [],
  optionButtonGroup = [],
  loading = false,
  onSearch = () => null,
  onResetForm = () => null,
  onChangeListSize = () => null,
  onChangeIsHideFormItem = () => null,
  isHideFormItem = false,
  isHideText = false,
  functionControlTableTitle = '查询表格',
  functionControlHide = true,
}) => {
  //按条件导出表格到excel
  const downloadExcel = async () => {
    const option: IOptionProps = {
      fileName: moment().format('Y-MM-DD HH:mm:SS'),
      datas: [
        {
          sheetData: dataSource,
          sheetName: 'sheet',
          sheetFilter: columns?.map?.((item: { key: any }) => item.key) || [],
          sheetHeader: columns?.map?.((item: { title: any }) => item.title) || [],
        },
      ],
    };

    const toExcel = new ExportJsonExcel(option);

    toExcel?.saveExcel();
  };

  return (
    <ConditionalRender conditional={functionControlHide}>
      {() => (
        <div className={styles.FunctionControl}>
          <div className={styles.FunctionControlTableHeader}>
            <Space className={styles.FunctionControlTableHeaderTitle}>
              <Svg name="table" size={20} />

              <span className={styles.FunctionControlTableTitle}>
                {Intl.v(functionControlTableTitle || '查询表格')}
              </span>
            </Space>
          </div>

          <div className={styles.FunctionControlTableTools}>
            <Space direction="horizontal" size={15}>
              {optionButtonGroup}

              <ProtectedButton
                icon={<SearchOutlined />}
                key="search"
                loading={loading}
                onClick={onSearch}
                type="primary"
              >
                {Intl.v('查询')}
              </ProtectedButton>

              <ProtectedButton key="reset" onClick={onResetForm} type="default">
                {Intl.v('重置')}
              </ProtectedButton>

              {/* 展开收起 */}
              <div className={styles.FunctionControlOption} onClick={onChangeIsHideFormItem}>
                <ConditionalRender conditional={isHideText}>
                  {() => (
                    <ConditionalRender
                      conditional={isHideFormItem}
                      noMatch={() => (
                        <>
                          <UpOutlined />
                          {Intl.v('收起')}
                        </>
                      )}
                    >
                      {() => (
                        <>
                          <DownOutlined />
                          {Intl.v('展开')}
                        </>
                      )}
                    </ConditionalRender>
                  )}
                </ConditionalRender>
              </div>
            </Space>

            <Space direction="horizontal" size={12}>
              {/*调整列表尺寸*/}
              <Dropdown
                arrow
                menu={{
                  items: dropDown.map((item) => ({
                    ...(item || {}),
                    label: Intl.v(item.label),
                    type: 'group',
                  })),
                  onClick: onChangeListSize,
                }}
                placement="bottom"
              >
                <Tooltip placement="top" title={Intl.v('密度')}>
                  <span>
                    <Svg className={styles.FunctionControlToolIcon} name="seal" size={20} />
                  </span>
                </Tooltip>
              </Dropdown>

              {/*导出到Excel*/}
              <Tooltip placement="top" title={Intl.v('导出')}>
                <span onClick={downloadExcel}>
                  <Svg className={styles.FunctionControlToolIcon} name="down" size={20} />
                </span>
              </Tooltip>
            </Space>
          </div>
        </div>
      )}
    </ConditionalRender>
  );
};

const MemoFunctionControl = memo(FunctionControl);

export default MemoFunctionControl;
