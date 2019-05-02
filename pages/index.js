import withUser from '../tools/with-user';
import { withAuth } from '../tools/with-auth';

import LandingPage from '../components/landing';

export default withUser(
  withAuth(
    LandingPage,
  ),
);
