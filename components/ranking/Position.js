import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Collapse } from 'reactstrap';

import { addRank } from '../../store/match/applicant';

import Text, { TitleMedium } from '../base/Text';
import Card, { SmallCard } from '../base/Card';
import Flex, { FlexBetween, FlexCenter } from '../base/Flex';
import Button from '../base/Button';

const LabelText = ({ label, text }) => (
  <Text>
    <b className="mr-3">{label}</b>
    {text}
  </Text>
);

const PositionCard = ({ position, isOpen, toggle }) => (
  <SmallCard className="my-3" onClick={() => toggle(!isOpen)}>
    <Text><b>Company Name</b></Text>
    <FlexBetween className="mt-3">
      <Text><LabelText label="Job Position" text={`${position.name}`} /></Text>
      <Text><LabelText label="Amount" text={`${position.capacity}`} /></Text>
    </FlexBetween>
  </SmallCard>
);

const Position = ({ position, addRank: addRanking = () => {} }) => {
  const [isOpen, toggle] = useState(false);
  return (
    <Fragment>
      <PositionCard isOpen={isOpen} toggle={toggle} position={position} />
      <Collapse isOpen={isOpen}>
        <Card>
          <Flex>
            <TitleMedium>No Information</TitleMedium>
          </Flex>
          <FlexCenter>
            <Button type="button" onClick={() => addRanking(position)}>Add to Your Ranking</Button>
          </FlexCenter>
        </Card>
      </Collapse>
    </Fragment>
  );
};

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addRank, dispatch),
});

export default connect(null, mapDispatchToPositionProps)(Position);
