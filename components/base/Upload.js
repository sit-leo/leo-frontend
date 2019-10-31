import React from 'react';
import styled from 'styled-components';
import { Upload } from 'antd';

import color from '../../config/color';

import Icon from './Icon';
import displayFile from '../../tools/display-file';

const File = styled.button`
  max-width: 120px;
  max-height: 120px;
  margin-right: 16px;
  border-radius: 4px;
  border: solid 2px ${color.disabled};
  background: ${color.white};

  img {
    max-width: 30px;
  }
  
  span {
    max-width: 102px;
    max-height: 42px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .anticon-close {
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: ${color.text.main};
  }
`;

export const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

export const PreviewFile = ({
  isFinished,
  positionId,
  fileId,
  fileName,
  removePositionFile = () => {},
}) => (
  <File
    className="text-center p-3 position-relative"
    onClick={() => displayFile(fileId)}
    type="button"
  >
    {
      !isFinished
      && (
        <Icon onClick={() => removePositionFile(positionId, fileId)} className="position-absolute" type="close" />
      )
    }
    <img src="/static/images/file.png" alt="file" />
    <span className="d-block">{fileName}</span>
  </File>
);

export default Upload;
