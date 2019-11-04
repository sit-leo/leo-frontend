import React from 'react';
import { Table, Descriptions } from 'antd';

import Organization from '../layouts/organization';

import Card from '../base/Card';
import ContainerRow, { Col } from '../base/Grid';
import { Search } from '../base/Input';
import { ApplicantDescription } from '../base/Description';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const expandedRowRender = record => <p>description</p>;


const AddMemberContainer = ({
  title,
  columns,
  dataSource,
}) => (
  <Organization title={title}>
      <Col>
        <Card>
          <ContainerRow>
            <Col md={{ size: 6, offset: 3 }}>
              <Search />
            </Col>
            <Col className="mt-4" md={{ size: 10, offset: 1 }}>
              <Table
                expandedRowRender={ApplicantDescription}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
              />
            </Col>
          </ContainerRow>
        </Card>
      </Col>
    </Organization>
);

export default AddMemberContainer;
