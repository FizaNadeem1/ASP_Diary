import * as React from 'react';

import { Button, Card, Col,  Input,  Modal, Row, Table,  } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import CreateOrUpdateUser from './components/createOrUpdateCategory';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined } from '@ant-design/icons';
import { GetColorByIndex } from '../../components/Helper/GetColorByIndex';
import ForumCategoryStore from '../../stores/forumCategoryStore';

export interface ICategoryProps {
  forumCategoryStore: ForumCategoryStore
}

export interface ICategoryState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  categoryId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.ForumCatogoryStore)
@observer
class User extends AppComponentBase<ICategoryProps, ICategoryState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    categoryId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.forumCategoryStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
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
      await this.props.forumCategoryStore.createCategory();
    } else {
      await this.props.forumCategoryStore.get(entityDto);
    }

    this.setState({ categoryId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.forumCategoryStore.editCategory });
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you Want to delete these items?',
      onOk() {
        self.props.forumCategoryStore.delete(input);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.categoryId === 0) {
        await this.props.forumCategoryStore.create(values);
      } else {
        await this.props.forumCategoryStore.update({ ...values, id: this.state.categoryId });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  public render() {
    const { categories } = this.props.forumCategoryStore;
    const columns = [
      { title: L('forumCategoryName'), dataIndex: 'forumCategoryName', key: 'forumCategoryName', width: 150, render: (text: string) => <div>{text}</div> },
      { title: L('forumName'), dataIndex: 'forumName', key: 'forumName', width: 150, render: (text: string) => <div>{text}</div> },
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
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            {' '}
            <h2>{L('Categories')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
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
            <Table
              rowKey={(record) => record.id.toString()}
              onRow={(record, index) => ({
                style: {
                  backgroundColor: GetColorByIndex({ index }), // Set background color
                },
              })}
              size="small"
              bordered={true}
              columns={columns}
              pagination={{ pageSize: 10, total: categories === undefined ? 0 : categories.totalCount, defaultCurrent: 1 }}
              loading={categories === undefined ? true : false}
              dataSource={categories === undefined ? [] : categories.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateUser
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.categoryId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default User;
