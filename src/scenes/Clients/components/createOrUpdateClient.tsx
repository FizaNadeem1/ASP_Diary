import * as React from 'react';

import {  Input, Modal, Tabs, Form, Select, DatePicker } from 'antd';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateClient.validation';
import { FormInstance } from 'antd/lib/form';
import { GetBranches } from '../../../services/client/dto/getBranchOutput';
import { GetCities } from '../../../services/client/dto/getCityOutput';
import { GetClientTypes } from '../../../services/client/dto/getClientTypeOutput';
import { GetGender } from '../../../services/client/dto/getGenderOutput';
import ClientStore from '../../../stores/clientStore';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateClientProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  branches: GetBranches[];
  cities: GetCities[];
  clientTypes: GetClientTypes[];
  clientGender: GetGender[];
  formRef: React.RefObject<FormInstance>;
  store:ClientStore
}

class CreateOrUpdateClient extends React.Component<ICreateOrUpdateClientProps> {
  state = {
    confirmDirty: false,
  };

  render() {
    const { branches,cities,clientTypes,clientGender } = this.props;
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

    const Boptions = branches.map((x: GetBranches) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const CLoptions = clientTypes.map((x: GetClientTypes) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Coptions = cities.map((x: GetCities) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Goptions = clientGender.map((x:GetGender) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Client'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Tabs defaultActiveKey={'ClientInfo'} size={'small'} tabBarGutter={64}>
            <TabPane tab={'Client'} key={'ClientInfo'}>
              <Form.Item label={L('clientName')} {...formItemLayout} name={'clientName'} rules={rules.clientName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('clientCode')} {...formItemLayout} name={'clientCode'} >
                <Input />
              </Form.Item>
              <Form.Item label={L('clientFatherName')} {...formItemLayout} name={'clientFatherName'} rules={rules.clientFatherName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('clientHusbandName')} {...formItemLayout} name={'clientHusbandName'} rules={rules.clientHusbandName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('clientCNIC')} {...formItemLayout} name={'clientCNIC'} rules={rules.clientCNIC}>
                <Input />
              </Form.Item>
              <Form.Item label={L('clientMobile')} {...formItemLayout} name={'clientMobile'} rules={rules.clientMobile}>
                <Input />
              </Form.Item>
              <Form.Item label={L('clientRegDate')} {...formItemLayout} name="clientRegDate" rules={rules.clientRegDate}>
              <DatePicker />
            </Form.Item>
              <Form.Item label={L('clientAdress')} {...formItemLayout} name={'clientAdress'} rules={rules.clientAdress}>
                <Input />
              </Form.Item>
              <Form.Item label={L('city')} {...formItemLayout} name={'cityId'} rules={rules.cityId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Coptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('branch')} {...formItemLayout} name={'branchId'} rules={rules.branchId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Boptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('clientType')} {...formItemLayout} name={'clientTypeId'} rules={rules.clientTypeId}>
            <Select
              showSearch
              placeholder="--select--"
              options={CLoptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('clientGender')} {...formItemLayout} name={'clientGender'} rules={rules.clientGender}>
            <Select
              showSearch
              placeholder="--select--"
              options={Goptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
            </TabPane>
            <TabPane tab={L('Business')} key={'Business'} forceRender={true}>
            <Form.Item label={L('clientFirmCode')} {...formItemLayout} name={'clientFirmCode'} rules={rules.clientFirmCode}>
                <Input />
              </Form.Item>
              <Form.Item label={L('clientFirmNTN')} {...formItemLayout} name={'clientFirmNTN'} rules={rules.clientFirmNTN}>
                <Input />
              </Form.Item>
              <Form.Item label={L('clientFirmSTR')} {...formItemLayout} name={'clientFirmSTR'} rules={rules.clientFirmSTR}>
                <Input />
              </Form.Item>
              <Form.Item label={L('clientFirmContactPer')} {...formItemLayout} name={'clientFirmContactPer'} rules={rules.clientFirmContactPer}>
                <Input />
              </Form.Item>
              <Form.Item label={L('clientFirmContactPerNo')} {...formItemLayout} name={'clientFirmContactPerNo'} rules={rules.clientFirmContactPerNo}>
                <Input />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateClient;
