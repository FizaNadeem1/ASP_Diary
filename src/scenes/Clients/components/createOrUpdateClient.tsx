import * as React from 'react';

import { Input, Modal, Tabs, Form, Select, DatePicker } from 'antd';
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
  store: ClientStore
}

class CreateOrUpdateClient extends React.Component<ICreateOrUpdateClientProps> {
  state = {
    confirmDirty: false,
  };

  // handleClientChange = async(value:any) => {
  //   console.log("client ma client label",value)
  //   this.props.formRef.current?.setFieldsValue({"clientTypeName":value.label})
  //   this.props.store.clientTypeName=value.label
  // };
  render() {
    const { branches, cities, clientTypes, clientGender } = this.props;
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
    const Goptions = clientGender.map((x: GetGender) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Client'} destroyOnClose={true}>
        <Form ref={this.props.formRef} initialValues={{
          "id": 0,
          "creationTime": "",
          "creatorUserId": 0,
          "lastModificationTime": "",
          "lastModifierUserId": 0,
          "clientCode": "",
          "clientTypeName": "",
          "clientName": "",
          "clientFatherName": "",
          "clientHusbandName": "",
          "clientAdress": "",
          "clientCNIC": "",
          "clientMobile": "",
          "clientGender": "",
          "clientPhotoPath": "",
          "clientDOB": "2024-10-31",
          "clientRegDate": "",
          "clientFirmCode": "",
          "clientFirmNTN": "",
          "clientFirmSTR": "",
          "clientFirmContactPer": "",
          "clientFirmContactPerNo": "",
          "cityId": 0,
          "branchId": 0,
          "clientTypeId": 0
        }}>
          <Tabs defaultActiveKey={'ClientInfo'} size={'small'} tabBarGutter={64}>
            <TabPane tab={'Client'} key={'ClientInfo'}>
              <Form.Item label={L('Client Name')} {...formItemLayout} name={'clientName'} rules={rules.clientName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Client Code')} {...formItemLayout} name={'clientCode'} >
                <Input />
              </Form.Item>
              <Form.Item label={L('Father Name')} {...formItemLayout} name={'clientFatherName'} rules={rules.clientFatherName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Husband Name')} {...formItemLayout} name={'clientHusbandName'} rules={rules.clientHusbandName}>
                <Input />
              </Form.Item>
              <Form.Item label={L('CNIC')} {...formItemLayout} name={'clientCNIC'} rules={rules.clientCNIC}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Mobile')} {...formItemLayout} name={'clientMobile'} rules={rules.clientMobile}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Reg Date')} {...formItemLayout} name="clientRegDate" rules={rules.clientRegDate}>
                <DatePicker />
              </Form.Item>
              <Form.Item label={L('Adress')} {...formItemLayout} name={'clientAdress'} rules={rules.clientAdress}>
                <Input />
              </Form.Item>
              <Form.Item label={L('City')} {...formItemLayout} name={'cityId'} rules={rules.cityId}>
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
              <Form.Item label={L('Branch')} {...formItemLayout} name={'branchId'} rules={rules.branchId}>
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
              <Form.Item label={L('Client Type')} {...formItemLayout} name={'clientTypeId'} rules={rules.clientTypeId}>
                <Select
                  showSearch
                  placeholder="--select--"
                  options={CLoptions}
                  allowClear
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  } />
              </Form.Item>
              <Form.Item label={L('Gender')} {...formItemLayout} name={'clientGender'} rules={rules.clientGender}>
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
            
              <Form.Item label={L('Firm Code')} {...formItemLayout} name={'clientFirmCode'} rules={rules.clientFirmCode}>
                <Input />
              </Form.Item>
              <Form.Item label={L('NTN No')} {...formItemLayout} name={'clientFirmNTN'} rules={rules.clientFirmNTN}>
                <Input />
              </Form.Item>
              <Form.Item label={L('STR No')} {...formItemLayout} name={'clientFirmSTR'} rules={rules.clientFirmSTR}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Contact Person')} {...formItemLayout} name={'clientFirmContactPer'} rules={rules.clientFirmContactPer}>
                <Input />
              </Form.Item>
              <Form.Item label={L('Phone No')} {...formItemLayout} name={'clientFirmContactPerNo'} rules={rules.clientFirmContactPerNo}>
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
