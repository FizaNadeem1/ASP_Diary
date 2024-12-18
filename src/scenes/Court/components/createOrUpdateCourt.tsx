import * as React from 'react';

import { Input, Modal, Form, Select } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import { GetDivisions } from '../../../services/court/dto/getDivisionOutput';
import rules from './createOrUpdateCourt.validation';
import { GetProvinces } from '../../../services/court/dto/getProvinceOutput';
import { GetCities } from '../../../services/court/dto/getCityOutput';
import { GetTehsils } from '../../../services/court/dto/getTehsilOutput';
import { GetForums } from '../../../services/court/dto/getForumOutput';
import { GetForumCategories } from '../../../services/court/dto/getForumCategoryOutput';
import { GetBranches } from '../../../services/court/dto/getBranchOutput';
import CourtStore from '../../../stores/courtStore';



export interface ICreateOrUpdateCourtProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  provinces: GetProvinces[];
  cities: GetCities[];
  divisions: GetDivisions[];
  tehsils: GetTehsils[];
  forums: GetForums[];
  forumCats: GetForumCategories[];
  branches: GetBranches[];
//   selectedCity:string
// selectedDivision:string
// selectedProvince:string
store:CourtStore
}

class CreateOrUpdateCourt extends React.Component<ICreateOrUpdateCourtProps> {
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
  handleForumChange = async(value:any) => {
    const { store } = this.props;
    store.selectedForum = value;
  await  store.getCategoryByForumId({id:value});
  };


  render() {
    const { divisions,cities,tehsils,provinces,forums,forumCats,branches } = this.props;
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
    }); const Foptions = forums.map((x: GetForums) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    }); const FCoptions = forumCats.map((x: GetForumCategories) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Court'} destroyOnClose={true}>
        <Form ref={this.props.formRef}>
          <Form.Item label={L('Court Code')} {...formItemLayout} name={'courtCode'} rules={rules.courtCode}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Court Description')} {...formItemLayout} name={'courtDescription'} rules={rules.courtDescription}>
            <Input />
          </Form.Item><Form.Item label={L('Court Number')} {...formItemLayout} name={'courtNumber'} rules={rules.courtNumber}>
            <Input />
          </Form.Item><Form.Item label={L('Court Reader')} {...formItemLayout} name={'courtReader'} rules={rules.courtReader}>
            <Input />
          </Form.Item><Form.Item label={L('Court Reader Number')} {...formItemLayout} name={'courtReaderNumber'} rules={rules.courtReaderNumber}>
            <Input />
          </Form.Item><Form.Item label={L('Court Reader Email')} {...formItemLayout} name={'courtReaderEmail'} rules={rules.courtReaderEmail as []}>
            <Input />
          </Form.Item><Form.Item label={L('Court Ahlmed')} {...formItemLayout} name={'courtAhlmed'} rules={rules.courtAhlmed}>
            <Input />
          </Form.Item><Form.Item label={L('Court Ahlmed Number')} {...formItemLayout} name={'courtAhlmedNumber'} rules={rules.courtAhlmedNumber}>
            <Input />
          </Form.Item><Form.Item label={L('Court Ahlmed Email')} {...formItemLayout} name={'courtAhlmedEmail'} rules={rules.courtAhlmedEmail as []}>
            <Input />
          </Form.Item>
          <Form.Item label={L('Province')} {...formItemLayout} name={'provinceId'} rules={rules.provinceId}>
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
          <Form.Item label={L('Division')} {...formItemLayout} name={'divisionId'} rules={rules.divisionId}>
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
          </Form.Item><Form.Item label={L('City')} {...formItemLayout} name={'cityId'} rules={rules.cityId}>
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
          </Form.Item><Form.Item label={L('Tehsil')} {...formItemLayout} name={'tehsilId'} rules={rules.tehsilId}>
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
          <Form.Item label={L('Forum Name')} {...formItemLayout} name={'forumId'} rules={rules.forumId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Foptions}
              onChange={this.handleForumChange} 
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('Forum Category Name')} {...formItemLayout} name={'forumCatId'} rules={rules.forumCatId}>
            <Select
              showSearch
              placeholder="--select--"
              options={FCoptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label={L('Branch Name')} {...formItemLayout} name={'branchId'} rules={rules.branchId}>
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

export default CreateOrUpdateCourt;
