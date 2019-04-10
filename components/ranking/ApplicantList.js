import React from 'react';
import { connect } from 'react-redux';

import Card from '../base/Card';
import Applicant from './Applicant';


const ApplicantList = ({ applicants = [{ name: 'No Applicant Found' }] }) => (
  <Card>
    {
        applicants.map((applicant => <Applicant key={applicant.id} applicant={applicant} />))
    }
  </Card>
);

const mapStateToProps = state => ({
  applicants: state.recruiter.applicants,
});

export default connect(mapStateToProps)(ApplicantList);
