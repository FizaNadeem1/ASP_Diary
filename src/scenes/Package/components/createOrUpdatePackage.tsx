import * as React from 'react';

import { Input, Modal, Form, Checkbox } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createOrUpdatePackage.validation';


export interface ICreateOrUpdatePackageProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdatePackage extends React.Component<ICreateOrUpdatePackageProps> {
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
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Package'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Form.Item label={L('Package Name')} {...formItemLayout} name={'packageName'} rules={rules.packageName}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Court Bench')} {...formItemLayout} name={'courtBench'} rules={rules.courtBench}>
            <Input />
          </Form.Item><Form.Item label={L('Client Register')} {...formItemLayout} name={'clientRegister'} rules={rules.clientRegister}>
            <Input />
          </Form.Item><Form.Item label={L('Lawyer Register')} {...formItemLayout} name={'lawyerRegister'} rules={rules.lawyerRegister}>
            <Input />
          </Form.Item><Form.Item label={L('Case Register')} {...formItemLayout} name={'caseRegister'} rules={rules.caseRegister}>
            <Input />
          </Form.Item><Form.Item label={L('Proceedings')} {...formItemLayout} name={'proceedings'} rules={rules.proceedings}>
            <Input />
          </Form.Item><Form.Item label={L('Cause List')} {...formItemLayout} name={'causeList'} rules={rules.causeList}>
            <Input />
          </Form.Item><Form.Item label={L('Reporting')} {...formItemLayout} name={'reporting'} rules={rules.reporting}>
            <Input />
          </Form.Item><Form.Item label={L('Details')} {...formItemLayout} name={'details'} rules={rules.details}>
            <Input />
          </Form.Item><Form.Item label={L('Admin Panel')} {...formItemLayout} name={'adminPanel'} rules={rules.adminPanel}>
            <Input />
          </Form.Item><Form.Item label={L('User Registration')} {...formItemLayout} name={'usersRegistration'} rules={rules.usersRegistration}>
            <Input />
          </Form.Item><Form.Item label={L('Roles Manage')} {...formItemLayout} name={'rolesManage'} rules={rules.rolesManage}>
            <Input />
          </Form.Item><Form.Item label={L('Firm Registration')} {...formItemLayout} name={'firmRegistration'} rules={rules.firmRegistration}>
            <Input />
          </Form.Item><Form.Item label={L('Branch Registration')} {...formItemLayout} name={'branchRegistration'} rules={rules.branchRegistration}>
            <Input />
          </Form.Item><Form.Item label={L('White Listing')} {...formItemLayout} name={'whiteListing'} rules={rules.whiteListing}>
            <Input />
          </Form.Item><Form.Item label={L('Price')} {...formItemLayout} name={'price'} rules={rules.price}>
            <Input />
          </Form.Item><Form.Item label={L('ExactPrice')} {...formItemLayout} name={'exactPrice'} rules={rules.exactPrice}>
            <Input />
          </Form.Item><Form.Item label={L('SMS')} {...formItemLayout} name={'sms'} rules={rules.sms}>
            <Input />
          </Form.Item><Form.Item label={L('Masking')} {...formItemLayout} name={'masking'} rules={rules.masking}>
            <Input />
          </Form.Item><Form.Item label={L('Excel Pdf Export')} {...formItemLayout} name={'excelPdfData'} rules={rules.excelPdfData}>
            <Input />
          </Form.Item><Form.Item label={L('SMS Service Charges')} {...formItemLayout} name={'smsServiceCharges'} rules={rules.smsServiceCharges}>
            <Input />
          </Form.Item><Form.Item label={L('isMonthly')} {...formItemLayout} name={'isMonthly'} valuePropName={'checked'}>
            <Checkbox></Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdatePackage;
