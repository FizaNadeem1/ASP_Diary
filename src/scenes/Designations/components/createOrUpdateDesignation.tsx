import * as React from 'react';

import {  Input, Modal, Form } from 'antd';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateDesignation.validation';
import { FormInstance } from 'antd/lib/form';


export interface ICreateOrUpdateDesignationProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateDesignation extends React.Component<ICreateOrUpdateDesignationProps> {
  state = {
    confirmDirty: false,
  };



  render() {

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

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Designation'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
              <Form.Item label={L('Designation Name')} {...formItemLayout} name={'designationName'} rules={rules.designationName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Designation Notes')} {...formItemLayout} name={'designationNotes'} rules={rules.designationNotes}>
                <Input />
              </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateDesignation;
