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
import BenchStore from '../../stores/benchStore';
import CreateOrUpdateBench from './components/createOrUpdateBench';

export interface IBenchProps {
  benchStore: BenchStore;
}
interface Officer {
  branchId: string;
  branchName: string;
  presidingOfficerId: string;
  presidingOfficerName: string;
}

export interface IBenchState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  benchId: number;
  filter: string;
  officerList: Officer[];
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.BenchStore)
@observer
class Bench extends AppComponentBase<IBenchProps, IBenchState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    benchId: 0,
    filter: '',
    officerList:[]
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.benchStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.benchStore.createBench();
      await this.props.benchStore.getBranches();
      await this.props.benchStore.getCourts();
      await this.props.benchStore.getPresidingOfficers();
      this.setState({ benchId: entityDto.id });
      this.Modal();
      setTimeout(() => {
        this.formRef.current?.setFieldsValue({ ...this.props.benchStore.editBench });
      }, 100);
    } else {await Promise.all([
      this.props.benchStore.get(entityDto),
      this.props.benchStore.getBranches(),
      this.props.benchStore.getCourts(),
      this.props.benchStore.getPresidingOfficers(),
    ]);
    
    let data = await this.props.benchStore.getBenchOfficers({ id: entityDto.id });
    console.log("data",data)
    const benchDetail = data?.benchMainDetailEdit || {};
    const officers = data?.listOfBenchDetailsDto || [];
    
    this.formRef.current?.setFieldsValue({
      ...benchDetail,
      benchStartDate: benchDetail.benchStartDate,
      benchEndDate: benchDetail.benchEndDate,
    });
    
    this.setState({
      modalVisible: true,
      benchId: entityDto.id,
      officerList: officers.map((officer: any) => ({
        presidingOfficerId: officer.presidingOfficerId,
        presidingOfficerName: officer.presidingOfficerName,
        branchId: officer.branchId,
        branchName: officer.branchName,
      })),
    });
    }
    this.setState({ benchId: entityDto.id });

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.benchStore.editBench });
    }, 100);
  }
  
  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.benchStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.benchId === 0) {
        await this.props.benchStore.create({...values,officerList:this.state.officerList});
      } else {
        await this.props.benchStore.update({ ...values, id: this.state.benchId,officerList:this.state.officerList });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };
  setOfficerList = (newOfficer: Officer) => {
    this.setState((prevState) => ({
      officerList: [...prevState.officerList, newOfficer],
    }));
  };

  public render() {
    const { benches } = this.props.benchStore;
    const columns = [
      {
        title: L('benchCode'), dataIndex: 'benchCode', key: 'benchCode', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {title:L('benchOfficerNo'),dataIndex:'benchOfficerNo',key:'benchOfficerNo',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('branchBranchName'),dataIndex:'branchBranchName',key:'branchBranchName',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('courtCourtCode'),dataIndex:'courtCourtCode',key:'courtCourtCode',width:'auto', render: (text: string) => <div>{text}</div>},
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
            <h2>{L('benches')}</h2>
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
              pagination={{ pageSize: 10, total: benches === undefined ? 0 : benches.totalCount, defaultCurrent: 1 }}
              loading={benches === undefined ? true : false}
              dataSource={benches === undefined ? [] : benches.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateBench
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
            this.setState({officerList:[]});
          }}
          modalType={this.state.benchId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          branches={this.props.benchStore.branches}
          courts={this.props.benchStore.courts}
          presidingOfficers={this.props.benchStore.presidingOfficers}
          officerList={this.state.officerList}
          setOfficerList={this.setOfficerList}         
          />
      </Card>
    );
  }
}

export default Bench;
