<<<<<<< HEAD
import React from 'react';

import styles from './index.scss';

function IndexPage() {
  return <div className={styles.IndexPage}></div>;
}

export default IndexPage;
=======
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';

const fileList = [
  {
    uid: '0',
    name: 'xxx.png',
    status: 'uploading',
    percent: 33,
  },
  {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'zzz.png',
    status: 'error',
  },
];
const App = () => (
  <>
    <Upload
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      defaultFileList={[...fileList]}
      listType="picture"
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
    <br />
    <br />
    <Upload
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      className="upload-list-inline"
      defaultFileList={[...fileList]}
      listType="picture"
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  </>
);
export default App;
>>>>>>> ae60626a2f177c1ffd3a9b625623dbab952be61d
