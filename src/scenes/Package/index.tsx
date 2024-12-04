import * as React from 'react';

import { Button, Card, Col, Input, Modal, Row, Table, Tag } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined } from '@ant-design/icons';
import { GetColorByIndex } from '../../components/Helper/GetColorByIndex';
import PackageStore from '../../stores/packageStore';
import CreateOrUpdatePackage from './components/createOrUpdatePackage';

export interface IPackageProps {
  packageStore: PackageStore;
}

export interface IPackageState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  packageId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.PackageStore)
@observer
class Package extends AppComponentBase<IPackageProps, IPackageState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    packageId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.packageStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.packageStore.createPackage();
    } else {
      await this.props.packageStore.get(entityDto);
    }

    this.setState({ packageId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.packageStore.editPackage });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.packageStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.packageId === 0) {
        await this.props.packageStore.create(values);
      } else {
        await this.props.packageStore.update({ ...values, id: this.state.packageId });
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
    const { packages } = this.props.packageStore;
    const columns = [
      {
        title: L('packageName'), dataIndex: 'packageName', key: 'packageName', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {title:L('courtBench'),dataIndex:'courtBench',key:'courtBench',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('clientRegister'),dataIndex:'clientRegister',key:'clientRegister',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('lawyerRegister'),dataIndex:'lawyerRegister',key:'lawyerRegister',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('caseRegister'),dataIndex:'caseRegister',key:'caseRegister',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('proceedings'),dataIndex:'proceedings',key:'proceedings',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('isMonthly'),dataIndex:'isMonthly',key:'isMonthly',width:'auto', 
        render: (text: boolean) => (text === true ? <Tag style={{
          backgroundColor: "teal",
          color: "white",
          paddingBottom: 2,
          paddingTop: 2,
          paddingLeft: 9,
          paddingRight: 9,
          borderRadius: 14,
        }} color="#2db7f5">{L('Monthly')}</Tag> : <Tag style={{
          backgroundColor:  "grey",
          color: "white",
          paddingBottom: 2,
          paddingTop: 2,
          paddingLeft: 9,
          paddingRight: 9,
          borderRadius: 14,
        }} color="red">{L('Yearly')}</Tag>)},
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
            <h2>{L('packages')}</h2>
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
                <h4 style={{ color: 'white' }}> {L('All Presiding Officers')}</h4> {/* Change text color to white for visibility */}
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
              pagination={{ pageSize: 10, total: packages === undefined ? 0 : packages.totalCount, defaultCurrent: 1 }}
              loading={packages === undefined ? true : false}
              dataSource={packages === undefined ? [] : packages.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdatePackage
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.packageId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default Package;