import React from 'react';

import Button from '../base/Button';

const LandingIndex = ({
  user, getUserByUsername,
  username, updateUsername,
  loading, setLoading,
}) => (
  <React.Fragment>
    <h1>{ username }</h1>
    <h1>{ user.name }</h1>
    <h1>{ `${loading}` }</h1>
    <h1>Landing Page</h1>
    <input type="text" value={username} onChange={e => updateUsername(e.target.value)} />
    <Button loading={loading} onClick={() => getUserByUsername(username)} text="Hi Next.js!" />
    <Button loading={loading} onClick={() => setLoading(!loading)} text="Set Loading" />
  </React.Fragment>
);

export default LandingIndex;
