import React from 'react';
import styled from 'styled-components';
import { Upload } from 'antd';

import color from '../../config/color';

import Icon from './Icon';

const File = styled.div`
`;

export const DumpUpload = styled(Upload)`
  max-width: 102px;
  margin-right: 16px;
  border-radius: 4px;
  .ant-upload-select {
    border: solid 2px ${color.disabled};
    background: ${color.white};
  }
  img {
    max-width: 30px;
  }
  span {
    text-overflow: ellipsis;
    max-width: 86px;
    overflow: hidden;
  }
`;

export const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

export const PreviewFile = ({
  fileName,
}) => (
  <File>
    <img src="/static/images/file.png" alt="file" />
    <span>{fileName}</span>
  </File>
);

export default Upload;
