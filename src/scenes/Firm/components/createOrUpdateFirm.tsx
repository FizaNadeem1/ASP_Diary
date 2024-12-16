import * as React from 'react';

import { Input, Modal, Form, Select, Checkbox } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createOrUpdateFirm.validation';
import { GetTimeZone } from '../../../services/firm/dto/getTimeZoneOutput';
import { GetCities } from '../../../services/firm/dto/getCityOutput';


export interface ICreateOrUpdateFirmProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  cities: GetCities[];
  timeZone: GetTimeZone[];
}

class CreateOrUpdateFirm extends React.Component<ICreateOrUpdateFirmProps> {
  state = {
    confirmDirty: false,
  };



  render() {
    const { cities, timeZone } = this.props;
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
    const cityOptions = cities.map((x: GetCities) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const firmOptions = timeZone.map((x: GetTimeZone) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Firm'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Form.Item label={L('Firm Name')} {...formItemLayout} name={'firmName'} rules={rules.firmName}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Firm Owner')} {...formItemLayout} name={'firmOwner'} rules={rules.firmOwner}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Firm Code')} {...formItemLayout} name={'firmCode'} rules={rules.firmCode}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Contact No')} {...formItemLayout} name={'firmContactNo'} rules={rules.firmContactNo}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Valid Email')} {...formItemLayout} name={'firmContactEmail'} rules={rules.firmContactEmail as []}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Contact Person')} {...formItemLayout} name={'firmContactPerson'} rules={rules.firmContactPerson}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Person No')} {...formItemLayout} name={'firmContactPersonNo'} rules={rules.firmContactPersonNo}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Local Adress')} {...formItemLayout} name={'firmAdress'} rules={rules.firmAdress}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Wesite')} {...formItemLayout} name={'firmWesite'} rules={rules.firmWesite}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Allowed Cases')} {...formItemLayout} name={'noOfCases'} rules={rules.noOfCases}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Allowed Lawyers')} {...formItemLayout} name={'noOfLawyers'} rules={rules.timeZone}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Allowed Branches')} {...formItemLayout} name={'noOfBranches'} rules={rules.noOfBranches}>
            <Input />
          </Form.Item>
          <Form.Item label={L('City')} {...formItemLayout} name={'cityId'} rules={rules.cityId}>
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
          <Form.Item label={L('Time Zone (GMT)')} {...formItemLayout} name={'timeZone'} rules={rules.noOfLawyers}>
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
          <Form.Item label={L('Admin Panel Access')} {...tailFormItemLayout} name={'adminPanelAccess'} valuePropName={'checked'}>
            <Checkbox></Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateFirm;
