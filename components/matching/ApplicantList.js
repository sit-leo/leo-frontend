import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRank } from '../../store/match/recruiter';

import Button from '../base/Button';

import RankingCard from './RankingCard';


const ApplicantList = ({
  applicants = [{ name: 'No Applicant Found' }],
  addRank: addRanking = () => {},
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
              <Button type="button" onClick={() => addRanking(applicant)}>Add to Your Ranking</Button>
            }
          />
        )))
    }
  </React.Fragment>
);

const mapStateToProps = state => ({
  applicants: state.recruiter.applicants,
});

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToPositionProps)(ApplicantList);
