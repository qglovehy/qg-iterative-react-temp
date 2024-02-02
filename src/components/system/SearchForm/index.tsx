import { Col, Form, Row } from 'antd';
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
} from 'react';

import { ISearchFormProps } from './types';

//@ts-ignore
import styles from './index.scss';

const SearchForm: ForwardRefRenderFunction<unknown, ISearchFormProps> = (
  { searchParamList = [], formDefaultValue = {}, onSearch = () => {} },
  ref,
) => {
  const [searchForm] = Form.useForm();

  //设置表单默认值
  const onSetFormDefaultValue = () => searchForm?.setFieldsValue({ ...formDefaultValue });

  useImperativeHandle(ref, () => ({
    searchForm,
  }));

  useEffect(() => {
    onSetFormDefaultValue();

    onSearch();
  }, []);

  return (
    <div className={styles.SearchForm}>
      <Form form={searchForm}>
        <Row justify="start">
          {searchParamList?.map?.((item: { value: any; key: any }) => (
            <Col className={styles.SearchFormFormCol} key={item.key}>
              {item.value}
            </Col>
          ))}
        </Row>
      </Form>
    </div>
  );
};

const Index = memo(forwardRef<unknown, ISearchFormProps>(SearchForm));

export default Index;
