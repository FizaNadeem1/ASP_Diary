import * as React from 'react';

import { Button, Card, Col,  Input,  Modal, Row, Table, Tag } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined } from '@ant-design/icons';
import ClientStore from '../../stores/clientStore';
import CreateOrUpdateClient from './components/createOrUpdateClient';
import { GetColorByIndex } from '../../components/Helper/GetColorByIndex';
import moment from 'moment';

export interface IClientProps {
  clientStore: ClientStore;
}

export interface IClientState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  clientId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.ClientStore)
@observer
class Client extends AppComponentBase<IClientProps, IClientState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    clientId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.clientStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.clientStore.createClient();
      await this.props.clientStore.getBranches();
      await this.props.clientStore.getCities();
      await this.props.clientStore.getClientTypes();
      await this.props.clientStore.getGender();
    } else {
      await this.props.clientStore.get(entityDto);
      await this.props.clientStore.getBranches();
      await this.props.clientStore.getCities();
      await this.props.clientStore.getClientTypes();  
      await this.props.clientStore.getGender();  
      }

    this.setState({ clientId: entityDto.id });
    this.Modal();

    // setTimeout(() => {
    //   this.formRef.current?.setFieldsValue({ ...this.props.clientStore.editClient });
    // }, 100);
    setTimeout(() => {
      const formValues = {
        ...this.props.clientStore.editClient,
        clientRegDate: moment(this.props.clientStore.editClient.clientRegDate),
      };
      this.formRef.current?.setFieldsValue(formValues);
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.clientStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      console.log("create client values",values)
      const clientTypeName = this.props.clientStore.clientTypes.find((item) => item.value === values.clientTypeId);

      if (this.state.clientId === 0) {
        await this.props.clientStore.create({...values,clientTypeName:clientTypeName?.displayText});
      } else {
        await this.props.clientStore.update({ ...values, id: this.state.clientId ,clientTypeName:clientTypeName?.displayText});
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
    const { clients } = this.props.clientStore;
    const columns = [
      { title: L('Client Name'), dataIndex: 'ClientName', key: 'ClientName', width:'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Client Name'), dataIndex: 'clientName', key: 'clientName', width:'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Client Code'), dataIndex: 'clientCode', key: 'clientCode', width:'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Client Type'), dataIndex: 'clientTypeClientTypeName', key: 'clientTypeClientTypeName', width:'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Branch Name'), dataIndex: 'branchBranchName', key: 'branchBranchName', width:'auto', render: (text: string) => <div>{text}</div> },
      { title: L('City Name'), dataIndex: 'cityCityName', key: 'cityCityName', width:'auto', render: (text: string) => <div>{text}</div> },
      {
        title: L('IsActive'),
        dataIndex: 'isActive',
        key: 'isActive',
        width: 150,
        render: (text: boolean) => (text === true ? <Tag color="#2db7f5">{L('Yes')}</Tag> : <Tag color="red">{L('No')}</Tag>),
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
            <h2>{L('clients')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 2, offset: 21 }}
            xl={{ span: 2, offset: 21 }}
            xxl={{ span: 2, offset: 21 }}
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} >
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
            <Row
              gutter={16}
              style={{
                backgroundColor: 'black', // Set background color to black
                padding: '10px', // Optional: Add padding to give space around the elements
              }}
            >
              <Col span={12}>
                <h4 style={{ color: 'white' }}> {L('All Clients')}</h4> {/* Change text color to white for visibility */}
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
              pagination={{ pageSize: 10, total: clients === undefined ? 0 : clients.totalCount, defaultCurrent: 1 }}
              loading={clients === undefined ? true : false}
              dataSource={clients === undefined ? [] : clients.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateClient
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.clientId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          branches={this.props.clientStore.branches}
          cities={this.props.clientStore.cities}
          clientTypes={this.props.clientStore.clientTypes}
          clientGender={this.props.clientStore.clientGender}
          store={this.props.clientStore}
        />
      </Card>
    );
  }
}

export default Client;
