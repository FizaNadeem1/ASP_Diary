import * as React from 'react';

import { Button, Card, Col, Input, Modal, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined } from '@ant-design/icons';
import { GetColorByIndex } from '../../components/Helper/GetColorByIndex';
import FirmStore from '../../stores/firmStore';
import CreateOrUpdateFirm from './components/createOrUpdateFirm';

export interface IFirmProps {
  firmStore: FirmStore;
}

export interface IFirmState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  firmId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.FirmStore)
@observer
class Firm extends AppComponentBase<IFirmProps, IFirmState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    firmId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.firmStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  // async createOrUpdateModalOpen(entityDto: EntityDto) {
  //   if (entityDto.id === 0) {
  //     await this.props.firmStore.createFirm();
  //       await this.props.firmStore.getCities();
  //       await this.props.firmStore.getTimeZone();
  //   } else {
  //     await this.props.firmStore.get(entityDto);
  //       await this.props.firmStore.getCities();
  //       await this.props.firmStore.getTimeZone();
  //   }

  //   this.setState({ firmId: entityDto.id });
  //   this.Modal();

  //   setTimeout(() => {
  //     this.formRef.current?.setFieldsValue({ ...this.props.firmStore.editFirm });
  //   }, 100);
  // }
  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      // For create operation
      await this.props.firmStore.createFirm();
      await this.props.firmStore.getCities();
      await this.props.firmStore.getTimeZone();
    } else {
      // For edit operation
      await this.props.firmStore.get(entityDto);
      await this.props.firmStore.getCities();
      await this.props.firmStore.getTimeZone();
    }
  
    this.setState({ 
      firmId: entityDto.id,
      modalVisible: true,
    });
  
    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.firmStore.editFirm });
    }, 100);
  }
  

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.firmStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.firmId === 0) {
        await this.props.firmStore.create(values);
      } else {
        await this.props.firmStore.update({ ...values, id: this.state.firmId });
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
    const { firms } = this.props.firmStore;
    const columns = [
      {
        title: L('Firm Name'), dataIndex: 'firmName', key: 'firmName', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {
        title: L('Firm Owner'), dataIndex: 'firmOwner', key: 'firmOwner', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {title:L('Firm Code'),dataIndex:'firmCode',key:'firmCode',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Allowed Branches'),dataIndex:'noOfBranches',key:'noOfBranches',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Allowed Cases'),dataIndex:'noOfCases',key:'noOfCases',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Allowed Lawyers'),dataIndex:'noOfLawyers',key:'noOfLawyers',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('City Name'),dataIndex:'cityNameCityName',key:'cityNameCityName',width:'auto', render: (text: string) => <div>{text}</div>},
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
            <h2>{L('firms')}</h2>
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
                <h4 style={{ color: 'white' }}> {L('All firms')}</h4> {/* Change text color to white for visibility */}
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
              pagination={{ pageSize: 10, total: firms === undefined ? 0 : firms.totalCount, defaultCurrent: 1 }}
              loading={firms === undefined ? true : false}
              dataSource={firms === undefined ? [] : firms.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateFirm
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.firmId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          cities={this.props.firmStore.cities}
          timeZone={this.props.firmStore.timeZone}
        />
      </Card>
    );
  }
}

export default Firm;
