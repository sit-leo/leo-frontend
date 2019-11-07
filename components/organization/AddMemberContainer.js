import React from 'react';

import Organization from '../layouts/organization';

import Card from '../base/Card';
import ContainerRow, { Col } from '../base/Grid';
import { Search } from '../base/Input';
import Table from '../base/Table';
import MainButton from '../base/Button';

const AddMemberContainer = ({
  title,
  columns,
  dataSource,
  url,
  rowRender,
  rowKey = () => {},
  onChange = () => {},
  submit = () => {},
}) => (
  <Organization title={title} page={title} url={url}>
    <Col>
      <Card>
        <ContainerRow>
          <Col md={{ size: 6, offset: 3 }}>
            <Search />
          </Col>
          <Col className="mt-4" md={{ size: 10, offset: 1 }}>
            <Table
              expandedRowRender={rowRender}
              rowSelection={{ onChange }}
              columns={columns}
              dataSource={dataSource}
              rowKey={rowKey}
            />
          </Col>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="text-center w-100"
          >
            <MainButton htmlType="submit">{title}</MainButton>
          </form>
        </ContainerRow>
      </Card>
    </Col>
  </Organization>
);

export default AddMemberContainer;
