import React from 'react';

class Error extends React.Component {
  static getInitialProps({ res, err, query }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode, query };
  }

  render() {
    const { query: { message } } = this.props;
    return (
      <p>
        {message && `${message}`}
        <button onClick={() => window.history.back()}>Back</button>
      </p>
    );
  }
}

export default Error;
