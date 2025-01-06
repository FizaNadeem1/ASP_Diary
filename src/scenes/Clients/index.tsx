import * as React from 'react';

import { Button, Card, Col, Input, Modal, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined } from '@ant-design/icons';
import ClientStore from '../../stores/clientStore';
import CreateOrUpdateClient from './components/createOrUpdateClient';
import { GetColorByIndex } from '../../components/Helper/GetColorByIndex';
import moment from 'moment';
import Avatar from "../../assets/images/formAvatar.png";

export interface IClientProps {
  clientStore: ClientStore;
}

export interface IClientState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  clientId: number;
  filter: string;
  image: File | null|string;
  prevImg: null|string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.ClientStore)
@observer
class Client extends AppComponentBase<IClientProps, IClientState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    clientId: 0,
    filter: '',
    image: null,
    prevImg:null,
  };

  async componentDidMount() {
    await this.getAll();
  }
  setImage = (img: File) => {
    this.setState({ image: img });
  };
  async getAll() {
    await this.props.clientStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      await this.props.clientStore.createClient();
      await this.props.clientStore.getBranches();
      await this.props.clientStore.getCities();
      await this.props.clientStore.getClientTypes();
      await this.props.clientStore.getGender();
    } else {
      await this.props.clientStore.get(entityDto);
      await this.props.clientStore.getBranches();
      await this.props.clientStore.getCities();
      await this.props.clientStore.getClientTypes();
      await this.props.clientStore.getGender();
    }

    this.setState({ clientId: entityDto.id });
    this.Modal();

    // setTimeout(() => {
    //   this.formRef.current?.setFieldsValue({ ...this.props.clientStore.editClient });
    // }, 100);
    setTimeout(() => {
      let imgPath=this.formRef.current?.getFieldValue("clientPhotoPath")
    console.log("img path",imgPath)
      const formValues = {
        ...this.props.clientStore.editClient,
        clientRegDate: moment(this.props.clientStore.editClient.clientRegDate),
      };
      this.formRef.current?.setFieldsValue(formValues);
      this.setState({image:this.props.clientStore.editClient.clientPhotoPath,prevImg:this.props.clientStore.editClient.clientPhotoPath})
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.clientStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      console.log("create client values", values)
      const clientTypeName = this.props.clientStore.clientTypes.find((item) => item.value === values.clientTypeId);

      if (this.state.clientId === 0) {
        const formdata = new FormData();

        // Check if `this.state.image` is a File object
        if (this.state.image && typeof this.state.image === 'object' && 'size' in this.state.image && 'type' in this.state.image) {
          formdata.append("profileImage", this.state.image as File);
        } else {
          console.error("State image is not a valid File object.");
        }
        console.log("FormData before fetch:", formdata);
        // Send the image to the backend
        fetch(`http://localhost:8888/saveImage`, {
          method: "POST",
          body: formdata,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(async (data) => {
            console.log("Response data:", data);
            this.setState({ image: data.newImage });
            await this.props.clientStore.create({ ...values, clientTypeName: clientTypeName?.displayText, clientPhotoPath: data.newImage, });
            await this.getAll();
            this.setState({ modalVisible: false });
            form!.resetFields();
          })
          .catch((error) => console.log("Error:", error));

      } else {
        const formdata = new FormData();

        // Check if `this.state.image` is a File object
        if (this.state.image && typeof this.state.image === 'object' && 'size' in this.state.image && 'type' in this.state.image) {
          formdata.append("profileImage", this.state.image as File);
        
          // Only append prevProfileImage if it has a valid value
          if (this.state.prevImg) {
            formdata.append("prevProfileImage", this.state.prevImg);
          } else {
            console.warn("Previous profile image is null or undefined.");
          }
        } else {
          console.error("State image is not a valid File object.");
        }   
        console.log("FormData before fetch:", formdata);
        // Send the image to the backend
        fetch(`http://localhost:8888/saveImage`, {
          method: "POST",
          body: formdata,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(async (data) => {
            console.log("Response data:", data);
            this.setState({ image: data.newImage });
            await this.props.clientStore.update({ ...values, id: this.state.clientId,clientPhotoPath: data.newImage, clientTypeName: clientTypeName?.displayText });
            await this.getAll();
            this.setState({ modalVisible: false });
            form!.resetFields();
          })
          .catch((error) => console.log("Error:", error));
      }
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  public render() {
    const { clients } = this.props.clientStore;
    const columns = [
      { title: L('Profile'), dataIndex: 'clientPhotoPath', key: 'clientPhotoPath', width: 'auto', render: (text: string) => <div><img src={`http://localhost:8888${text}` || Avatar} alt="" style={{ height: '25px', width: '25px', borderRadius: 100 }} /></div> },
      { title: L('Client Name'), dataIndex: 'clientName', key: 'clientName', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Client Code'), dataIndex: 'clientCode', key: 'clientCode', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Client Type'), dataIndex: 'clientTypeClientTypeName', key: 'clientTypeClientTypeName', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('Branch Name'), dataIndex: 'branchBranchName', key: 'branchBranchName', width: 'auto', render: (text: string) => <div>{text}</div> },
      { title: L('City Name'), dataIndex: 'cityCityName', key: 'cityCityName', width: 'auto', render: (text: string) => <div>{text}</div> },
      {
        title: L('Actions'),
        key: 'actions',
        width: 150,
        render: (text: string, item: any) => (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              style={{ marginRight: '5px' }}
              onClick={() => this.createOrUpdateModalOpen({ id: item.id })}
            >
              {L('Edit')}
            </Button>
            <Button
              color="danger"
              onClick={() => this.delete({ id: item.id })}
            >
              {L('Delete')}
            </Button>
          </div>
        ),
      },
    ];

    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 1, offset: 0 }}
            xl={{ span: 1, offset: 0 }}
            xxl={{ span: 1, offset: 0 }}
          >
            {' '}
            <h2>{L('clients')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 2, offset: 21 }}
            xl={{ span: 2, offset: 21 }}
            xxl={{ span: 2, offset: 21 }}
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} >
              {L('Create new')}</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 0 }}>
            <Search placeholder={this.L('Filter')} onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <Row
              gutter={16}
              style={{
                backgroundColor: 'black', // Set background color to black
                padding: '10px', // Optional: Add padding to give space around the elements
              }}
            >
              <Col span={12}>
                <h4 style={{ color: 'white' }}> {L('All Clients')}</h4> {/* Change text color to white for visibility */}
              </Col>
            </Row>
            <Table
              rowKey={(record) => record.id.toString()}
              bordered={true}
              onRow={(record, index) => ({
                style: {
                  backgroundColor: GetColorByIndex({ index }), // Set background color
                },
              })}
              columns={columns}
              size='small'
              pagination={{ pageSize: 10, total: clients === undefined ? 0 : clients.totalCount, defaultCurrent: 1 }}
              loading={clients === undefined ? true : false}
              dataSource={clients === undefined ? [] : clients.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateClient
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.clientId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          branches={this.props.clientStore.branches}
          cities={this.props.clientStore.cities}
          clientTypes={this.props.clientStore.clientTypes}
          clientGender={this.props.clientStore.clientGender}
          store={this.props.clientStore}
          image={this.state.image} setImage={this.setImage}
        />
      </Card>
    );
  }
}

export default Client;
