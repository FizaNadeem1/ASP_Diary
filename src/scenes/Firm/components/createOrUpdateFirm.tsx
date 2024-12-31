import * as React from 'react';

import { Input, Modal, Form, Select, Checkbox, Row, Col } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createOrUpdateFirm.validation';
import { GetTimeZone } from '../../../services/firm/dto/getTimeZoneOutput';
import { GetCities } from '../../../services/firm/dto/getCityOutput';


export interface ICreateOrUpdateFirmProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  cities: GetCities[];
  timeZone: GetTimeZone[];
}

class CreateOrUpdateFirm extends React.Component<ICreateOrUpdateFirmProps> {
  state = {
    confirmDirty: false,
  };



  render() {
    const { cities, timeZone } = this.props;
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 8 },
    //     sm: { span: 8 },
    //     md: { span: 8 },
    //     lg: { span: 8 },
    //     xl: { span: 8 },
    //     xxl: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 16 },
    //     sm: { span: 16 },
    //     md: { span: 16 },
    //     lg: { span: 16 },
    //     xl: { span: 16 },
    //     xxl: { span: 16 },
    //   },
    // };
    // const tailFormItemLayout = {
    //   labelCol: {
    //     xs: { span: 8 },
    //     sm: { span: 8 },
    //     md: { span: 8 },
    //     lg: { span: 8 },
    //     xl: { span: 8 },
    //     xxl: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 16 },
    //     sm: { span: 16 },
    //     md: { span: 16 },
    //     lg: { span: 16 },
    //     xl: { span: 16 },
    //     xxl: { span: 16 },
    //   },
    // };


    const { visible, onCancel, onCreate } = this.props;
    const cityOptions = cities.map((x: GetCities) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const firmOptions = timeZone.map((x: GetTimeZone) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={1000} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Firm'} destroyOnClose={true}>
        <Form ref={this.props.formRef} layout='vertical'>
          <Row gutter={16} align='middle'>
            <Col span={8}>
              <Form.Item label={L('Firm Name')} name={'firmName'} rules={rules.firmName}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Firm Owner')} name={'firmOwner'} rules={rules.firmOwner}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Firm Code')} name={'firmCode'} rules={rules.firmCode}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label={L('Contact No')} name={'firmContactNo'} rules={rules.firmContactNo}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={L('Valid Email')} name={'firmContactEmail'} rules={rules.firmContactEmail as []}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={L('Contact Person')} name={'firmContactPerson'} rules={rules.firmContactPerson}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={L('Person No')} name={'firmContactPersonNo'} rules={rules.firmContactPersonNo}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={L('Local Adress')} name={'firmAdress'} rules={rules.firmAdress}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={L('Wesite')} name={'firmWesite'} rules={rules.firmWesite}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={L('Allowed Cases')} name={'noOfCases'} rules={rules.noOfCases}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Allowed Lawyers')} name={'noOfLawyers'} rules={rules.timeZone}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Allowed Branches')} name={'noOfBranches'} rules={rules.noOfBranches}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item label={L('City')} name={'cityId'} rules={rules.cityId}>
                <Select
                  showSearch
                  placeholder="--select--"
                  options={cityOptions}
                  allowClear
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label={L('Time Zone (GMT)')} name={'timeZone'} rules={rules.noOfLawyers}>
                <Select
                  showSearch
                  placeholder="--select--"
                  options={firmOptions}
                  allowClear
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label={L('Admin Panel Access')} name={'adminPanelAccess'} valuePropName={'checked'}>
                <Checkbox ></Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateFirm;
