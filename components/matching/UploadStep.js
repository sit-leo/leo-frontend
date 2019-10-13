import React from 'react';
import { connect } from 'react-redux';

import RankingCard from './RankingCard';

const Upload = ({
  applicantRanks,
  files,
}) => (
  <React.Fragment>
    {
      applicantRanks.map(({ position }, index) => (
        <RankingCard
          key={position.id}
          title={position.name}
          value={position.money}
          subtitle={(position.recruiter && `${position.recruiter.name}, ${position.recruiter.location}`) || '-'}
          capacity={position.capacity}
          files={files}
          actionButton={null}
        />
      ))
    }
  </React.Fragment>
);

const mapStateToProps = state => ({
  match: state.match.match,
  applicantRanks: state.ranking.applicantRanks,
  files: state.profile.files,
});

const mapDispatchToRankProps = dispatch => ({
  // updateRank: bindActionCreators(updateApplicantRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToRankProps)(Upload);
