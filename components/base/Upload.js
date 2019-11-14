import React from 'react';
import styled from 'styled-components';
import { Upload, message } from 'antd';
import { connect } from 'react-redux';

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
  removePositionFile = () => { },
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

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export const UploadImage = ({
  imageUrl,
  handleChange = () => {},
  customRequest = () => {},
}) => (
  <Upload
    name="avatar"
    listType="picture-card"
    className="avatar-uploader"
    showUploadList={false}
    onChange={handleChange}
    beforeUpload={beforeUpload}
    customRequest={customRequest}
  >
    {imageUrl
      ? <img src={imageUrl} alt="avatar" className="w-100" />
      : <UploadButton />}
  </Upload>
);
