import { message } from 'antd';

import { clientInstance } from './request';

import profileAdapter from '../store/profile/profile-adapter';

const DEFAULT_WINDOW = `
<html>
  <style>
  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(82, 86, 89);
  }
  iframe {
    border-width: 0px;
  }
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  <body style='margin:0;'>
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </body>
</html>
`;

const displayFile = (fileId) => {
  if (!fileId) {
    return;
  }

  message.loading('Loading file.');
  const profileRequest = profileAdapter(clientInstance());
  const pdfWindow = window.open('');
  pdfWindow.document.write(`${DEFAULT_WINDOW}`);
  profileRequest.getDocument(fileId)
    .then(({ data }) => {
      message.destroy();
      pdfWindow.document.body.style = 'display: block';
      pdfWindow.document.body.innerHTML = `
        <body style='margin:0;'>
          <iframe width='100%' height='100%' src='data:application/pdf;base64, ${data}'></iframe>
        </body>
      `;
    });
};

export default displayFile;
