import * as React from 'react';

import { Input, Modal, Form, Select, Row, Col } from 'antd';
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
  store: CourtStore
}

class CreateOrUpdateCourt extends React.Component<ICreateOrUpdateCourtProps> {
  state = {
    confirmDirty: false,
  };

  handleProvinceChange = async (value: any) => {
    const { store } = this.props;
    store.selectedProvince = value;
    await store.getDivisionsByProvinceId({ id: value });
  };
  handleDivisionChange = async (value: any) => {
    const { store } = this.props;
    store.selectedProvince = value;
    await store.getCityByDivisionId({ id: value });
  };
  handleCityChange = async (value: any) => {
    const { store } = this.props;
    store.selectedProvince = value;
    await store.getTehsilByCityId({ id: value });
  };
  handleForumChange = async (value: any) => {
    const { store } = this.props;
    store.selectedForum = value;
    await store.getCategoryByForumId({ id: value });
  };


  render() {
    const { divisions, cities, tehsils, provinces, forums, forumCats, branches } = this.props;

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
      <Modal visible={visible} width={1000} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Court'} destroyOnClose={true}>
        <Form ref={this.props.formRef} layout='vertical'>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={L('Court Code')} name={'courtCode'} rules={rules.courtCode}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Court Number')} name={'courtNumber'} rules={rules.courtNumber}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Court Description')} name={'courtDescription'} rules={rules.courtDescription}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={L('Court Reader')} name={'courtReader'} rules={rules.courtReader}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Court Reader Number')} name={'courtReaderNumber'} rules={rules.courtReaderNumber}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Court Reader Email')} name={'courtReaderEmail'} rules={rules.courtReaderEmail as []}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={L('Court Ahlmed')} name={'courtAhlmed'} rules={rules.courtAhlmed}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Court Ahlmed Number')} name={'courtAhlmedNumber'} rules={rules.courtAhlmedNumber}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={L('Court Ahlmed Email')} name={'courtAhlmedEmail'} rules={rules.courtAhlmedEmail as []}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label={L('Province')} name={'provinceId'} rules={rules.provinceId}>
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
            </Col>
            <Col span={6}>
              <Form.Item label={L('Division')} name={'divisionId'} rules={rules.divisionId}>
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
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={L('City')} name={'cityId'} rules={rules.cityId}>
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
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={L('Tehsil')} name={'tehsilId'} rules={rules.tehsilId}>
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={L('Forum Name')} name={'forumId'} rules={rules.forumId}>
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
            </Col>
            <Col span={8}>
              <Form.Item label={L('Forum Category Name')} name={'forumCatId'} rules={rules.forumCatId}>
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
            </Col>
            <Col span={8}>
              <Form.Item label={L('Branch Name')} name={'branchId'} rules={rules.branchId}>
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
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCourt;
