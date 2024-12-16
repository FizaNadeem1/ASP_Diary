import * as React from 'react';

import { Input, Modal, Tabs, Form, Select, Checkbox, DatePicker, Button, Table, Tag, Col, Row } from 'antd';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateCaseRegistration.validation';
import { FormInstance } from 'antd/lib/form';
import { GetBranches } from '../../../services/client/dto/getBranchOutput';
import CaseRegistraionStore from '../../../stores/caseRegistraionStore';
import { GetBenches } from '../../../services/caseRegistration/dto/getBenchOutput';
import { GetCaseTypes } from '../../../services/caseRegistration/dto/getCaseTypeOutput';
import { GetClients } from '../../../services/caseRegistration/dto/getClientOutput';
import { GetFirstLitigantTypes } from '../../../services/caseRegistration/dto/getFirstLitigantTypeOutput';
import { GetSecondLitigantTypes } from '../../../services/caseRegistration/dto/getSecondLitigantTypeOutput';
import { GetLawyers } from '../../../services/caseRegistration/dto/getLawyerOutput';
import { GetColorByIndex } from '../../../components/Helper/GetColorByIndex';
import http from '../../../services/httpService';

const TabPane = Tabs.TabPane;

// interface CaseBench {
//   benchBenchCode: string;
//   bStartDate: Moment;
//   bEndDate: Moment;
//   caseBenchStatus: boolean;
// }
// interface CaseLawyer {
//   lawyerLawyerName: string;
//   lStartDate: Moment;
//   lEndDate: Moment;
//   caseLawyerStatus: boolean;
// }
interface State {
  confirmDirty: boolean;
  isCBSelected: boolean;
  isCLSelected: boolean;
  isClientModalOpen: boolean;
  isCaseTypeModalOpen: boolean;
  newClientName: string;
  newCaseTypeName: string;
  // CToptions: any[]
  // CLoptions: any[]
  // caseLawyer:CaseLawyer[];
}
export interface ICreateOrUpdateClientProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  branches: GetBranches[];
  benches: GetBenches[];
  caseTypes: GetCaseTypes[];
  clients: GetClients[];
  firstParty: GetFirstLitigantTypes[];
  secondParty: GetSecondLitigantTypes[];
  lawyers: GetLawyers[];
  formRef: React.RefObject<FormInstance>;
  store: CaseRegistraionStore;
  // clList:GetAllCaseLawyerOutput[];
  // cbList:GetAllCaseBenchOutput[];
}

class CreateOrUpdateCaseRegistration extends React.Component<ICreateOrUpdateClientProps, State> {
  state = {
    confirmDirty: false,
    isCBSelected: false,
    isCLSelected: false,
    isClientModalOpen: false,
    isCaseTypeModalOpen: false,
    newClientName: '',
    newCaseTypeName: '',
    // CToptions: this.props.caseTypes.map((x) => ({ label: x.displayText, value: x.value })),
    // CLoptions: this.props.clients.map((x) => ({ label: x.displayText, value: x.value })),
    // caseLawyer:[],

  };
  render() {
    const { branches, benches,caseTypes,clients, lawyers, firstParty, secondParty } = this.props;

    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 6 },
    //     sm: { span: 6 },
    //     md: { span: 6 },
    //     lg: { span: 6 },
    //     xl: { span: 6 },
    //     xxl: { span: 6 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 18 },
    //     sm: { span: 18 },
    //     md: { span: 18 },
    //     lg: { span: 18 },
    //     xl: { span: 18 },
    //     xxl: { span: 18 },
    //   },
    // };
    // const tailFormItemLayout = {
    //   labelCol: {
    //     xs: { span: 8 },
    //     sm: { span: 8 },
    //     md: { span: 8 },
    //     lg: { span: 8 },
    //     xl: { span: 8 },
    //     xxl: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 16 },
    //     sm: { span: 16 },
    //     md: { span: 16 },
    //     lg: { span: 16 },
    //     xl: { span: 16 },
    //     xxl: { span: 16 },
    //   },
    // };

