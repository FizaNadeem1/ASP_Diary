import React, { Component } from 'react';
import { Button, Card, Input, Row,  Tooltip, message } from 'antd';
import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import Stores from '../../stores/storeIdentifier';
import { inject, observer } from 'mobx-react';
import SessionStore from '../../stores/sessionStore';
import http from '../../services/httpService';

interface State {
  generatedLink: string;
  isBlinking: boolean;
}
export interface ILinkProps {
  sessionStore?: SessionStore;
  history: any;
  location: any;
  //   stripe:any;
  // elements:any;
}
@inject(Stores.SessionStore)
@observer
class LinkedTenant extends Component<ILinkProps, State> {
  state = {
    generatedLink:'',
    isBlinking: false,
  };
  
  handleGenerateLink = async() => {
    let result = await http.get('api/services/app/LinkedTenant/GetLinkedTenant', {params:{Id:this.props.sessionStore?.currentLogin.tenant.id}});
    this.setState({ generatedLink: result.data.result.tenancyLink ,isBlinking: true });
    setTimeout(() => this.setState({ isBlinking: false }), 1500);
  };
  handleCopyLink = () => {
    const { generatedLink } = this.state;

    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      message.success('Link copied to clipboard!');
    } else {
      message.warning('No link to copy!');
    }
  };
  render() {
    const { generatedLink,isBlinking } = this.state;
    const styleBg = { backgroundColor: '#4CAF50', padding: '1px 8px', borderRadius: '35px', color: 'white' }
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#f0f2f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Card
          style={{
            maxWidth: '800px',
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
          bodyStyle={{ padding: '32px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
              LEGAL DIARY SYSTEM
            </h1>
            <h2 style={{ fontSize: '18px', fontWeight: 'normal', color: '#555' }}>
              ~ Digital Diary For Lawyers ~
            </h2>
          </div>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#555',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
           <span style={styleBg}>Generate tenant link</span> Our web application now providing you a new feature of create tenancy link of your tenant anytime. Now you are able to make your clients aware of any proceedings and date with court information relating to thier cases, by generating web link through this application and provide it to your clients. Clients of your tenant now have a web page through aforesaid web link, where he they can querry about thier cases and make them self always up to date about the cases information. Now each tenancy clients can access thier cases any time from any device through web link. 
          </p>
          <Row gutter={[16, 16]} justify="center">
            <Button
              type="primary"
              icon={<LinkOutlined />}
              size="large"
              onClick={this.handleGenerateLink}
              style={{
                backgroundColor: '#4caf50',
                borderColor: '#4caf50',
                fontWeight: 'bold',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            >
              Generate Tenant Link
            </Button>
          </Row>
          <Row
            gutter={[16, 16]}
            justify="center"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
              <Input
              style={{
                width: '90%',
                height: '40px',
                borderRadius: '8px',
                border: isBlinking ? '2px solid #1890ff' : '1px solid #d9d9d9',
                boxShadow: isBlinking ? '0 0 10px rgba(24, 144, 255, 0.6)' : 'none',
                transition: 'box-shadow 0.3s, border 0.3s',
              }}
              value={generatedLink}
              readOnly
              placeholder="Generated link will appear here"
            />
            <Tooltip title="Copy Link">
              <Button
                icon={<CopyOutlined />}
                onClick={this.handleCopyLink}
                disabled={!generatedLink}
                style={{
                  backgroundColor: generatedLink ? '#1890ff' : '#f5f5f5',
                  color: generatedLink ? '#fff' : '#aaa',
                  borderColor: generatedLink ? '#1890ff' : '#d9d9d9',
                  borderRadius: '8px',
                }}
              />
            </Tooltip>
          </Row>        
          </Card>
      </div>
    );
  }
}

export default LinkedTenant;
