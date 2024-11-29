import * as React from 'react';

import { Input, Modal, Form, Select } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createOrUpdateTehsil.validation';
import { GetCities } from '../../../services/tehsil/dto/getCityOutput';


export interface ICreateOrUpdateTehsilProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  cities: GetCities[];
}

class CreateOrUpdateTehsil extends React.Component<ICreateOrUpdateTehsilProps> {
  state = {
    confirmDirty: false,
  };



  render() {
    const { cities } = this.props;
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

    const { visible, onCancel, onCreate } = this.props;
    const options = cities.map((x: GetCities) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Tehsil'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Form.Item label={L('tehsilName')} {...formItemLayout} name={'tehsilName'} rules={rules.tehsilName}>
            <Input />
          </Form.Item>
          <Form.Item label={L('cityId')} {...formItemLayout} name={'cityId'} rules={rules.cityId}>
            <Select
              showSearch
              placeholder="--select--"
              options={options}
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

export default CreateOrUpdateTehsil;
