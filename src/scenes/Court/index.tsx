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
import CourtStore from '../../stores/courtStore';
import CreateOrUpdateCourt from './components/createOrUpdateCourt';

export interface ICourtProps {
  courtStore: CourtStore;
}

export interface ICourtState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  courtId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.CourtStore)
@observer
class Court extends AppComponentBase<ICourtProps, ICourtState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    courtId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.courtStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.courtStore.createCourt();
        await this.props.courtStore.getBranches();
        await this.props.courtStore.getForumCats();
        await this.props.courtStore.getForums();
        await this.props.courtStore.getTehsils();
        await this.props.courtStore.getCities();
        await this.props.courtStore.getDivisions();
        await this.props.courtStore.getProvinces();
    } else {
      await this.props.courtStore.get(entityDto);
      await this.props.courtStore.getBranches();
      await this.props.courtStore.getForumCats();
      await this.props.courtStore.getForums();
      await this.props.courtStore.getTehsils();
      await this.props.courtStore.getCities();
      await this.props.courtStore.getDivisions();
      await this.props.courtStore.getProvinces();    }

    this.setState({ courtId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.courtStore.editCourt });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.courtStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.courtId === 0) {
        await this.props.courtStore.create(values);
      } else {
        await this.props.courtStore.update({ ...values, id: this.state.courtId });
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
    const { courts } = this.props.courtStore;
    const columns = [
      {
        title: L('Court Code'), dataIndex: 'courtCode', key: 'courtCode', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {title:L('Forum Name'),dataIndex:'forumForumName',key:'forumForumName',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Forum Category Name'),dataIndex:'forumCategoryForumCategoryName',key:'forumCategoryForumCategoryName',width:'auto', render: (text: string) => <div>{text}</div>},
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
            <h2>{L('Courts')}</h2>
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
                <h4 style={{ color: 'white' }}> {L('All Courts')}</h4> {/* Change text color to white for visibility */}
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
              pagination={{ pageSize: 10, total: courts === undefined ? 0 : courts.totalCount, defaultCurrent: 1 }}
              loading={courts === undefined ? true : false}
              dataSource={courts === undefined ? [] : courts.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateCourt
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.courtId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          provinces={this.props.courtStore.provinces}
          divisions={this.props.courtStore.divisions}
          cities={this.props.courtStore.cities}
          tehsils={this.props.courtStore.tehsils}
          forums={this.props.courtStore.forums}
          forumCats={this.props.courtStore.forumCats}
          branches={this.props.courtStore.branches}
          store={this.props.courtStore}
          // selectedProvince={this.props.courtStore.selectedProvince}
          // selectedCity={this.props.courtStore.selectedCity}
          // selectedDivision={this.props.courtStore.selectedDivision}
        />
      </Card>
    );
  }
}

export default Court;
