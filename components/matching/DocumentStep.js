import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert } from 'antd';

import { removePositionFile as removePositionFileAction } from '../../store/matching/ranking';

import RankingCard from './RankingCard';

const DocumentStep = ({
  applicantRanks,
  removePositionFile = () => {},
}) => (
  <React.Fragment>
    <Alert
      message="Information"
      description='Please remove "unused" or "not required" document in "Show more" section before clicking "Confirm Button". Document will be uploaded to the recruiter of positions.'
      type="info"
      showIcon
    />
    {
      applicantRanks.map(({ position, sequence, files }, index) => (
        <RankingCard
          sequence={sequence}
          key={position.id}
          title={position.name}
          value={position.money}
          subtitle={(position.recruiter && `${position.recruiter.name}, ${position.recruiter.location}`) || '-'}
          capacity={position.capacity}
          informations={[
            {
              header: 'Required Documents',
              detail: 'Resume, Transcript',
            },
          ]}
          files={files}
          actionButton={null}
          position={{
            positionId: position.id,
            removePositionFile,
          }}
        />
      ))
    }
    <button onClick={() => console.log(JSON.stringify(applicantRanks))}>Confirm Document</button>
  </React.Fragment>
);

const mapStateToProps = state => ({
  match: state.match.match,
  applicantRanks: state.ranking.applicantRanks,
});

const mapDispatchToRankProps = dispatch => ({
  removePositionFile: bindActionCreators(removePositionFileAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToRankProps)(DocumentStep);
