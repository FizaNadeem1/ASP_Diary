import * as React from 'react';

import { Button, Card, Col, Input, Modal, Row, Select, Table, } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CreateOrUpdateForum from './components/createOrUpdateForum';
import ForumStore from '../../stores/forumStore';
import { GetColorByIndex } from '../../components/Helper/GetColorByIndex';
import './index.less'
export interface IForumProps {
  forumStore: ForumStore;
}

export interface IForumState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  forumId: number;
  filter: string;
  currentPage: number
}

const confirm = Modal.confirm;
const Search = Input.Search;
const { Option } = Select;

@inject(Stores.ForumStore)
@observer
class Forum extends AppComponentBase<IForumProps, IForumState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    forumId: 0,
    filter: '',
    currentPage: 1
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.forumStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.forumStore.createForum();
    } else {
      await this.props.forumStore.get(entityDto);
    }

    this.setState({ forumId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.forumStore.editForum });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.forumStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.forumId === 0) {
        await this.props.forumStore.create(values);
      } else {
        await this.props.forumStore.update({ ...values, id: this.state.forumId });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  handleMaxResultCountChange = (value: number) => {
    this.setState({ maxResultCount: value });
    this.setState({ currentPage: 1 }); // Reset to the first page
  };

  handleNextPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  handlePrevPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage > 1 ? prevState.currentPage - 1 : 1,
    }));
  };

  public render() {
    const { forums } = this.props.forumStore;
    const columns = [
      {
        title: L('forumName'),
        dataIndex: 'forumName',
        key: 'forumName',
        width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
      {
        title: L('forumDescription'),
        dataIndex: 'forumDescription',
        key: 'forumDescription',
        width: 'auto',
        render: (text: string) => <div>{text}</div>
      },
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
            <h2>{L('Forums')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 2, offset: 21 }}
            xl={{ span: 2, offset: 21 }}
            xxl={{ span: 2, offset: 21 }}
          >
            <Button type="primary"  icon={<PlusOutlined />} onClick={() => this.createOrUpdateModalOpen({ id: 0 })} >
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
            <div>
              {/* Custom Header Row */}
              <Row
        gutter={16}
        style={{
          backgroundColor: 'black', // Set background color to black
          padding: '10px', // Optional: Add padding to give space around the elements
        }}
      >
        <Col span={12}>
          <h4 style={{ color: 'white' }}> {L('All Forums')}</h4> {/* Change text color to white for visibility */}
        </Col>

        <Col span={12} style={{ textAlign: 'right' }}>
          {/* Circular dropdown */}
          <Select
            value={this.state.maxResultCount}
            onChange={this.handleMaxResultCountChange}
            style={{
              width: '60px',
              // height: '50px',
              borderRadius: '100%', // Circle the outer layout
              textAlign: 'center', // Center the value text inside the circle
              padding: 0,
              lineHeight: '60px', // Vertically center text inside the circle
              display: 'inline-block', // Ensure it fits nicely
              fontSize: '16px', // Adjust font size for proper fit
            }}
          >
            {[10, 25, 100].map((count) => (
              <Option key={count} value={count}>
                {count}
              </Option>
            ))}
          </Select>

          {/* Circular Buttons */}
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            style={{ marginLeft: 10 }}
          />
          <Button
            type="default"
            shape="circle"
            icon={<SearchOutlined />}
            style={{ marginLeft: 10 }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            style={{ marginLeft: 10 }}
          />
        </Col>
      </Row>              {/* Ant Design Table */}
              <Table
                rowKey={(record) => record.id.toString()}
                onRow={(record, index) => ({
                  style: {
                    backgroundColor: GetColorByIndex({ index }), // Set background color
                  },
                })}
                // className="custom-header-style"
                size="small"
                bordered={true}
                columns={columns}
                pagination={{ pageSize: 10, total: forums === undefined ? 0 : forums.totalCount, defaultCurrent: 1 }}
                loading={forums === undefined ? true : false}
                dataSource={forums === undefined ? [] : forums.items}
                onChange={this.handleTableChange}
              />

              {/* Custom Footer Navigation */}
              <Row justify="space-between" style={{ marginTop: 16 }}>
                <Col>
                  <Button
                    type="default"
                    onClick={this.handlePrevPage}
                    disabled={this.state.currentPage === 1}
                  >
                    Previous
                  </Button>
                </Col>
                <Col>
                  <Button type="default" onClick={this.handleNextPage}>
                    Next
                  </Button>
                </Col>
              </Row>
            </div>

          </Col>
        </Row>
        <CreateOrUpdateForum
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.forumId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default Forum;
