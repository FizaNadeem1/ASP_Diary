import * as React from 'react';

import { Input, Modal, Form, Select, Checkbox, Button, Col, Row, Table,  } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import rules from './createOrUpdateBench.validation';
import { GetBranches } from '../../../services/bench/dto/getBranchOutput';
import { GetCourts } from '../../../services/bench/dto/getCourtOutput';
import { GetPresidingOfficers } from '../../../services/bench/dto/getPresidingOfficerOutput';
import { GetColorByIndex } from '../../../components/Helper/GetColorByIndex';
import moment from 'moment';

interface Officer {
  branchId: string;
  branchName: string;
  presidingOfficerId: string;
  presidingOfficerName: string;
}
interface State {
  confirmDirty: boolean;
  isFetchDisabled: boolean;
  benchStartDate: Date;
  benchEndDate: Date;
}
export interface ICreateOrUpdateBenchProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  branches: GetBranches[];
  courts: GetCourts[];
  presidingOfficers: GetPresidingOfficers[];
  officerList: Officer[];
  setOfficerList: (newOfficer: Officer) => void;
}

class CreateOrUpdateBench extends React.Component<ICreateOrUpdateBenchProps, State> {
  state = {
    confirmDirty: false,
    isFetchDisabled: false,
    benchStartDate:new Date(),
  benchEndDate:new Date(),
  };

  onFormValuesChange = (_: any, allValues: { branchId: string; presidingOfficerId: string }) => {
    const { branchId, presidingOfficerId } = allValues;
    const isFetchDisabled = !(branchId || presidingOfficerId); // Button enabled only if both values exist
    this.setState({ isFetchDisabled });

  };

  render() {
    const { branches, courts, presidingOfficers, officerList } = this.props;
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

    const { visible, onCancel, onCreate, } = this.props;
    const handleAddOfficer = async () => {
      let branchId = this.props.formRef.current?.getFieldValue("branchId")
      let presidingOfficerId = this.props.formRef.current?.getFieldValue("presidingOfficerId")
      if (branchId && presidingOfficerId) {
        const officerExists = officerList.some(
          (officer) =>
            officer.presidingOfficerId === presidingOfficerId
        );

        if (officerExists) {
          alert("This officer has already been added.");
          return;
        }

        const selectedBranch = branches.find(
          (branch) => branch.value === branchId.toString()
        );
        const selectedOfficer = presidingOfficers.find(
          (officer) =>
            officer.value === presidingOfficerId.toString()
        );

        const officer = {
          branchId: branchId,
          branchName: selectedBranch
            ? selectedBranch.displayText
            : "Unknown Branch",
          presidingOfficerId: presidingOfficerId,
          presidingOfficerName: selectedOfficer
            ? selectedOfficer.displayText
            : "Unknown Officer",
        };
        this.props.setOfficerList(officer);
      } else {
        alert("Please select both Branch and Presiding Officer.");
      }



    };

    const Boptions = branches.map((x: GetBranches) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Coptions = courts.map((x: GetCourts) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const PRoptions = presidingOfficers.map((x: GetPresidingOfficers) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const columns = [
      {
        title: L('branchName'), dataIndex: 'branchName', key: 'branchName', width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      { title: L('presidingOfficerName'), dataIndex: 'presidingOfficerName', key: 'presidingOfficerName', width: 'auto', render: (text: string) => <div>{text}</div> },
    ];

    return (
      <Modal visible={visible} width={800} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Bench'} destroyOnClose={true}>
        <Form ref={this.props.formRef}
          initialValues={{
            branchId: '',
            presidingOfficerId: '',
            benchStartDate: moment().format('MMMM Do YYYY'),
            benchEndDate: moment().format('MMMM Do YYYY'),
          }}
          onValuesChange={this.onFormValuesChange}>

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
          <Form.Item label={L('courtId')} {...formItemLayout} name={'courtId'} rules={rules.courtId}>
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
          <Form.Item label={L('benchCode')} {...formItemLayout} name={'benchCode'} rules={rules.benchCode}>
            <Input />
          </Form.Item>
          <Form.Item label={L('benchOfficerNo')} {...formItemLayout} name={'benchOfficerNo'} rules={rules.benchOfficerNo}>
            <Input />
          </Form.Item>
          <Form.Item label={L('benchStartDate')} {...formItemLayout} name={'benchStartDate'} rules={rules.benchStartDate}>
          <input
    type="date"
    className="form-control"
    id="benchStartDate"
    name="benchStartDate"
    onChange={(e) => {
      this.setState({ benchStartDate: new Date(e.target.value) }); // Convert string to Date
    }}
    value={this.state.benchStartDate ? this.state.benchStartDate.toISOString().split('T')[0] : ''} // Format for input
    required
  />
          </Form.Item>
          <Form.Item label={L('benchEndDate')} {...formItemLayout} name={'benchEndDate'} rules={rules.benchEndDate}>
          <input
    type="date"
    className="form-control"
    id="benchEndDate"
    name="benchEndDate"
    onChange={(e) => {
      this.setState({ benchEndDate: new Date(e.target.value) }); // Convert string to Date
    }}
    value={this.state.benchEndDate ? this.state.benchEndDate.toISOString().split('T')[0] : ''} // Format for input
    required
  />
          </Form.Item>
          <Form.Item label={L('benchStatus')} {...tailFormItemLayout} name={'benchStatus'} valuePropName={'checked'}>
            <Checkbox></Checkbox>
          </Form.Item>

          <Row gutter={24} style={{ marginLeft: '100px' }}>
            <Col span={16}>
              <Form.Item label={L('presidingOfficerId')} {...formItemLayout} name={'presidingOfficerId'} rules={rules.presidingOfficerId}>
                <Select
                  showSearch
                  placeholder="--select--"
                  options={PRoptions}
                  allowClear
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: 'flex', }}>
              <Button
                type="primary"
                onClick={handleAddOfficer}
                disabled={this.state.isFetchDisabled}
              >
                Add
              </Button>
            </Col>
          </Row>
          <Table
            rowKey={(record) => record.presidingOfficerId}
            bordered={true}
            onRow={(record, index) => ({
              style: {
                backgroundColor: GetColorByIndex({ index }), // Set background color
              },
            })}
            columns={columns}
            size='small'
            pagination={false}
            loading={this.state.isFetchDisabled ? true : false}
            dataSource={officerList === undefined ? [] : officerList}
          />
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateBench;
