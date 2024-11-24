import * as React from 'react';

import { Input, Modal, Form, Select } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createOrUpdatePresidingOfficer.validation';
import { GetDesignations } from '../../../services/presidingOfficer/dto/getDesignationOutput';


export interface ICreateOrUpdatePresidingOfficerProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  designations: GetDesignations[];
}

class CreateOrUpdatePresidingOfficer extends React.Component<ICreateOrUpdatePresidingOfficerProps> {
  state = {
    confirmDirty: false,
  };



  render() {
    const { designations } = this.props;
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
    const options = designations.map((x: GetDesignations) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'PresidingOfficer'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Form.Item label={L('presidingOfficerName')} {...formItemLayout} name={'presidingOfficerName'} rules={rules.presidingOfficerName}>
            <Input />
          </Form.Item>
          <Form.Item label={L('presidingOfficerNameNotes')} {...formItemLayout} name={'presidingOfficerNameNotes'} rules={rules.presidingOfficerNameNotes}>
            <Input />
          </Form.Item>
          <Form.Item label={L('designationId')} {...formItemLayout} name={'designationId'} rules={rules.designationId}>
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

export default CreateOrUpdatePresidingOfficer;
