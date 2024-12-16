import * as React from 'react';

import { Input, Modal, Form, Select } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import { GetProvinces } from '../../../services/division/dto/getProvinceOutput';
import rules from './createOrUpdateDivision.validation';


export interface ICreateOrUpdateDivisionProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  provinces: GetProvinces[];
}

class CreateOrUpdateDivision extends React.Component<ICreateOrUpdateDivisionProps> {
  state = {
    confirmDirty: false,
  };



  render() {
    const { provinces } = this.props;
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
    const options = provinces.map((x: GetProvinces) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Division'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Form.Item label={L('Division Name')} {...formItemLayout} name={'divisionName'} rules={rules.divisionName}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Division Description')} {...formItemLayout} name={'divisionDescription'} rules={rules.divisionDescription}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Province')} {...formItemLayout} name={'provinceId'} rules={rules.provinceId}>
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

export default CreateOrUpdateDivision;
