import React from 'react';
import { connect } from 'react-redux';

import { serverInstance } from '../../tools/request';
import cookie from '../../tools/cookie';

import matchAdapter from '../../store/match/match-adapter';
import matchingAdapter from '../../store/matching/matching-adapter';

import { setMatch } from '../../store/match';
import { setPositions } from '../../store/matching/ranking';

import RecruiterPositionPage from '../../components/matching/RecruiterPositionPage';

class RecruiterPositionController extends React.Component {
  static async getInitialProps({ store, query, req }) {
    const matchRequest = matchAdapter(serverInstance(cookie.getToken(req)));
    const matchingRequest = matchingAdapter(serverInstance(cookie.getToken(req)));

    const { matchId } = query;
    const match = await matchRequest.getMatchByMatchId(matchId);
    const positions = await matchingRequest.getRecruiterPositionsByMatchId(matchId);

    await store.dispatch(setMatch(match));
    await store.dispatch(setPositions(positions));
    return {};
  }

  render() {
    return <RecruiterPositionPage />;
  }
}

export default connect()(RecruiterPositionController);
