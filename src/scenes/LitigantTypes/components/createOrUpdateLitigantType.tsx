import * as React from 'react';

import { Checkbox, Input, Modal, Form } from 'antd';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateLitigantType.validation';
import { FormInstance } from 'antd/lib/form';


export interface ICreateOrUpdateLitigantTypeProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateLitigantType extends React.Component<ICreateOrUpdateLitigantTypeProps> {
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



    return (
      <Modal visible={visible} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'LitigantType'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
              <Form.Item label={L('litigantTypeName')} {...formItemLayout} name={'litigantTypeName'} rules={rules.litigantTypeName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('litigantTypeDesciption')} {...formItemLayout} name={'litigantTypeDesciption'} rules={rules.litigantTypeDesciption}>
                <Input />
              </Form.Item>
              <Form.Item label={L('status')} {...tailFormItemLayout} name={'status'} valuePropName={'checked'}>
                <Checkbox></Checkbox>
              </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateLitigantType;