    const handleEditCaseBench = async () => {
      const data = {
        bStartDate: this.props.formRef.current?.getFieldValue('bStartDate'),
        bEndDate: this.props.formRef.current?.getFieldValue('bEndDate'),
        bNotes: this.props.formRef.current?.getFieldValue('bNotes'),
        caseBenchStatus: true,
        branchId: this.props.formRef.current?.getFieldValue('branchId'),
        caseMainId: this.props.formRef.current?.getFieldValue('caseMainId'),
        benchId: this.props.formRef.current?.getFieldValue('benchId'),
      };

      try {
        this.setState({ isCBSelected: true });
        await this.props.store.createCB(data);
        console.log('Save successful!');
      } catch (error) {
        console.error('Save failed:', error);
      } finally {
        this.setState({ isCBSelected: false });
      }
    };
    const handleEditCaseLawyer = async () => {
      const data = {
        lStartDate: this.props.formRef.current?.getFieldValue('lStartDate'),
        lEndDate: this.props.formRef.current?.getFieldValue('lEndDate'),
        lNotes: this.props.formRef.current?.getFieldValue('lNotes'),
        caseLawyerStatus: true,
        branchId: this.props.formRef.current?.getFieldValue('branchId'),
        caseMainId: this.props.formRef.current?.getFieldValue('caseMainId'),
        lawyerId: this.props.formRef.current?.getFieldValue('lawyerId'),
      };

      try {
        this.setState({ isCLSelected: true });
        await this.props.store.createCL(data);
        console.log('Save successful!');
      } catch (error) {
        console.error('Save failed:', error);
      } finally {
        this.setState({ isCLSelected: false });
      }
    };

