import * as React from 'react';

import { Button, Card, Col, Input, Modal, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
// import { PlusOutlined } from '@ant-design/icons';
import { GetColorByIndex } from '../../components/Helper/GetColorByIndex';
import BranchStore from '../../stores/branchStore';
import CreateOrUpdateBranch from './components/createOrUpdateBranch';

export interface IBranchProps {
  branchStore: BranchStore;
}

export interface IBranchState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  branchId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.BranchStore)
@observer
class Branch extends AppComponentBase<IBranchProps, IBranchState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    branchId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.branchStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.branchStore.createBranch();
        await this.props.branchStore.getCities();
        await this.props.branchStore.getFirms();
    } else {
      await this.props.branchStore.get(entityDto);
        await this.props.branchStore.getCities();
        await this.props.branchStore.getFirms();
    }

    this.setState({ branchId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.branchStore.editBranch });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.branchStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.branchId === 0) {
        await this.props.branchStore.create(values);
      } else {
        await this.props.branchStore.update({ ...values, id: this.state.branchId });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  public render() {
    const { branches } = this.props.branchStore;
    const columns = [
      {
        title: L('Branch Name'), dataIndex: 'branchName', key: 'branchName', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {
        title: L('Branch Owner'), dataIndex: 'branchOwner', key: 'branchOwner', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {title:L('Firm Name'),dataIndex:'firmFirmName',key:'firmFirmName',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('City Name'),dataIndex:'cityCityName',key:'cityCityName',width:'auto', render: (text: string) => <div>{text}</div>},
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
            <h2>{L('Branches')}</h2>
          </Col>
          {/* <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 2, offset: 21 }}
            xl={{ span: 2, offset: 21 }}
            xxl={{ span: 2, offset: 21 }}
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} >
              {L('Create new')}</Button>
          </Col> */}
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
            <Row
              gutter={16}
              style={{
                backgroundColor: 'black', // Set background color to black
                padding: '10px', // Optional: Add padding to give space around the elements
              }}
            >
              <Col span={12}>
                <h4 style={{ color: 'white' }}> {L('All Branches')}</h4> {/* Change text color to white for visibility */}
              </Col>
            </Row>
            <Table
              rowKey={(record) => record.id.toString()}
              bordered={true}
              onRow={(record, index) => ({
                style: {
                  backgroundColor: GetColorByIndex({ index }), // Set background color
                },
              })}
              columns={columns}
              size='small'
              pagination={{ pageSize: 10, total: branches === undefined ? 0 : branches.totalCount, defaultCurrent: 1 }}
              loading={branches === undefined ? true : false}
              dataSource={branches === undefined ? [] : branches.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateBranch
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.branchId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          cities={this.props.branchStore.cities}
          firms={this.props.branchStore.firms}
        />
      </Card>
    );
  }
}

export default Branch;
