import * as React from 'react';

import { Button, Card, Col, Input,  Row, Table, } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined } from '@ant-design/icons';
import { GetColorByIndex } from '../../components/Helper/GetColorByIndex';
import CreateOrUpdateCaseRegistration from './components/createOrUpdateCaseRegistration';
import CaseRegistraionStore from '../../stores/caseRegistraionStore';

export interface ICaseRegistrationProps {
  caseRegistrationStore: CaseRegistraionStore;
}

export interface ICaseRegistrationState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  caseRegistrationId: number;
  filter: string;
}

const Search = Input.Search;

@inject(Stores.CaseRegistrationStore)
@observer
class CaseRegistration extends AppComponentBase<ICaseRegistrationProps, ICaseRegistrationState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    caseRegistrationId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.caseRegistrationStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.caseRegistrationStore.createCaseRegistration();
      await this.props.caseRegistrationStore.getBranches();
      await this.props.caseRegistrationStore.getBenches();
      await this.props.caseRegistrationStore.getCaseTypes();
      await this.props.caseRegistrationStore.getClients();
      await this.props.caseRegistrationStore.getFirstParty();
      await this.props.caseRegistrationStore.getSecondParty();
      await this.props.caseRegistrationStore.getLawyers();
    } else {
      await this.props.caseRegistrationStore.getByMainId(entityDto);
      this.props.caseRegistrationStore.getBranches();
      this.props.caseRegistrationStore.getBenches();
      this.props.caseRegistrationStore.getCaseTypes();
      this.props.caseRegistrationStore.getClients();
      this.props.caseRegistrationStore.getFirstParty();
      this.props.caseRegistrationStore.getSecondParty();
      this.props.caseRegistrationStore.getLawyers();
      this.props.caseRegistrationStore.getLawyers();
      this.props.caseRegistrationStore.getCaseLawyersList(entityDto.id.toString());
      this.props.caseRegistrationStore.getCaseBenchList(entityDto.id.toString());
    }

    this.setState({ caseRegistrationId: entityDto.id });
    this.Modal();
    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.caseRegistrationStore.editCaseRegistration});
    }, 100);
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      console.log("form values of case reg",values)
      // let val={...values,clientId:Number(values.clientId),caseTypeId:Number(values.caseTypeId)}
      if (this.state.caseRegistrationId === 0) {
        await this.props.caseRegistrationStore.create(values);
      } else {
        await this.props.caseRegistrationStore.update({ ...values, id: this.state.caseRegistrationId });
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
    const { caseRegistrations } = this.props.caseRegistrationStore;
    const columns = [
      { title: L('Case No'), dataIndex: 'caseNo', key: 'caseNo', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Case Main No'), dataIndex: 'courtCaseNo', key: 'courtCaseNo', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('First Party'), dataIndex: 'firstPartyName', key: 'firstPartyName', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Second Party'), dataIndex: 'secondPartyName', key: 'secondPartyName', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Case Type'), dataIndex: 'caseTypeCaseTypeName', key: 'caseTypeCaseTypeName', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Branch Name'), dataIndex: 'branchBranchName', key: 'branchBranchName', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Client Name'), dataIndex: 'clientClientName', key: 'clientClientName', width: 'auto', render: (text: string) => <div>{text}</div> },
      {
        title: L('Actions'),
        key: 'actions',
        width: 75,
        render: (text: string, item: any) => (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              style={{ marginRight: '5px' }}
              onClick={() => this.createOrUpdateModalOpen({ id: item.id })}
            >
              {L('Edit')}
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
            <h2>{L('Case Registrations')}</h2>
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
                <h4 style={{ color: 'white' }}> {L('All Case Registrations')}</h4> {/* Change text color to white for visibility */}
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
              pagination={{ pageSize: 10, total: caseRegistrations === undefined ? 0 : caseRegistrations.totalCount, defaultCurrent: 1 }}
              loading={caseRegistrations === undefined ? true : false}
              dataSource={caseRegistrations === undefined ? [] : caseRegistrations.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateCaseRegistration
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.caseRegistrationId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          branches={this.props.caseRegistrationStore.branches}
          benches={this.props.caseRegistrationStore.benches}
          firstParty={this.props.caseRegistrationStore.firstParty}
          secondParty={this.props.caseRegistrationStore.secondParty}
          caseTypes={this.props.caseRegistrationStore.caseTypes}
          clients={this.props.caseRegistrationStore.clients}
          lawyers={this.props.caseRegistrationStore.lawyers}
          store={this.props.caseRegistrationStore}
        />
      </Card>
    );
  }
}

export default CaseRegistration;