    const { visible, onCancel, onCreate } = this.props;
    const BRoptions = branches.map((x: GetBranches) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    let CLoptions = clients.map((x: GetClients) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Loptions = lawyers.map((x: GetLawyers) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    let CToptions = caseTypes.map((x: GetCaseTypes) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const FLToptions = firstParty.map((x: GetFirstLitigantTypes) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const SLToptions = secondParty.map((x: GetSecondLitigantTypes) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Boptions = benches.map((x: GetBenches) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const handleAddClient = async () => {
      const data = {
        "id": 0,
        "creationTime": "2024-10-31T07:56:30.277Z",
        "creatorUserId": 0,
        "lastModificationTime": "2024-10-31T07:56:30.277Z",
        "lastModifierUserId": 0,
        "clientCode": "string",
        "clientTypeName": "PRIVATE",
        "clientName": this.state.newClientName,
        "clientFatherName": "XYZ",
        "clientHusbandName": "No",
        "clientAdress": 'XYZ',
        "clientCNIC": 'XYZ',
        "clientMobile": 'XYZ',
        "clientGender": 'XYZ',
        "clientPhotoPath": "noimage.png",
        "clientDOB": "2024-10-31",
        "clientRegDate": "2024-10-31",
        "clientFirmCode": "HZ MArkets",
        "clientFirmNTN": "NTN",
        "clientFirmSTR": "STR",
        "clientFirmContactPer": "Hassan",
        "clientFirmContactPerNo": "03209988765",
        "cityId": 15,
        "branchId": 2,
        "clientTypeId": 1
      }
      try {
        let result = await http.post('/api/services/app/Client/Create', data);
        if (result?.data?.success) {
          let id = result.data.result.id
          let label = result.data.result.clientName
          this.props.formRef.current?.setFieldsValue({ "clientId": id })
          this.props.formRef.current?.setFieldsValue({ "clientName": label })
          this.setState({ isClientModalOpen: false });
          // CToptions= ((prevState:any[])=>[...prevState, { value: id, label: label }])
        }
      } catch (error) {
        console.error("Failed to make create client api call", error);
      }
    };

    const handleAddCaseType = async () => {
      const data = {
        caseTypeName: this.state.newCaseTypeName,
        caseTypeDesciption: "",
      }
      try {
        let result = await http.post('/api/services/app/CaseType/Create', data);
        if (result?.data?.success) {
          let id = result.data.result.id
          let label = result.data.result.caseTypeName
          this.props.formRef.current?.setFieldsValue({ "caseTypeId": id })
          this.props.formRef.current?.setFieldsValue({ "caseTypeName": label })
          this.setState({ isCaseTypeModalOpen: false });
          // CToptions=((prevState:any[])=>[...prevState, { value: id, label: label }])
        }
      } catch (error) {
        console.error("Failed to make create casetype api call", error);
      }
    };
    const benchColumns = [
      {
        title: L('Bench Code'), dataIndex: 'benchBenchCode', key: 'benchBenchCode', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      { title: L('Start Date'), dataIndex: 'bStartDate', key: 'bStartDate', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('End Date'), dataIndex: 'bEndDate', key: 'bEndDate', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Bench Status'), dataIndex: 'caseBenchStatus', key: 'caseBenchStatus', width: 'auto', render: (text: boolean) => (text === true ? <Tag color="#2db7f5">{L('Yes')}</Tag> : <Tag color="red">{L('No')}</Tag>) }
    ];
    const lawyerColumns = [
      {
        title: L('Lawyer Name'), dataIndex: 'lawyerLawyerName', key: 'lawyerLawyerName', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      { title: L('Start Date'), dataIndex: 'lStartDate', key: 'lStartDate', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('End Date'), dataIndex: 'lEndDate', key: 'lEndDate', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Lawyer Status'), dataIndex: 'caseLawyerStatus', key: 'caseLawyerStatus', width: 'auto', render: (text: boolean) => (text === true ? <Tag color="#2db7f5">{L('Yes')}</Tag> : <Tag color="red">{L('No')}</Tag>) }
    ];

    return (
      <Modal visible={visible} width={1000} footer={this.props.modalType !== 'edit' ? null : undefined} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Client'} destroyOnClose={true}>
        <Form ref={this.props.formRef}
        layout='vertical'
          // initialValues={{
          //   id: 0,
          //   creationTime: '',
          //   creatorUserId: 0,
          //   lastModificationTime: '',
          //   lastModifierUserId: 0,
          //   caseNo: 'Diary-Has-Automated-Case-Code-Generator',
          //   courtCaseNo: '',
          //   courtCaseGenNo: '',
          //   courtCaseGaffNo: '',
          //   caseRegDate: '',
          //   caseStartDate: '',
          //   caseEndDate: '',
          //   caseTitle: '',
          //   firstLawyerName: '',
          //   secondLawyerName: '',
          //   firstPartyName: '',
          //   secondPartyName: '',
          //   caseNotes: '',
          //   casePleadings: '',
          //   caseStatus: true,
          //   caseShift: true,
          //   caseFinish: true,
          //   firNo: '',
          //   policeStation: '',
          //   offence: '',
          //   firDate: '',
          //   clientClientName: '',
          //   clientId: null,
          //   caseTypeCaseTypeName: '',
          //   caseTypeId: null,
          //   litigantType1LitigantTypeName: '',
          //   firstLitigantTypeId: null,
          //   litigantType2LitigantTypeName: '',
          //   secLitigantTypeId: null,
          //   branchBranchName: '',
          //   branchId: null,
          //   bStartDate: '',
          //   bEndDate: '',
          //   bNotes: '',
          //   caseBenchStatus: true,
          //   caseMain: '',
          //   caseMainId: null,
          //   bench: '',
          //   benchId: null,
          //   lStartDate: '',
          //   lEndDate: '',
          //   lNotes: '',
          //   caseLawyerStatus: true,
          //   lawyer: '',
          //   lawyerId: null,

          // }}
        >
          <Tabs defaultActiveKey={'ClientInfo'} size={'small'} tabBarGutter={64}>
            <TabPane tab={'Case Registration'} key={'ClientInfo'}>
              <Row gutter={16}>
                <Col span={8}>
              <Form.Item label={L('Branch Name')}   name={'branchId'} rules={rules.branchId}>
                <Select
                  showSearch
                  placeholder="--select--"
                  options={BRoptions}
                  allowClear
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
                </Col>
                <Col span={8}>
              <Form.Item label={L('Client Name')} name="clientId" rules={rules.clientId}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Select
                    showSearch
                    placeholder="--select--"
                    options={CLoptions}
                    allowClear
                    filterOption={(input, option) =>
                      (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                  <Button type="link" onClick={() => this.setState({ isClientModalOpen: true })}>
                    Add New
                  </Button>
                </div>
              </Form.Item>
                </Col>
                <Col span={8}>
              <Form.Item label="Case Type" name="caseTypeId" rules={rules.caseTypeId}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Select
                    showSearch
                    placeholder="--select--"
                    options={CToptions}
                    allowClear
                    filterOption={(input, option) =>
                      (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                  <Button type="link" onClick={() => this.setState({ isCaseTypeModalOpen: true })}>
                    Add New
                  </Button>
                </div>
              </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
              <Form.Item label={L('Reg Date')}   name={'caseRegDate'} rules={rules.caseRegDate}>
                <DatePicker style={{width:'100%'}}/>
              </Form.Item>
                </Col>
                <Col span={8}>
              <Form.Item label={L('Start Date')}   name={'caseStartDate'} rules={rules.caseStartDate}>
                <DatePicker style={{width:'100%'}}/>
              </Form.Item>
                </Col>
                <Col span={8}>
              <Form.Item label={L('End Date')}   name={'caseEndDate'} rules={rules.caseEndDate}>
                <DatePicker style={{width:'100%'}}/>
              </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
              <Form.Item label={L('Case No')}   name={'caseNo'} rules={rules.caseNo}>
                <Input disabled />
              </Form.Item>
                </Col>
                <Col span={8}>
              <Form.Item label={L('Case Main No')}   name={'courtCaseNo'} rules={rules.courtCaseNo}>
                <Input />
              </Form.Item>
                </Col>
                <Col span={8}>
              <Form.Item label={L('Case Title')}   name={'caseTitle'} rules={rules.caseTitle}>
                <Input />
              </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
              <Form.Item label={L('First Party Type')}   name={'firstLitigantTypeId'} rules={rules.firstLitigantTypeId}>
                <Select
                  showSearch
                  placeholder="--select--"
                  options={FLToptions}
                  allowClear
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('First Party Name')}   name={'firstPartyName'} rules={rules.firstPartyName}>
                <Input />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('First Lawyer Name')}   name={'firstLawyerName'} rules={rules.firstLawyerName}>
                <Input />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('Fir No')}   name={'firNo'} rules={rules.firNo}>
                <Input />
              </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
              <Form.Item label={L('Second Party Type')}   name={'secLitigantTypeId'} rules={rules.secLitigantTypeId}>
                <Select
                  showSearch
                  placeholder="--select--"
                  options={SLToptions}
                  allowClear
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('Second Party Name')}   name={'secondPartyName'} rules={rules.secondPartyName}>
                <Input />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('Second Lawyer Name')}   name={'secondLawyerName'} rules={rules.secondLawyerName}>
                <Input />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('Offence')}   name={'offence'} rules={rules.offence}>
                <Input />
              </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={4}>
              <Form.Item label={L('Case Status')}   name={'caseStatus'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
                </Col>
                <Col span={4}>
              <Form.Item label={L('Case Shift')}   name={'caseShift'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
                </Col>
                <Col span={4}>
              <Form.Item label={L('Case Finish')}   name={'caseFinish'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
                </Col>
                <Col span={4}>
              <Form.Item label={L('Fir Date')}   name={'firDate'} rules={rules.firDate}>
                <DatePicker />
              </Form.Item>
                </Col>
                <Col span={8}>
              <Form.Item label={L('Police Station')}   name={'policeStation'} rules={rules.policeStation}>
                <Input />
              </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
              <Form.Item label={L('Gen No')}   name={'courtCaseGenNo'} rules={rules.courtCaseGenNo}>
                <Input />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('Gaff No')}   name={'courtCaseGaffNo'} rules={rules.courtCaseGaffNo}>
                <Input />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('Case Notes')}   name={'caseNotes'} rules={rules.caseNotes}>
                <Input />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('Case Pleadings')}   name={'casePleadings'} rules={rules.casePleadings}>
                <Input />
              </Form.Item>
                </Col>
              </Row>
              {this.props.modalType !== 'edit' && <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Button onClick={onCancel} style={{ marginRight: 8 }}>
                  {L('Cancel')}
                </Button>
                <Button type="primary" onClick={onCreate}>
                  {L('Save')}
                </Button>
              </div>}
            </TabPane>
            <TabPane tab={L('Case Bench')} key={'Client'} forceRender={true}>
              <Row gutter={16}>
                <Col span={12}>
              <Form.Item label={L('Bench Code')}   name={'benchId'} rules={rules.benchId}>
                <Select
                  showSearch
                  placeholder="--select--"
                  options={Boptions}
                  allowClear
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('Start Date')}   name={'bStartDate'} rules={rules.bStartDate}>
                <DatePicker style={{width:'100%'}}/>
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('End Date')}   name={'bEndDate'} rules={rules.bEndDate}>
                <DatePicker style={{width:'100%'}}/>
              </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
              <Form.Item label={L('Bench Status')}   name={'caseBenchStatus'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
                </Col>
                <Col span={16}>
              <Form.Item label={L('Notes')}   name={'bNotes'} rules={rules.bNotes}>
                <Input />
              </Form.Item>
                </Col>
              </Row>
              {this.props.modalType !== 'edit' && <><Table
                rowKey={(record) => record.id}
                bordered={true}
                onRow={(record, index) => ({
                  style: {
                    backgroundColor: GetColorByIndex({ index }), // Set background color
                  },
                })}
                columns={benchColumns}
                size='small'
                pagination={false}
                loading={this.state.isCBSelected}
                dataSource={this.props.store.cbList === undefined ? [] : this.props.store.cbList}
              />
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                  <Button onClick={onCancel} style={{ marginRight: 8 }}>
                    {L('Cancel')}
                  </Button>
                  <Button type="primary" onClick={() => handleEditCaseBench()}>
                    {L('Save')}
                  </Button>
                </div></>}
            </TabPane>
            <TabPane tab={L('Case Lawyer')} key={'Lawyer'} forceRender={true}>
              <Row gutter={16}>
                <Col span={12}>
              <Form.Item label={L('Lawyer Name')}   name={'lawyerId'} rules={rules.lawyerId}>
                <Select
                  showSearch
                  placeholder="--select--"
                  options={Loptions}
                  allowClear
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('Start Date')}   name={'lStartDate'} rules={rules.lStartDate}>
                <DatePicker style={{width:'100%'}}/>
              </Form.Item>
                </Col>
                <Col span={6}>
              <Form.Item label={L('End Date')}   name={'lEndDate'} rules={rules.lEndDate}>
                <DatePicker style={{width:'100%'}}/>
              </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
              <Form.Item label={L('Lawyer Status')}   name={'caseLawyerStatus'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
                </Col>
                <Col span={16}>
              <Form.Item label={L('Notes')}   name={'lNotes'} rules={rules.lNotes}>
                <Input />
              </Form.Item>
                </Col>
              </Row>
              {this.props.modalType !== 'edit' && <><Table rowKey={(record) => record.id} bordered={true} onRow={(record, index) => ({
                  style: {
                    backgroundColor: GetColorByIndex({ index }), 
                  }})} columns={lawyerColumns} size='small' pagination={false} loading={this.state.isCLSelected} dataSource={this.props.store.clList === undefined ? [] : this.props.store.clList}/>
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                  <Button onClick={onCancel} style={{ marginRight: 8 }}>
                    {L('Cancel')}
                  </Button>
                  <Button type="primary" onClick={() => handleEditCaseLawyer()}>
                    {L('Save')}
                  </Button>
                </div></>}
            </TabPane>
          </Tabs>
          <Modal title="Add New Client" visible={this.state.isClientModalOpen} onOk={handleAddClient} onCancel={() => this.setState({ isClientModalOpen: false })}>
            <Input placeholder="Enter new client name" value={this.state.newClientName} onChange={(e) => this.setState({ newClientName: e.target.value })} />
          </Modal>
          <Modal title="Add New Case Type" visible={this.state.isCaseTypeModalOpen} onOk={handleAddCaseType} onCancel={() => this.setState({ isCaseTypeModalOpen: false })}>
            <Input placeholder="Enter new case type" value={this.state.newCaseTypeName} onChange={(e) => this.setState({ newCaseTypeName: e.target.value })} />
          </Modal>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCaseRegistration;
