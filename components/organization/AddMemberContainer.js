import React, { useState } from 'react';

import Organization from '../layouts/organization';

import Card from '../base/Card';
import ContainerRow, { Col } from '../base/Grid';
import { Search } from '../base/Input';
import Table from '../base/Table';
import MainButton from '../base/Button';
import Modal from '../base/Modal';

const AddMemberContainer = ({
  title,
  columns,
  dataSource,
  url,
  rowRender,
  rowKey = () => { },
  onChange = () => { },
  submit = () => { },
}) => {
  const [isOpenConfirm, toggleConfirm] = useState(false);

  return (
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
                toggleConfirm(true);
              }}
              className="text-center w-100"
            >
              <MainButton htmlType="submit">{title}</MainButton>
            </form>
          </ContainerRow>
        </Card>
      </Col>

      <Modal
        isOpenModal={isOpenConfirm}
        onClose={() => toggleConfirm(false)}
        onConfirm={() => {
          toggleConfirm(false);
          return submit();
        }}
        options={{
          header: 'Confirmation',
          body: `Are you sure to confirm these users?
      Please check the user before confirming.`,
          footer: 'You can edit members after in your organization.',
        }}
      />
    </Organization>
  );
};

export default AddMemberContainer;
