import React from 'react';
import { connect } from 'react-redux';

import { Title, TitleSmall } from '../base/Text';
import RankingCard from './RankingCard';

const FinishStep = ({
  recruiterRanks = [],
}) => (
  <React.Fragment>
    <Title className="text-center">Finished !</Title>
    <TitleSmall className="text-center">
      {'Your rank is saved. Keep waiting for the match result.'}
      <br />
      {'We will notify you if the result is ready! '}
    </TitleSmall>
    {
      recruiterRanks.map(({ applicantMatch, sequence }) => (
        <RankingCard
          sequence={sequence}
          key={applicantMatch.applicant.id}
          title={applicantMatch.applicant.name}
          value={applicantMatch.applicant.educations[0].gpax}
          subtitle={applicantMatch.applicant.educations[0].educationName}
          actionButton={null}
        />
      ))
    }
  </React.Fragment>
);


const mapStateToProps = state => ({
  recruiterRanks: state.ranking.recruiterRanks,
});

export default connect(mapStateToProps)(FinishStep);
