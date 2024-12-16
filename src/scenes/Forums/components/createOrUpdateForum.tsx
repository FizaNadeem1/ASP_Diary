import * as React from 'react';

import { Input, Modal, Form } from 'antd';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateForum.validation';
import { FormInstance } from 'antd/lib/form';


export interface ICreateOrUpdateForumProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateForum extends React.Component<ICreateOrUpdateForumProps> {
  state = {
    confirmDirty: false,
  };


  render() {

    const formItemLayout = {
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

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Forum'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
              <Form.Item label={L('Forum Name')} {...formItemLayout} name={'forumName'} rules={rules.forumName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Forum Description')} {...formItemLayout} name={'forumDescription'} rules={rules.forumDescription}>
                <Input />
              </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateForum;
