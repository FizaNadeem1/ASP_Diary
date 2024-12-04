import * as React from 'react';

import {  Input, Modal,  Form, Select } from 'antd';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateCategory.validation';
import { FormInstance } from 'antd/lib/form';
import { GetForums } from '../../../services/forumCat/dto/getForumOutput';


export interface ICreateOrUpdateCategoryProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  forums:GetForums[]
}

class CreateOrUpdateCategory extends React.Component<ICreateOrUpdateCategoryProps> {
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

    const { visible, onCancel, onCreate,forums } = this.props;

    const Foptions = forums.map((x: GetForums) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Category'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
              <Form.Item label={L('forumCategoryName')} {...formItemLayout} name={'forumCategoryName'} rules={rules.forumCategoryName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('forumId')} {...formItemLayout} name={'forumId'} rules={rules.forumId}>
              <Select
              showSearch
              placeholder="--select--"
              options={Foptions}
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

export default CreateOrUpdateCategory;
