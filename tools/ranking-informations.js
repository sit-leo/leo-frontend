import React from 'react';

import { IconCircle as Icon } from '../components/base/Icon';
import { PreviewFile } from '../components/base/Upload';

function getOrdinalNumbers(year) {
  switch (year) {
    case '1':
      return `${year}st Year`;
    case '2':
      return `${year}nd Year`;
    case '3':
      return `${year}rd Year`;
    case '4':
      return `${year}th Year`;
    default: return '';
  }
}

const Contact = ({ telno, email, website }) => (
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
);

export function getPositionInformations(position) {
  const { recruiter: { telno, email, website } } = position;
  return [
    {
      header: 'Job Description',
      detail: position.description || '-',
    },
    {
      header: 'Required Document',
      detail: Array.isArray(position.documents) ? position.documents.join(', ') : '-',
    },
    {
      header: 'Contact',
      detail: (
        <Contact telno={telno} email={email} website={website} />
      ),
    },
  ];
}

export function getApplicantInformations(applicantMatch) {
  const {
    applicant: {
      educations, email, telno, skills, website, experiences,
    },
    documents,
  } = applicantMatch;
  const [{ year, major, university }] = educations;
  return [
    {
      header: 'Education',
      detail: `${university}, ${major}, (${getOrdinalNumbers(year)})`,
    },
    {
      header: 'Skills',
      detail: Array.isArray(skills) ? skills.join(', ') : '-',
    },
    {
      header: 'Experiences',
      detail: `${experiences || '-'}`,
    },
    {
      header: 'Contact',
      detail: (
        <Contact telno={telno} email={email} website={website} />
      ),
    },
    {
      header: 'Documents',
      detail: Array.isArray(documents)
        ? (
          <div className="d-flex">
            {
              documents.map(
                ({ id, fileName }) => (
                  <PreviewFile
                    fileId={id}
                    fileName={fileName}
                    key={id}
                    isFinished
                  />
                ),
              )
            }
          </div>
        ) : '-',
    },
  ];
}
