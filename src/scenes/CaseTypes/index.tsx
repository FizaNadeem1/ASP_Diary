import * as React from 'react';

import { Button, Card, Col, Input, Modal, Row,  Table, } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
import {  PlusOutlined } from '@ant-design/icons';
import { GetColorByIndex } from '../../components/Helper/GetColorByIndex';
import './index.less'
import CaseTypeStore from '../../stores/caseTypeStore';
import CreateOrUpdateCaseType from './components/createOrUpdateCaseType';
export interface ICaseTypeProps {
  caseTypeStore: CaseTypeStore;
}

export interface ICaseTypeState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  CaseTypeId: number;
  filter: string;
  currentPage: number
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.CaseTypeStore)
@observer
class CaseType extends AppComponentBase<ICaseTypeProps, ICaseTypeState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    CaseTypeId: 0,
    filter: '',
    currentPage: 1
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.caseTypeStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      await this.props.caseTypeStore.createCaseType();
    } else {
      await this.props.caseTypeStore.get(entityDto);
    }

    this.setState({ CaseTypeId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.caseTypeStore.editCaseType });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.caseTypeStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.CaseTypeId === 0) {
        await this.props.caseTypeStore.create(values);
      } else {
        await this.props.caseTypeStore.update({ ...values, id: this.state.CaseTypeId });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  handleMaxResultCountChange = (value: number) => {
    this.setState({ maxResultCount: value });
    this.setState({ currentPage: 1 }); // Reset to the first page
  };

  handleNextPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  handlePrevPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage > 1 ? prevState.currentPage - 1 : 1,
    }));
  };

  public render() {
    const { caseTypes } = this.props.caseTypeStore;
    const columns = [
      {
        title: L('caseTypeName'),
        dataIndex: 'caseTypeName',
        key: 'caseTypeName',
        width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {
        title: L('caseTypeDesciption'),
        dataIndex: 'caseTypeDesciption',
        key: 'caseTypeDesciption',
        width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {
        title: L('Actions'),
        key: 'actions',
        width: 150,
        render: (text: string, item: any) => (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              style={{ marginRight: '5px' }}
              onClick={() => this.createOrUpdateModalOpen({ id: item.id })}
            >
              {L('Edit')}
            </Button>
            <Button
              color="danger"
              onClick={() => this.delete({ id: item.id })}
            >
              {L('Delete')}
            </Button>
          </div>
        ),
      },
    ];

    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 1, offset: 0 }}
            xl={{ span: 1, offset: 0 }}
            xxl={{ span: 1, offset: 0 }}
          >
            {' '}
            <h2>{L('CaseTypes')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 2, offset: 21 }}
            xl={{ span: 2, offset: 21 }}
            xxl={{ span: 2, offset: 21 }}
          >
            <Button type="primary"  icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} >
            {L('Create new')}</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 0 }}>
            <Search placeholder={this.L('Filter')} onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <div>
              {/* Custom Header Row */}
              <Row
        gutter={16}
        style={{
          backgroundColor: 'black', // Set background color to black
          padding: '10px', // Optional: Add padding to give space around the elements
        }}
      >
        <Col span={12}>
          <h4 style={{ color: 'white' }}> {L('All CaseTypes')}</h4> {/* Change text color to white for visibility */}
        </Col>
      </Row>              {/* Ant Design Table */}
              <Table
                rowKey={(record) => record.id.toString()}
                onRow={(record, index) => ({
                  style: {
                    backgroundColor: GetColorByIndex({ index }), // Set background color
                  },
                })}
                size="small"
                bordered={true}
                columns={columns}
                pagination={{ pageSize: 10, total: caseTypes === undefined ? 0 : caseTypes.totalCount, defaultCurrent: 1 }}
                loading={caseTypes === undefined ? true : false}
                dataSource={caseTypes === undefined ? [] : caseTypes.items}
                onChange={this.handleTableChange}
              />
            </div>

          </Col>
        </Row>
        <CreateOrUpdateCaseType
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.CaseTypeId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default CaseType;
