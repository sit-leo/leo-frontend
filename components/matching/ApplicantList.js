import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRecruiterRank } from '../../store/matching/ranking';

import Button from '../base/Button';

import RankingCard from './RankingCard';


const ApplicantList = ({
  applicants,
  addRank = () => {},
}) => (
  <React.Fragment>
    {
        applicants.map((applicant => (
          <RankingCard
            key={applicant.id}
            title={applicant.name}
            value={applicant.gpax}
            subtitle={applicant.department}
            capacity={0}
            badgeText="Documents"
            actionButton={
              <Button type="button" onClick={() => addRank(applicant)}>Add to Your Ranking</Button>
            }
          />
        )))
    }
  </React.Fragment>
);

const mapStateToProps = state => ({
  applicants: state.ranking.applicants,
});

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addRecruiterRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToPositionProps)(ApplicantList);
