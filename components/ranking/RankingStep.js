import React from 'react';
import Steps from '../base/Step';

const RankingStep = ({ steps = [], step: stepIndex }) => (
  <Steps current={stepIndex}>
    {
      steps.map(step => <Steps.Step key={step} title={step} />)
    }
  </Steps>
);

export default RankingStep;
