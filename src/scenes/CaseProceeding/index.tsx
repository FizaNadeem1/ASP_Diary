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
import CaseProceedingStore from '../../stores/CaseProceedingStore';
import CreateOrUpdateCaseProceeding from './components/createOrUpdateCaseProceeding';

export interface ICaseProceedingProps {
  caseProceedingStore: CaseProceedingStore;
}

export interface ICaseProceedingState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  caseProceedingId: number;
  filter: string;
  benchId:string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.CaseProceedingStore)
@observer
class CaseProceeding extends AppComponentBase<ICaseProceedingProps, ICaseProceedingState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    caseProceedingId: 0,
    filter: '',
    benchId:''
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.caseProceedingStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.caseProceedingStore.createCaseProceeding();
        await this.props.caseProceedingStore.getBranches();
        await this.props.caseProceedingStore.getProceedings();
    } else {
      await this.props.caseProceedingStore.getCaseProceedingForEdit(entityDto);
        await this.props.caseProceedingStore.getBranches();
        await this.props.caseProceedingStore.getProceedings();
    }

    this.setState({ caseProceedingId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.caseProceedingStore.editCaseProceeding });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.caseProceedingStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.caseProceedingId === 0) {
        await this.props.caseProceedingStore.create({...values,
          benchId:this.state.benchId,
          previousDate:values.previousDate.format("YYYY-MM-DD"),
          currentDate:values.currentDate.format("YYYY-MM-DD"),
          nexttDate:values.nexttDate.format("YYYY-MM-DD"),
          });
      } else {
        await this.props.caseProceedingStore.update({ ...values, id: this.state.caseProceedingId,benchId:this.props.caseProceedingStore.editCaseProceeding.benchId,
          previousDate:values.previousDate.format("YYYY-MM-DD"),
          currentDate:values.currentDate.format("YYYY-MM-DD"),
          nexttDate:values.nexttDate.format("YYYY-MM-DD") });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };
  setBenchId = (benchId: string) => {
    this.setState({benchId:benchId});
  };
  public render() {
    const { caseProceedings } = this.props.caseProceedingStore;
    const columns = [
      {
        title: L('Case No'), dataIndex: 'caseCaseNo', key: 'caseCaseNo', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {
        title: L('Case Title'), dataIndex: 'caseCaseTitle', key: 'caseCaseTitle', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {title:L('Previous Date'),dataIndex:'previousDate',key:'previousDate',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Next Date'),dataIndex:'nexttDate',key:'nexttDate',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Bench Code'),dataIndex:'benchBenchCode',key:'benchBenchCode',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Proceeding'),dataIndex:'proceedingStatusProceedingName',key:'proceedingStatusProceedingName',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('Branch Name'),dataIndex:'branchBranchName',key:'branchBranchName',width:'auto', render: (text: string) => <div>{text}</div>},
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
            <h2>{L('CaseProceedings')}</h2>
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
                <h4 style={{ color: 'white' }}> {L('All Case Proceedings')}</h4> {/* Change text color to white for visibility */}
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
              pagination={{ pageSize: 10, total: caseProceedings === undefined ? 0 : caseProceedings.totalCount, defaultCurrent: 1 }}
              loading={caseProceedings === undefined ? true : false}
              dataSource={caseProceedings === undefined ? [] : caseProceedings.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateCaseProceeding
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.caseProceedingId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          branches={this.props.caseProceedingStore.branches}
          proceedings={this.props.caseProceedingStore.proceedings}
          store={this.props.caseProceedingStore}
          setBenchId={this.setBenchId}
        />
      </Card>
    );
  }
}

export default CaseProceeding;
