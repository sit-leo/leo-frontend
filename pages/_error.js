import React from 'react';

import ContainerRow, { Col } from '../components/base/Grid';
import { FlexCenter } from '../components/base/Flex';
import Button from '../components/base/Button';
import { TitlePrimary, TitleLight, TitleWhite } from '../components/base/Text';

class Error extends React.Component {
  static getInitialProps({ res, err, query }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode, query };
  }

  render() {
    const { query: { message }, statusCode } = this.props;
    return (
      <FlexCenter className="vh-100">
        <ContainerRow>
          <Col className="text-center">
            <img className="w-25" alt="error-code" src={`/static/images/error_${statusCode}.png`} />
          </Col>
          <Col className="text-center mt-5">
            <TitlePrimary>
              {
                statusCode === 404
                  ? 'PAGE NOT FOUND'
                  : 'SERVER ERROR'
              }
            </TitlePrimary>
          </Col>
          <Col lg={{ size: 10, offset: 1 }} className="text-center">
            <TitleLight>
              {
                message
                  ? `${message}`
                  : `The requested resource could not be found but may be available in the future. 
                  Subsequent requests by the client are permissible.`
              }
            </TitleLight>
          </Col>
          <Col className="text-center mt-5">
            <Button>
              <a href="/">
                <TitleWhite className="mb-0">
                  Go to home page
                </TitleWhite>
              </a>
            </Button>
          </Col>
        </ContainerRow>
      </FlexCenter>
    );
  }
}

export default Error;
