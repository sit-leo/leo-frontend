import React from 'react';
import styled from 'styled-components';
import { Upload } from 'antd';

import color from '../../config/color';

import Icon from './Icon';
import displayFile from '../../tools/display-file';

const FileContainer = styled.div`
  margin-right: 16px;
  border-radius: 4px;
  border: solid 2px ${color.disabled};
  background: ${color.white};
  
  .anticon-close {
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: ${color.text.main};
  }
`;

const File = styled.button`
  border: none;
  max-width: 120px;
  max-height: 120px;
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
  <FileContainer className="position-relative">
    {
      !isFinished
      && (
        <Icon onClick={() => removePositionFile(positionId, fileId)} className="position-absolute" type="close" />
      )
    }
    <File
      className="text-center p-3"
      onClick={() => displayFile(fileId)}
      type="button"
    >
      <img src="/static/images/file.png" alt="file" />
      <span className="d-block">{fileName}</span>
    </File>
  </FileContainer>
);

export default Upload;
