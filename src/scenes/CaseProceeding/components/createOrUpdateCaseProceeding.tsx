import * as React from 'react';

import { Input, Modal, Form, Select, Checkbox, Row, Col, Button, DatePicker } from 'antd';
import { L } from '../../../lib/abpUtility';
import { FormInstance } from 'antd/lib/form';
import { GetProceedings } from '../../../services/caseProceeding/dto/getProceedingOutput';
import { GetBranches } from '../../../services/caseProceeding/dto/getBranchOutput';
import rules from './createOrUpdateCaseProceeding.validation';
import CaseProceedingStore from '../../../stores/CaseProceedingStore';


export interface ICreateOrUpdateCaseProceedingProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
  branches: GetBranches[];
  proceedings: GetProceedings[];
  store: CaseProceedingStore;
  setBenchId:(id: string) => void;

}

class CreateOrUpdateCaseProceeding extends React.Component<ICreateOrUpdateCaseProceedingProps> {
  state = {
    confirmDirty: false,
    isFetchDisabled: true, 
  };
  onFormValuesChange = (_: any, allValues: { branchId: string; caseno: string }) => {
    const { branchId, caseno } = allValues;
    const isFetchDisabled = !(branchId && caseno); // Button enabled only if both values exist
    this.setState({ isFetchDisabled });
  };
  
  getCaseData = async (value: any) => {
    const { store ,setBenchId} = this.props;
    if(value){
      let data = await store.getCaseDataByCaseNo({ id: value });
      
      console.log("getCaseDataByCaseNo", data)
      this.props.formRef.current?.setFieldsValue({
        benchBenchCode: data.benchBenchCode,
        caseMainCaseNo: data.caseMainCaseNo,
        caseMainCaseTitle: data.caseMainCaseTitle,
        caseCaseTitle: data.caseMainCaseTitle,
        "caseMainCaseTypeCaseTypeName":
          data.caseMainCaseTypeCaseTypeName,
        "caseMainFirstPartyName": data.caseMainFirstPartyName,
        "caseMainSecondPartyName": data.caseMainSecondPartyName,
        "caseId": data.caseMainId,
        "previousDate":
          data.previousDate,
        "nexttDate":
          data.nexttDate
       });
       setBenchId(data.benchId.toString())
    }else{
      Modal.error({
        title: "Please select Case no and Branch",
      });
    }
  };

  render() {
    const { branches, proceedings } = this.props;
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
    const Boptions = branches.map((x: GetBranches) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    const Poptions = proceedings.map((x: GetProceedings) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });

    return (
      <Modal visible={visible} width={1000} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'CaseProceeding'} destroyOnClose={true}>
        <Form ref={this.props.formRef} initialValues={{
          branchId: '',
          caseno: '',
          benchId:''
        }}
        layout='vertical'
        onValuesChange={this.onFormValuesChange}>
          <Row gutter={16} >
            <Col span={12}>
              <Form.Item
                label={L(this.props.modalType!=='edit'?"Case No":'Case No')}
                name={this.props.modalType!=='edit'?"caseCaseNo":'caseno'}
                rules={rules.caseno}
              >
                <Input disabled={this.props.modalType!=='edit'} />
              </Form.Item>
            </Col>
            <Col span={this.props.modalType==='edit'?8:12}>
              <Form.Item
                label={L('Branch')}
                name="branchId"
                rules={rules.branchId}
              >
                <Select
                  showSearch
                  placeholder="--select--"
                  options={Boptions}
                  allowClear
                  disabled={this.props.modalType!=='edit'}
                  filterOption={(input, option) =>
                    (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            {this.props.modalType==='edit'&&<Col span={4} style={{ marginTop:'30px' }}>
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={() => this.getCaseData(this.props.formRef.current?.getFieldValue("caseCaseNo")||this.props.formRef.current?.getFieldValue("caseno"))}
                disabled={this.state.isFetchDisabled}
                // disabled={this.props.formRef.current?.getFieldValue("branchId") || this.props.formRef.current?.getFieldValue("caseno")}
              // loading={loading}
              >
                Fetch Data
              </Button>
            </Col>}
          </Row>
          <Row gutter={16}>
            <Col span={12}>
          <Form.Item label={L('Case Title')}   name={'caseCaseTitle'} >
            <Input disabled />
          </Form.Item>
            </Col>
            <Col span={12}>
          <Form.Item label={L('Case Main No')}   name={'caseId'} rules={rules.caseId}>
            <Input disabled />
          </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
          <Form.Item label={L('Case Type')}   name={'caseMainCaseTypeCaseTypeName'} >
            <Input disabled />
          </Form.Item>
            </Col>
            <Col span={12}>
          <Form.Item label={L('First Party Name')}   name={'caseMainFirstPartyName'}>
            <Input  disabled/>
          </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
          <Form.Item label={L('Second Party Name')}   name={'caseMainSecondPartyName'}>
            <Input disabled />
          </Form.Item>
            </Col>
            <Col span={12}>
          <Form.Item label={L('Bench Code')}   name={'benchBenchCode'} >
            <Input disabled />
          </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} >
  <Col span={4}>
    <Form.Item label={L('Previous Date')} name={'previousDate'} rules={rules.previousDate}>
      <DatePicker disabled />
    </Form.Item>
  </Col>
  <Col span={4}>
    <Form.Item label={L('Current Date')} name={'currentDate'} rules={rules.currentDate}>
      <DatePicker />
    </Form.Item>
  </Col>
  <Col span={4}>
    <Form.Item label={L('Next Date')} name={'nexttDate'} rules={rules.nexttDate}>
      <DatePicker />
    </Form.Item>
  </Col>
  <Col span={12}>
  <Form.Item label={L('Proceeding')}   name={'proceedingStatusId'} rules={rules.proceedingStatusId}>
            <Select
              showSearch
              placeholder="--select--"
              options={Poptions}
              allowClear
              filterOption={(input, option) =>
                (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item></Col>
</Row>
          <Row gutter={16} >
            <Col span={4}>
              <Form.Item   name={'caseRunning'} valuePropName={'checked'}>
                <Checkbox>{L('Case Running')}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item   name={'caseTransfer'} valuePropName={'checked'}>
                <Checkbox>{L('Case Transfer')}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item   name={'caseFinish'} valuePropName={'checked'}>
                <Checkbox>{L('Case Finish')}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}><Form.Item label={L('Gaff No')}   name={'caseGaffNo'} rules={rules.caseGaffNo}>
            <Input />
          </Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
            <Form.Item label={L('Gen No')}   name={'caseGenNo'} rules={rules.caseGenNo}>
            <Input />
          </Form.Item>
            </Col>
            <Col span={8}>
          <Form.Item label={L('Short Order')}   name={'proceedingShortOrder'} rules={rules.proceedingShortOrder}>
            <Input />
          </Form.Item>
            </Col>
            <Col span={8}>
          <Form.Item label={L('Notes')}   name={'proceedingNotes'} rules={rules.proceedingNotes}>
            <Input />
          </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateCaseProceeding;
