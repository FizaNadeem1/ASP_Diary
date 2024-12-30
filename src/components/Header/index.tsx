import './index.less';

import * as React from 'react';

import { Avatar,  Button, Col, Dropdown, Menu, Row, Tooltip } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, LinkOutlined, CreditCardOutlined, CrownOutlined, InfoCircleOutlined, HomeOutlined } from '@ant-design/icons';

import { L } from '../../lib/abpUtility';
// import LanguageSelect from '../LanguageSelect';
import { Link } from 'react-router-dom';

import profilePicture from '../../images/user.png';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import SessionStore from '../../stores/sessionStore';
import { toJS } from 'mobx';

export interface IHeaderProps {
  sessionStore?: SessionStore;
  collapsed?: any;
  toggle?: any;
}
interface State {
  currentInfo: String|undefined;
}
const userDropdownMenu = (
  <Menu>
    <Menu.Item key="2">
      <Link to="/logout">
        <LogoutOutlined />
        <span> {L('Logout')}</span>
      </Link>
    </Menu.Item>
  </Menu>
);
@inject(Stores.SessionStore)
@observer

export class Header extends React.Component<IHeaderProps,State> {
  private _isMounted = false; // Flag to track if the component is mounted

  state: State = {
    currentInfo: ''
  };

  async componentDidMount() {
    this._isMounted = true;

    try {
      await this.props.sessionStore?.getCurrentLoginInformations();
      const currentLoginInfo = await this.props.sessionStore?.currentLogin;

      if (this._isMounted) {
        this.setState({
          currentInfo: toJS(currentLoginInfo?.tenant.tenancyName),
        });
      }
    } catch (error) {
      console.error('Error fetching login information:', error);
    }
  }

  componentWillUnmount() {
    this._isMounted = false; // Prevent state updates when the component is unmounted
  }
  render() {
    return (
      <Row className={'header-container'}>
        <Col style={{ textAlign: 'left' }} span={1}>
          {this.props.collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={this.props.toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={this.props.toggle} />
          )}
        </Col>
        <Col style={{ textAlign: 'left' }} span={15}>
        <Row gutter={[15, 0]}>
          <Col>
            <Tooltip title="Home page">
              <Link to="/causeList">
                <Button type="link" className="btn-home" icon={<HomeOutlined />}>
                  Home page
                </Button>
              </Link>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="About">
              <Link to="/about">
                <Button type="link"  className="btn-about" icon={<InfoCircleOutlined />}>
                  About
                </Button>
              </Link>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="Package">
              <Link to="/package">
                <Button type="link" className="btn-package" icon={<CrownOutlined />}>
                  Package
                </Button>
              </Link>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="Generate Tenant Link">
              <Link to="/linkGenerate">
                <Button type="link"  className="btn-link" icon={<LinkOutlined />}>
                  Generate Tenant Link
                </Button>
              </Link>
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="Subscription">
              <Link to="/subscription">
                <Button type="link" className="btn-subscription" icon={<CreditCardOutlined />}>
                  Subscription
                </Button>
              </Link>
            </Tooltip>
          </Col>
        </Row>
      </Col>
        <Col style={{ padding: '0px 15px 0px 15px', textAlign: 'right' }} span={8}>
          {/* <LanguageSelect /> {'   '} */}
          {/* <Col> */}
            <Button type="primary" shape="round" className="tenant-info">
              {this.state.currentInfo||localStorage.getItem("tenantName")}
            </Button>
          {/* </Col> */}
          <Dropdown overlay={userDropdownMenu} trigger={['click']}>
            {/* <Badge style={{}} count={3}> */}
              <Avatar style={{ height: 24, width: 24,marginLeft:'15px' }} shape="circle" alt={'profile'} src={profilePicture} />
            {/* </Badge> */}
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

export default Header;
