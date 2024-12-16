import * as React from 'react';

import { Input, Modal, Form, Select } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import { GetDivisions } from '../../../services/city/dto/getDivisionOutput';
import rules from './createOrUpdateCity.validation';


export interface ICreateOrUpdateCityProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  divisions: GetDivisions[];
}

class CreateOrUpdateCity extends React.Component<ICreateOrUpdateCityProps> {
  state = {
    confirmDirty: false,
  };



  render() {
    const { divisions } = this.props;
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
    const options = divisions.map((x: GetDivisions) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'City'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Form.Item label={L('City Name')} {...formItemLayout} name={'cityName'} rules={rules.cityName}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Division')} {...formItemLayout} name={'divisionId'} rules={rules.divisionId}>
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

export default CreateOrUpdateCity;
