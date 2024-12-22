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
import LawyerStore from '../../stores/lawyerStore';
import CreateOrUpdateLawyer from './components/createOrUpdateLawyer';
import Avatar from "../../assets/images/formAvatar.png";
// import ImageUploader from './components/imageUploader';

export interface ILawyerProps {
  lawyerStore: LawyerStore;
}

export interface Ilawyerstate {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  lawyerId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.LawyerStore)
@observer
class Lawyer extends AppComponentBase<ILawyerProps, Ilawyerstate> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    lawyerId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.lawyerStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.lawyerStore.createLawyer();
        await this.props.lawyerStore.getBranches();
        await this.props.lawyerStore.getSpecialities();
        await this.props.lawyerStore.getTehsils();
        await this.props.lawyerStore.getCities();
        await this.props.lawyerStore.getDivisions();
        await this.props.lawyerStore.getProvinces();
    } else {
      await this.props.lawyerStore.get(entityDto);
      await this.props.lawyerStore.getBranches();
      await this.props.lawyerStore.getSpecialities();
      await this.props.lawyerStore.getTehsils();
      await this.props.lawyerStore.getCities();
      await this.props.lawyerStore.getDivisions();
      await this.props.lawyerStore.getProvinces();    }

    this.setState({ lawyerId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.lawyerStore.editLawyer });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.lawyerStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.lawyerId === 0) {
        await this.props.lawyerStore.create(values);
      } else {
        await this.props.lawyerStore.update({ ...values, id: this.state.lawyerId });
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
    const { lawyers } = this.props.lawyerStore;
    const columns = [
      {
        title: L('Lawyer Photo'), dataIndex: 'lawyerPhotoPath', key: 'lawyerPhotoPath', width: 'auto',
        render: (text: string) => <div><img src={Avatar} alt="" style={{height:'25px',width:'25px',borderRadius:100}}/></div>
      },
      {title:L('Lawyer Name'),dataIndex:'lawyerName',key:'lawyerName',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Lawyer Liscene'),dataIndex:'lawyerLiscene',key:'lawyerLiscene',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Lawyer Speaciality'),dataIndex:'lawyerSpeacialitySpeacialityName',key:'lawyerSpeacialitySpeacialityName',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Branch'),dataIndex:'branchBranchName',key:'branchBranchName',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('City'),dataIndex:'cityCityName',key:'cityCityName',width:'auto', render: (text: string) => <div>{text}</div>},
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
            <h2>{L('Lawyers')}</h2>
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
                <h4 style={{ color: 'white' }}> {L('All Lawyers')}</h4> {/* Change text color to white for visibility */}
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
              pagination={{ pageSize: 10, total: lawyers === undefined ? 0 : lawyers.totalCount, defaultCurrent: 1 }}
              loading={lawyers === undefined ? true : false}
              dataSource={lawyers === undefined ? [] : lawyers.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateLawyer
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.lawyerId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          provinces={this.props.lawyerStore.provinces}
          divisions={this.props.lawyerStore.divisions}
          cities={this.props.lawyerStore.cities}
          tehsils={this.props.lawyerStore.tehsils}
          speciality={this.props.lawyerStore.speciality}
          branches={this.props.lawyerStore.branches}
          store={this.props.lawyerStore}
          // selectedProvince={this.props.lawyerStore.selectedProvince}
          // selectedCity={this.props.lawyerStore.selectedCity}
          // selectedDivision={this.props.lawyerStore.selectedDivision}
        />
        {/* <ImageUploader/> */}
      </Card>
    );
  }
}

export default Lawyer;
