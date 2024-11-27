import * as React from 'react';

import { Input, Modal, Form, Select, Checkbox } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import { GetProvinces } from '../../../services/lawyer/dto/getProvinceOutput';
import { GetCities } from '../../../services/lawyer/dto/getCityOutput';
import { GetDivisions } from '../../../services/lawyer/dto/getDivisionOutput';
import { GetTehsils } from '../../../services/lawyer/dto/getTehsilOutput';
import { GetSpecialities } from '../../../services/lawyer/dto/getSpecialityOutput';
import { GetBranches } from '../../../services/lawyer/dto/getBranchOutput';
import LawyerStore from '../../../stores/lawyerStore';
import rules from './createOrUpdateLawyer.validation';



export interface ICreateOrUpdateLawyerProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  provinces: GetProvinces[];
  cities: GetCities[];
  divisions: GetDivisions[];
  tehsils: GetTehsils[];
  speciality: GetSpecialities[];
  branches: GetBranches[];
//   selectedCity:string
// selectedDivision:string
// selectedProvince:string
store:LawyerStore
}

class CreateOrUpdateLawyer extends React.Component<ICreateOrUpdateLawyerProps> {
  state = {
    confirmDirty: false,
  };

  handleProvinceChange = async(value:any) => {
    const { store } = this.props;
    store.selectedProvince = value;
  await  store.getDivisionsByProvinceId({id:value});
  };
  handleDivisionChange = async(value:any) => {
    const { store } = this.props;
    store.selectedProvince = value;
  await  store.getCityByDivisionId({id:value});
  };
  handleCityChange = async(value:any) => {
    const { store } = this.props;
    store.selectedProvince = value;
  await  store.getTehsilByCityId({id:value});
  };


  render() {
    const { divisions,cities,tehsils,provinces,speciality,branches } = this.props;
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
    const Doptions = divisions.map((x: GetDivisions) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Coptions = cities.map((x: GetCities) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); const Poptions = provinces.map((x: GetProvinces) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); const Toptions = tehsils.map((x: GetTehsils) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); const Boptions = branches.map((x: GetBranches) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); const Soptions = speciality.map((x: GetSpecialities) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); 

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Lawyer'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Form.Item label={L('lawyerName')} {...formItemLayout} name={'lawyerName'} rules={rules.lawyerName}>
            <Input />
          </Form.Item>
          <Form.Item label={L('lawyerMobile')} {...formItemLayout} name={'lawyerMobile'} rules={rules.lawyerMobile}>
            <Input />
          </Form.Item><Form.Item label={L('lawyerLiscene')} {...formItemLayout} name={'lawyerLiscene'} rules={rules.lawyerLiscene}>
            <Input />
          </Form.Item><Form.Item label={L('lawyerAdress')} {...formItemLayout} name={'lawyerAdress'} rules={rules.lawyerAdress}>
            <Input />
          </Form.Item><Form.Item label={L('lawyerNotes')} {...formItemLayout} name={'lawyerNotes'} rules={rules.lawyerNotes}>
            <Input />
          </Form.Item><Form.Item label={L('lawyerPracticingBar')} {...formItemLayout} name={'lawyerPracticingBar'} rules={rules.lawyerPracticingBar }>
            <Input />
          </Form.Item><Form.Item label={L('lawyerStatus')} {...formItemLayout} name={'lawyerStatus'}valuePropName={'checked'} >
          <Checkbox></Checkbox>
          </Form.Item><Form.Item label={L('lawyerLicRegDate')} {...formItemLayout} name={'lawyerLicRegDate'}>
            <Input />
          </Form.Item><Form.Item label={L('lawyerLicExpDate')} {...formItemLayout} name={'lawyerLicExpDate'} >
            <Input />
          </Form.Item>
          <Form.Item label={L('lawyerLicExpDate')} {...formItemLayout} name={'lawyerLicExpDate'} >
            <Input />
          </Form.Item>
          <Form.Item label={L('lawyerFirmRegDate')} {...formItemLayout} name={'lawyerFirmRegDate'} rules={rules.lawyerFirmRegDate}>
            <Input />
          </Form.Item><Form.Item label={L('lawyerResigDate')} {...formItemLayout} name={'lawyerResigDate'} rules={rules.lawyerResigDate}>
            <Input />
          </Form.Item>
          <Form.Item label={L('provinceId')} {...formItemLayout} name={'provinceId'} rules={rules.provinceId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Poptions}
              onChange={this.handleProvinceChange} 
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('divisionId')} {...formItemLayout} name={'divisionId'} rules={rules.divisionId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Doptions}
              allowClear
              onChange={this.handleDivisionChange} 
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item><Form.Item label={L('cityId')} {...formItemLayout} name={'cityId'} rules={rules.cityId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Coptions}
              allowClear
              onChange={this.handleCityChange} 
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item><Form.Item label={L('tehsilId')} {...formItemLayout} name={'tehsilId'} rules={rules.tehsilId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Toptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('lawyerSpeacialityId')} {...formItemLayout} name={'lawyerSpeacialityId'} rules={rules.lawyerSpeacialityId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Soptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('branchId')} {...formItemLayout} name={'branchId'} rules={rules.branchId}>
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
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateLawyer;
