import React from 'react';
import { connect } from 'react-redux';

import { getApplicantInformations } from '../../tools/ranking-informations';

import RankingCard from './RankingCard';
import Finished from './Finished';

const FinishStep = ({
  recruiterRanks = [],
}) => (
  <React.Fragment>
    <Finished />
    {
      recruiterRanks.map(({ applicantMatch, sequence }) => {
        const { applicant: { id, name, educations } } = applicantMatch;
        const [{ gpax, major, university }] = educations;
        return (
          <RankingCard
            sequence={sequence}
            key={id}
            title={name}
            value={`GPAX ${gpax}`}
            subtitle={`${major}, ${university}`}
            informations={getApplicantInformations(applicantMatch)}
            actionButton={null}
          />
        );
      })
    }
  </React.Fragment>
);


const mapStateToProps = state => ({
  recruiterRanks: state.ranking.recruiterRanks,
});

export default connect(mapStateToProps)(FinishStep);
