import React from 'react';
import { Steps } from 'antd';

const steps = [
  'Add Ranks',
  'Order Ranks',
  'Upload Documents',
];

const RankingStep = ({ step: stepIndex }) => (
  <Steps current={stepIndex}>
    {
      steps.map(step => <Steps.Step title={step} />)
    }
  </Steps>
);

export default RankingStep;
