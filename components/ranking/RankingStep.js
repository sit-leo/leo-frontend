import React from 'react';
import { Steps } from 'antd';

const RankingStep = ({ steps = [], step: stepIndex }) => (
  <Steps current={stepIndex}>
    {
      steps.map(step => <Steps.Step key={step} title={step} />)
    }
  </Steps>
);

export default RankingStep;
