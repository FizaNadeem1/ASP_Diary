import * as React from 'react';

import {  Input, Modal, Tabs, Form, Select, Checkbox, DatePicker, Button, Table, Tag } from 'antd';
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
  store:CaseRegistraionStore;
  // clList:GetAllCaseLawyerOutput[];
  // cbList:GetAllCaseBenchOutput[];
}

class CreateOrUpdateCaseRegistration extends React.Component<ICreateOrUpdateClientProps,State> {
  state = {
    confirmDirty: false,
    isCBSelected:false,
    isCLSelected:false,
  // caseLawyer:[],

  };

  render() {
    const { branches,benches,caseTypes,clients,lawyers,firstParty,secondParty } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 8 },
        xl: { span: 8 },
        xxl: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 16 },
        xl: { span: 16 },
        xxl: { span: 16 },
      },
    };

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
    const CLoptions = clients.map((x: GetClients) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Loptions = lawyers.map((x: GetLawyers) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const CToptions = caseTypes.map((x:GetCaseTypes) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const FLToptions = firstParty.map((x:GetFirstLitigantTypes) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const SLToptions = secondParty.map((x:GetSecondLitigantTypes) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Boptions = benches.map((x:GetBenches) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const benchColumns = [
      {
        title: L('benchBenchCode'), dataIndex: 'benchBenchCode', key: 'benchBenchCode', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {title:L('bStartDate'),dataIndex:'bStartDate',key:'bStartDate',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('bEndDate'),dataIndex:'bEndDate',key:'bEndDate',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('caseBenchStatus'),dataIndex:'caseBenchStatus',key:'caseBenchStatus',width:'auto', render: (text: boolean) => (text === true ? <Tag color="#2db7f5">{L('Yes')}</Tag> : <Tag color="red">{L('No')}</Tag>)}
    ];
    const lawyerColumns = [
      {
        title: L('lawyerLawyerName'), dataIndex: 'lawyerLawyerName', key: 'lawyerLawyerName', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {title:L('lStartDate'),dataIndex:'lStartDate',key:'lStartDate',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('lEndDate'),dataIndex:'lEndDate',key:'lEndDate',width:'auto', render: (text: string) => <div>{text}</div>},
      {title:L('caseLawyerStatus'),dataIndex:'caseLawyerStatus',key:'caseLawyerStatus',width:'auto',  render: (text: boolean) => (text === true ? <Tag color="#2db7f5">{L('Yes')}</Tag> : <Tag color="red">{L('No')}</Tag>)}
    ];

    return (
      <Modal visible={visible} width={800} footer={null} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Client'} destroyOnClose={true}>
        <Form ref={this.props.formRef}
        initialValues={{
          id: 0,
          creationTime: '',
          creatorUserId: 0,
          lastModificationTime: '',
          lastModifierUserId: 0,
          caseNo: '',
          courtCaseNo: '',
          courtCaseGenNo: '',
          courtCaseGaffNo: '',
          caseRegDate: '',
          caseStartDate: '',
          caseEndDate: '',
          caseTitle: '',
          firstLawyerName: '',
          secondLawyerName: '',
          firstPartyName: '',
          secondPartyName: '',
          caseNotes: '',
          casePleadings: '',
          caseStatus: true,
          caseShift: true,
          caseFinish: true,
          firNo: '',
          policeStation: '',
          offence: '',
          firDate: '',
          clientClientName: '',
          clientId: null,
          caseTypeCaseTypeName: '',
          caseTypeId: null,
          litigantType1LitigantTypeName: '',
          firstLitigantTypeId: null,
          litigantType2LitigantTypeName: '',
          secLitigantTypeId: null,
          branchBranchName: '',
          branchId: null,
          bStartDate: '',
          bEndDate: '',
          bNotes: '',
          caseBenchStatus: true,
          caseMain: '',
          caseMainId: null,
          bench: '',
          benchId: null,
          lStartDate:'',
          lEndDate:'',
          lNotes: '',
          caseLawyerStatus: true,
          lawyer: '',
          lawyerId: null,
        
        }}
        >
          <Tabs defaultActiveKey={'ClientInfo'} size={'small'} tabBarGutter={64}>
            <TabPane tab={'Client'} key={'ClientInfo'}>
            <Form.Item label={L('branchId')} {...formItemLayout} name={'branchId'} rules={rules.branchId}>
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
          <Form.Item label={L('clientId')} {...formItemLayout} name={'clientId'} rules={rules.clientId}>
            <Select
              showSearch
              placeholder="--select--"
              options={CLoptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('caseTypeId')} {...formItemLayout} name={'caseTypeId'} rules={rules.caseTypeId}>
            <Select
              showSearch
              placeholder="--select--"
              options={CToptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

              <Form.Item label={L('caseRegDate')} {...formItemLayout} name={'caseRegDate'} rules={rules.caseRegDate}>
                <DatePicker />
              </Form.Item>
              <Form.Item label={L('caseStartDate')} {...formItemLayout} name={'caseStartDate'} rules={rules.caseStartDate}>
                <DatePicker />
              </Form.Item>
              <Form.Item label={L('caseEndDate')} {...formItemLayout} name={'caseEndDate'} rules={rules.caseEndDate}>
                <DatePicker />
              </Form.Item>
              <Form.Item label={L('caseNo')} {...formItemLayout} name={'caseNo'} rules={rules.caseNo}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Case Main No')} {...formItemLayout} name={'courtCaseNo'} rules={rules.courtCaseNo}>
                <Input />
              </Form.Item>
              <Form.Item label={L('caseTitle')} {...formItemLayout} name={'caseTitle'} rules={rules.caseTitle}>
                <Input />
              </Form.Item>
              <Form.Item label={L('firstLitigantTypeId')} {...formItemLayout} name={'firstLitigantTypeId'} rules={rules.firstLitigantTypeId}>
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
              <Form.Item label={L('firstPartyName')} {...formItemLayout} name={'firstPartyName'} rules={rules.firstPartyName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('firstLawyerName')} {...formItemLayout} name={'firstLawyerName'} rules={rules.firstLawyerName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('firNo')} {...formItemLayout} name={'firNo'} rules={rules.firNo}>
                <Input />
              </Form.Item>
              <Form.Item label={L('secLitigantTypeId')} {...formItemLayout} name={'secLitigantTypeId'} rules={rules.secLitigantTypeId}>
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
              <Form.Item label={L('secondPartyName')} {...formItemLayout} name={'secondPartyName'} rules={rules.secondPartyName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('secondLawyerName')} {...formItemLayout} name={'secondLawyerName'} rules={rules.secondLawyerName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('offence')} {...formItemLayout} name={'offence'} rules={rules.offence}>
                <Input />
              </Form.Item>
              <Form.Item label={L('caseStatus')} {...tailFormItemLayout} name={'caseStatus'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item label={L('caseShift')} {...tailFormItemLayout} name={'caseShift'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item label={L('caseFinish')} {...tailFormItemLayout} name={'caseFinish'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item label={L('firDate')} {...formItemLayout} name={'firDate'} rules={rules.firDate}>
                <Input />
              </Form.Item>
              <Form.Item label={L('policeStation')} {...formItemLayout} name={'policeStation'} rules={rules.policeStation}>
                <Input />
              </Form.Item>
              <Form.Item label={L('courtCaseGenNo')} {...formItemLayout} name={'courtCaseGenNo'} rules={rules.courtCaseGenNo}>
                <Input />
              </Form.Item>
              <Form.Item label={L('courtCaseGaffNo')} {...formItemLayout} name={'courtCaseGaffNo'} rules={rules.courtCaseGaffNo}>
                <Input />
              </Form.Item>
              <Form.Item label={L('caseNotes')} {...formItemLayout} name={'caseNotes'} rules={rules.caseNotes}>
                <Input />
              </Form.Item>
              <Form.Item label={L('casePleadings')} {...formItemLayout} name={'casePleadings'} rules={rules.casePleadings}>
                <Input />
              </Form.Item>
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Button onClick={onCancel} style={{ marginRight: 8 }}>
                  {L('Cancel')}
                </Button>
                <Button type="primary" onClick={onCreate}>
                  {L('Save')}
                </Button>
              </div>
            </TabPane>
            <TabPane tab={L('Case Client')} key={'Client'} forceRender={true}>
            <Form.Item label={L('benchId')} {...formItemLayout} name={'benchId'} rules={rules.benchId}>
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
              <Form.Item label={L('bStartDate')} {...formItemLayout} name={'bStartDate'} rules={rules.bStartDate}>
                <DatePicker />
              </Form.Item>
            <Form.Item label={L('bEndDate')} {...formItemLayout} name={'bEndDate'} rules={rules.bEndDate}>
                <DatePicker />
              </Form.Item>
              <Form.Item label={L('caseBenchStatus')} {...formItemLayout} name={'caseBenchStatus'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item label={L('bNotes')} {...formItemLayout} name={'bNotes'} rules={rules.bNotes}>
                <Input />
              </Form.Item>
              <Table
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
              </div>
            </TabPane>
            <TabPane tab={L('Case Lawyer')} key={'Lawyer'} forceRender={true}>
            <Form.Item label={L('lawyerId')} {...formItemLayout} name={'lawyerId'} rules={rules.lawyerId}>
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
              <Form.Item label={L('lStartDate')} {...formItemLayout} name={'lStartDate'} rules={rules.lStartDate}>
                <DatePicker />
              </Form.Item>
            <Form.Item label={L('lEndDate')} {...formItemLayout} name={'lEndDate'} rules={rules.lEndDate}>
                <DatePicker />
              </Form.Item>
              <Form.Item label={L('caseLawyerStatus')} {...formItemLayout} name={'caseLawyerStatus'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item label={L('lNotes')} {...formItemLayout} name={'lNotes'} rules={rules.lNotes}>
                <Input />
              </Form.Item>
              <Table
                 rowKey={(record) => record.id}
                  bordered={true}
                  onRow={(record, index) => ({
                    style: {
                      backgroundColor: GetColorByIndex({ index }), // Set background color
                    },
                  })}
                  columns={lawyerColumns}
                  size='small'
                  pagination={false}
                  loading={this.state.isCLSelected} 
                  dataSource={this.props.store.clList === undefined ? [] : this.props.store.clList}
                />
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Button onClick={onCancel} style={{ marginRight: 8 }}>
                  {L('Cancel')}
                </Button>
                <Button type="primary" onClick={() => handleEditCaseLawyer()}>
                  {L('Save')}
                </Button>
              </div>
            </TabPane>          
            </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCaseRegistration;
