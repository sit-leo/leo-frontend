import React from 'react';
import Link from 'next/link';

import env from '../../config/env';

import cookie from '../../tools/cookie';

import Flex from './Flex';
import { Col } from './Grid';
import Card from './Card';
import Text, { TitleLarge, TextError } from './Text';

const linksDebug = [
  {
    name: 'Applicant Ranking',
    path: '/matches/1/applicants/ranking',
  },
  {
    name: 'Recruiter Position',
    path: '/matches/1/recruiters/positions',
  },
  {
    name: 'Recruiter Ranking',
    path: '/matches/1/positions/1/ranking',
  },
  {
    name: 'Login',
    path: '/login',
  },
];

const EnvDebugger = ({ role }) => env.public.type === 'development' && (
  <Col>
    <Card>
      ENV Debugger
      <hr />
      <Flex className="flex-column">
        <TitleLarge>
          {`Role: ${role || 'guest'}`}
        </TitleLarge>
        <TextError>{env.public.type}</TextError>
        <TextError>{env.public.matchingApi}</TextError>
        <TextError>{env.public.matchApi}</TextError>
        <TextError>{env.public.userApi}</TextError>
        {
          linksDebug.map(menu => (
            <Link key={menu.name} href={menu.path}>
              <a href="#">
                <Text>{menu.name}</Text>
              </a>
            </Link>
          ))
        }
      </Flex>
    </Card>
  </Col>
);

export default EnvDebugger;
