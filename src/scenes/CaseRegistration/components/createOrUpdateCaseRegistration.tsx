import * as React from 'react';

import {  Input, Modal, Tabs, Form, Select, Checkbox } from 'antd';
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

const TabPane = Tabs.TabPane;

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
  store:CaseRegistraionStore
}

class CreateOrUpdateCaseRegistration extends React.Component<ICreateOrUpdateClientProps> {
  state = {
    confirmDirty: false,
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

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Client'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
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
                <Input />
              </Form.Item>
              <Form.Item label={L('caseStartDate')} {...formItemLayout} name={'caseStartDate'} rules={rules.caseStartDate}>
                <Input />
              </Form.Item>
              <Form.Item label={L('caseEndDate')} {...formItemLayout} name={'caseEndDate'} rules={rules.caseEndDate}>
                <Input />
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
                <Input />
              </Form.Item>
            <Form.Item label={L('bEndDate')} {...formItemLayout} name={'bEndDate'} rules={rules.bEndDate}>
                <Input />
              </Form.Item>
              <Form.Item label={L('caseBenchStatus')} {...formItemLayout} name={'caseBenchStatus'} rules={rules.caseBenchStatus}>
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item label={L('bNotes')} {...formItemLayout} name={'bNotes'} rules={rules.bNotes}>
                <Input />
              </Form.Item>
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
                <Input />
              </Form.Item>
            <Form.Item label={L('lEndDate')} {...formItemLayout} name={'lEndDate'} rules={rules.lEndDate}>
                <Input />
              </Form.Item>
              <Form.Item label={L('caseLawyerStatus')} {...formItemLayout} name={'caseLawyerStatus'} rules={rules.caseLawyerStatus}>
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item label={L('lNotes')} {...formItemLayout} name={'lNotes'} rules={rules.lNotes}>
                <Input />
              </Form.Item>
            </TabPane>          
            </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCaseRegistration;
