import * as React from 'react';

import { Input, Modal, Form, Select, Checkbox } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createOrUpdateBranch.validation';
import { GetCities } from '../../../services/branch/dto/getCityOutput';
import { GetFirms } from '../../../services/branch/dto/getFirmOutput';


export interface ICreateOrUpdateBranchProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  cities: GetCities[];
  firms: GetFirms[];
}

class CreateOrUpdateBranch extends React.Component<ICreateOrUpdateBranchProps> {
  state = {
    confirmDirty: false,
  };



  render() {
    const { cities,firms } = this.props;
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


    const { visible, onCancel, onCreate } = this.props;
    const cityOptions = cities.map((x: GetCities) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const firmOptions = firms.map((x: GetFirms) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Branch'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Form.Item label={L('branchContactPersonNo')} {...formItemLayout} name={'branchContactPersonNo'} rules={rules.branchContactPersonNo}>
            <Input />
          </Form.Item>
          <Form.Item label={L('branchContactPerson')} {...formItemLayout} name={'branchContactPerson'} rules={rules.branchContactPerson}>
            <Input />
          </Form.Item>
          <Form.Item label={L('branchContactEmail')} {...formItemLayout} name={'branchContactEmail'} rules={rules.branchContactEmail as []}>
            <Input />
          </Form.Item>
          <Form.Item label={L('branchContactNo')} {...formItemLayout} name={'branchContactNo'} rules={rules.branchContactNo}>
            <Input />
          </Form.Item>
          <Form.Item label={L('branchAdress')} {...formItemLayout} name={'branchAdress'} rules={rules.branchAdress}>
            <Input />
          </Form.Item>
          <Form.Item label={L('branchOwner')} {...formItemLayout} name={'branchOwner'} rules={rules.branchOwner}>
            <Input />
          </Form.Item>
          <Form.Item label={L('branchName')} {...formItemLayout} name={'branchName'} rules={rules.branchName}>
            <Input />
          </Form.Item>
          <Form.Item label={L('branchCode')} {...formItemLayout} name={'branchCode'} rules={rules.branchCode}>
            <Input />
          </Form.Item>
          <Form.Item label={L('IsActive')} {...tailFormItemLayout} name={'isActive'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
          <Form.Item label={L('cityId')} {...formItemLayout} name={'cityId'} rules={rules.cityId}>
            <Select
              showSearch
              placeholder="--select--"
              options={cityOptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('firmId')} {...formItemLayout} name={'firmId'} rules={rules.firmId}>
            <Select
              showSearch
              placeholder="--select--"
              options={firmOptions}
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

export default CreateOrUpdateBranch;
