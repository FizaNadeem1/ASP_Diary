import * as React from 'react';

import { Input, Modal, Form } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createOrUpdateCaseType.validation';


export interface ICreateOrUpdateCaseTypeProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateCaseType extends React.Component<ICreateOrUpdateCaseTypeProps> {
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
      <Modal visible={visible} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'CaseType'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
              <Form.Item label={L('caseTypeName')} {...formItemLayout} name={'caseTypeName'} rules={rules.caseTypeName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('caseTypeDesciption')} {...formItemLayout} name={'caseTypeDesciption'} rules={rules.caseTypeDesciption}>
                <Input />
              </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCaseType;
