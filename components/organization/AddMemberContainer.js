import React from 'react';
import { Table } from 'antd';

import Organization from '../layouts/organization';

import { Search } from '../base/Input';
import ContainerRow, { Col } from '../base/Grid';

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
    <ContainerRow>
      <Col md={{ size: 6, offset: 3 }}>
        <Search />
      </Col>
      <Col className="my-4" md={{ size: 10, offset: 1 }}>
        <Table
          expandedRowRender={expandedRowRender}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
        />
      </Col>
    </ContainerRow>
  </Organization>
);

export default AddMemberContainer;
