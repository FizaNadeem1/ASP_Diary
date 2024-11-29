import * as React from 'react';

import { Input, Modal, Form, Select, Checkbox, } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createOrUpdateBench.validation';
import { GetBranches } from '../../../services/bench/dto/getBranchOutput';
import { GetCourts } from '../../../services/bench/dto/getCourtOutput';
import { GetPresidingOfficers } from '../../../services/bench/dto/getPresidingOfficerOutput';


export interface ICreateOrUpdateBenchProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  branches: GetBranches[];
  courts: GetCourts[];
  presidingOfficers: GetPresidingOfficers[];
}

class CreateOrUpdateBench extends React.Component<ICreateOrUpdateBenchProps> {
  state = {
    confirmDirty: false,
  };



  render() {
    const { branches,courts,presidingOfficers } = this.props;
    const formItemLayout = {
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
    const Boptions = branches.map((x: GetBranches) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Coptions = courts.map((x: GetCourts) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const PRoptions = presidingOfficers.map((x: GetPresidingOfficers) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Bench'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          
          <Form.Item label={L('branchId')} {...formItemLayout} name={'branchId'} rules={rules.branchId}>
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
          <Form.Item label={L('courtId')} {...formItemLayout} name={'courtId'} rules={rules.courtId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Coptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('benchCode')} {...formItemLayout} name={'benchCode'} rules={rules.benchCode}>
            <Input />
          </Form.Item>
          <Form.Item label={L('benchOfficerNo')} {...formItemLayout} name={'benchOfficerNo'} rules={rules.benchOfficerNo}>
            <Input />
          </Form.Item>
          <Form.Item label={L('benchStartDate')} {...formItemLayout} name={'benchStartDate'} rules={rules.benchStartDate}>
            <Input />
          </Form.Item>
          <Form.Item label={L('benchEndDate')} {...formItemLayout} name={'benchEndDate'} rules={rules.benchEndDate}>
            <Input />
          </Form.Item>
          <Form.Item label={L('benchStatus')} {...tailFormItemLayout} name={'benchStatus'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
          <Form.Item label={L('presidingOfficerId')} {...formItemLayout} name={'presidingOfficerId'} rules={rules.presidingOfficerId}>
            <Select
              showSearch
              placeholder="--select--"
              options={PRoptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateBench;
