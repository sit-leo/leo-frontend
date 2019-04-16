import React from 'react';
import { connect } from 'react-redux';

import Applicant from './Applicant';


const ApplicantList = ({ applicants = [{ name: 'No Applicant Found' }] }) => (
  <React.Fragment>
    {
        applicants.map((applicant => <Applicant key={applicant.id} applicant={applicant} />))
    }
  </React.Fragment>
);

const mapStateToProps = state => ({
  applicants: state.recruiter.applicants,
});

export default connect(mapStateToProps)(ApplicantList);
