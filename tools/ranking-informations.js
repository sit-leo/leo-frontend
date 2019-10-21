import React from 'react';

import { IconCircle as Icon } from '../components/base/Icon';

export function getPositionInformations(position) {
  const { recruiter: { telno, email, website } } = position;
  return [
    {
      header: 'Job Description',
      detail: position.description,
    },
    {
      header: 'Required Document',
      detail: position.documents.join(', '),
    },
    {
      header: 'Contact',
      detail: (
        <React.Fragment>
          <span className="d-block my-1">
            <Icon type="phone" theme="filled" className="rounded-circle" />
            {`  ${telno || '-'}`}
          </span>
          <span className="d-block my-1">
            <Icon type="mail" theme="filled" className="rounded-circle" />
            {`  ${email || '-'}`}
          </span>
          <span className="d-block my-1">
            <Icon type="global" className="rounded-circle" />
            {`  ${website || '-'}`}
          </span>
        </React.Fragment>
      ),
    },
  ];
}

export function getApplicantInformations(applicantMatch) {
  return {
    applicantMatch,
  };
}
