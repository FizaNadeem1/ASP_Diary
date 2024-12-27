import './index.less';

import * as React from 'react';

import { Button, Card, Checkbox, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined, } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';

import { FormInstance } from 'antd/lib/form';
import { L } from '../../lib/abpUtility';
import { Link } from 'react-router-dom';
import Stores from '../../stores/storeIdentifier';
import rules from './index.validation';
import { GetTimeZone } from '../../services/subscription/dto/getTimeZoneOutput';
import SubscriptionStore from '../../stores/subscriptionStore';
import moment from 'moment';
import { SubscriptionData } from './SubscriptionData';
import { Line } from 'rc-progress';
import Loading from '../../components/Loading';
import { CardElement } from '@stripe/react-stripe-js';

const FormItem = Form.Item;
declare var abp: any;

export interface ILoginProps {
  subscriptionStore?: SubscriptionStore;
  history: any;
  location: any;
}
interface State {
  completedApis: number;
  confirmDirty: boolean,
  timeZone: GetTimeZone[],
  progress: number;
  loading: boolean;
  totalApis: number;
  passwordVisible: boolean, // Toggle for password visibility
  confirmPasswordVisible: boolean, // Toggle for confirm password visibility
}

@inject(Stores.SubscriptionStore)
@observer
class Signup extends React.Component<ILoginProps, State> {
  formRef = React.createRef<FormInstance>();
  state = {
    confirmDirty: false,
    timeZone: [],
    completedApis: 0,
    progress: 0,
    totalApis: 11,
    loading: false,
    passwordVisible: false, // Toggle for password visibility
    confirmPasswordVisible: false, // Toggle for confirm password visibility
  };
  componentDidUpdate(prevProps: ILoginProps, prevState: State) {
    if (this.state.completedApis !== prevState.completedApis && this.state.completedApis > 0) {
      const progress = (this.state.completedApis / this.state.totalApis) * 100;
      if (progress !== this.state.progress) {
        this.setState({ progress });
      }
    }
  }
  async componentDidMount() {
    let time = await this.props.subscriptionStore?.getTimeZone()
    this.setState({ timeZone: time })
  }

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.formRef.current;

    if (value && value !== form!.getFieldValue('password')) {
      return Promise.reject('Two passwords that you enter is inconsistent!');
    }
    return Promise.resolve();
  };
  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { validateFields, getFieldValue } = this.formRef.current!;

    this.setState({
      confirmDirty: true,
    });

    if (value && this.state.confirmDirty && getFieldValue('confirm')) {
      validateFields(['confirm']);
    }

    return Promise.resolve();
  };
  getNumber = (str: string) => {
    const result = str.match(/\d+/); // \d+ matches one or more digits

    if (result) {
      return parseInt(result[0], 10); // Convert the result to an integer
    } else {
      return 1
    }
  }
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ passwordVisible: !prevState.passwordVisible }));
  };

  toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({ confirmPasswordVisible: !prevState.confirmPasswordVisible }));
  };
  handleSubmit = async () => {
    // const { history } = this.props; 
    const form = this.formRef.current;
    const { state } = this.props.location;
    // Check if a package is selected
    if (!state || !state.selectedPackage) {
      message.error('Please select a package before proceeding.');
      return; // Prevent submission
    }
    form!.validateFields().then(async (values: any) => {
      let api1 = { "firstName": values.firstName, "surName": values.lastName, "firmName": values.companyName, "licsenceNo": values.barLisenceNo, "phone": values.phoneNo, "email": values.email, "city": values.city, "userName": values.userName, "password": values.password, "isAdreed": values.termCondition, "creationTime": moment(), "packageId": state.selectedPackage.id, "tenantId": 0 }
      console.log("api call no 1 credentials", api1)
      this.setState({ loading: true })
      await this.props.subscriptionStore?.createSignup(api1).then(async (result1) => {
        console.log("api call no 1 response", result1);
        this.setState((prevState) => ({
          completedApis: prevState.completedApis + 1,
        }));
        await this.props.subscriptionStore?.tenancyCodeGenerator().then(async (result) => {
          console.log("code generator", result?.data?.result)
          this.setState((prevState) => ({
            completedApis: prevState.completedApis + 1,
          }));
          const firmName = result?.data?.result
          const tenantName = values.companyName.split(' ').join('_')
          let tenantDto = { "tenancyName": `${firmName}${tenantName}`, "name": values.userName, "adminEmailAddress": values.email, "connectionString": "", "isActive": true }
          console.log("api call no 2 credentials", tenantDto)
          await this.props.subscriptionStore?.createTenant(tenantDto).then(async (result2) => {
            console.log("api call no 2 response", result2.data.result.id);
            this.setState((prevState) => ({
              completedApis: prevState.completedApis + 1,
            }));
            const tenantId = result2.data.result.id
            let api3 = { "firstName": values.firstName, "surName": values.lastName, "firmName": values.companyName, "licsenceNo": values.barLisenceNo, "phone": values.phoneNo, "email": values.email, "city": values.city, "userName": values.userName, "password": values.password, "isAdreed": values.termCondition, "creationTime": moment(), "packageId": state.selectedPackage.id, "tenantId": tenantId }
            console.log("api call no 3 credentials", api3)
            await this.props.subscriptionStore?.signupForTenant(api3).then(async (result3) => {
              console.log("api call no 3 response", result3);
              this.setState((prevState) => ({
                completedApis: prevState.completedApis + 1,
              }));
              let api4 = { "name": "Head Office Admin", "displayName": "Head Office Admin", "normalizedName": "HEADOFFICEADMIN", "description": `You are the head of ${values.companyName} company`, "grantedPermissions": [], "tenantId": tenantId, "packageId": state.selectedPackage.id }
              console.log("api call no 4 credentials", api4)
              await this.props.subscriptionStore?.signupRole(api4).then(async (result4) => {
                console.log("api call no 4 response", result4);
                this.setState((prevState) => ({
                  completedApis: prevState.completedApis + 1,
                }));
                let api5 = { "name": "Branch Admin", "displayName": "Branch Admin", "normalizedName": "BRANCHADMIN", "description": `You are the branch user of ${values.companyName} company`, "grantedPermissions": [], "tenantId": tenantId, "packageId": state.selectedPackage.id }
                console.log("api call no 5 credentials", api5)
                await this.props.subscriptionStore?.createBranchRole(api5).then(async (result5) => {
                  console.log("api call no 5 response", result5);
                  this.setState((prevState) => ({
                    completedApis: prevState.completedApis + 1,
                  }));
                  let api6 = { "userName": values.userName, "name": values.firstName, "surname": values.lastName, "emailAddress": values.email, "isActive": state.selectedPackage.id === 2 ? true : false, "roleNames": ["Head Office Admin", "Branch Admin"], "password": values.password, "tenantId": tenantId }
                  console.log("api call no 6 credentials", api6)
                  await this.props.subscriptionStore?.userSignup(api6).then(async (result6) => {
                    console.log("api call no 6 response", result6.data.result);
                    this.setState((prevState) => ({
                      completedApis: prevState.completedApis + 1,
                    }));
                    const userId = result6.data.result.id
                    let api7 = { "trialEndTime": moment(), "firmName": values.companyName, "firmOwner": `${values.firstName} ${values.lastName}`, "firmCode": values.companyName, "firmContactNo": values.phoneNo, "firmContactEmail": values.email, "firmContactPerson": null, "firmContactPersonNo": null, "firmAdress": values.city, "firmWesite": "", "noOfBranches": this.getNumber(state.selectedPackage.branchRegistration), "adminPanelAccess": false, "noOfCases": this.getNumber(state.selectedPackage.caseRegister), "noOfLawyers": this.getNumber(state.selectedPackage.lawyerRegister), "username": values.userName, "cityName": null, "cityId": null, "userId": userId, "packageId": state.selectedPackage.id, "timeZone": Number(values.time), "tenantId": tenantId }
                    console.log("api call no 7 credentials", api7)
                    await this.props.subscriptionStore?.signupUserFirm(api7).then(async (result7) => {
                      console.log("api call no 7 response", result7.data.result);
                      this.setState((prevState) => ({
                        completedApis: prevState.completedApis + 1,
                      }));
                      const firmRes = result7.data.result
                      console.log(firmRes)
                      await this.props.subscriptionStore?.branchCodeGenerator().then(async (res) => {
                        console.log("code generator for branch", res?.data?.result)
                        this.setState((prevState) => ({
                          completedApis: prevState.completedApis + 1,
                        }));
                        const branchCode = res?.data?.result
                        let api8 = { "branchName": values.companyName, "branchOwner": `${values.firstName} ${values.lastName}`, "branchCode": branchCode, "branchContactNo": values.phoneNo, "branchContactEmail": values.email, "branchContactPerson": values.firstName, "branchContactPersonNo": values.phoneNo, "branchAdress": values.city, "creationTime": moment(), "isActive": result2.data.result.isActive, "username": values.userName, "cityName": values.city, "cityId": firmRes.cityId, "firmName": firmRes.firmName, "firmId": firmRes.id, "tenantId": tenantId }
                        console.log("api call no 8 credentials", api8)
                        await this.props.subscriptionStore?.signupUserBranch(api8).then(async (result8) => {
                          console.log("api call no 8 response", result8);
                          this.setState((prevState) => ({
                            completedApis: prevState.completedApis + 1,
                          }));
                          const api9 = await SubscriptionData(tenantId, state.selectedPackage, userId)
                          console.log("api call no 9 credentials", api9)
                          await this.props.subscriptionStore?.createSubscription(api9).then(async (result9) => {
                            console.log("api call no 9 response", result9);
                            this.setState((prevState) => ({
                              completedApis: prevState.completedApis + 1,
                            }));
                            let data = result9.data.result
                            if (data.paid) {
                              window.location.href = '/dashboard';
                              setTimeout(() => {
                                Modal.success({ content: L("Congratulations! You have subscribed to the free package for a month") });
                              }, 100); // Slight delay
                            }
                            else {
                              let api10 = {
                                "id": data.id,
                                "creationTime": data.creationTime,
                                "creatorUserId": data.creatorUserId,
                                "lastModificationTime": data.lastModificationTime,
                                "lastModifierUserId": data.lastModifierUserId,
                                "userId": data.userId, 
                                "tenantId": data.tenantId,
                                "subscriptionDate": data.subscriptionDate,
                                "startSubscriptionDate": data.startSubscriptionDate,
                                "endSubscriptionDate": data.endSubscriptionDate,
                                "packageId": data.packageId,
                                "packagePackageName": data.packagePackageName,
                                "packageDetails": data.packageDetails,
                                "packageIsMonthly": state.selectedPackage.isMonthly ? true : false,
                                "subscriptionStatus": data.subscriptionStatus,
                                "paid": data.paid,
                                "stripeResponseKey": data.stripeResponseKey,
                                "stripeDesciptionKey": data.stripeDesciptionKey,
                                "stripeKey": data.stripeKey,
                                "tottalPricePaid": data.tottalPricePaid,
                                "discountPrice": data.discountPrice,
                                "priceWithoutDiscountDiscount": data.priceWithoutDiscountDiscount,
                                "tenantName": data.tenantName,
                                "userName": data.userName
                              }
                              console.log("api call no 10 credentials", api10)
                              await this.props.subscriptionStore?.createPaymentSession(api10).then(async (result10) => {
                                console.log("API Call No. 10 Response", result10);
                                const redirectUrl = result10.data.result;
                                if (redirectUrl && redirectUrl.startsWith("https://checkout.stripe.com")) {
                                  console.log("Redirecting to Stripe Checkout:", redirectUrl);
                                  localStorage.setItem("tenantName", `${firmName}${tenantName}`)
                                  localStorage.setItem("package", JSON.stringify(state.selectedPackage))
                                  window.location.href = redirectUrl; // Redirect to the Stripe Checkout page
                                } else {
                                  console.error("Invalid Stripe Checkout URL:", redirectUrl);
                                  Modal.error({
                                    content: "Failed to initiate payment session. Please try again.",
                                  });
                                  // this.setState({ loading: false });
                                }
                                // this.setState((prevState) => ({
                                //   completedApis: prevState.completedApis + 1,
                                // }));
                              });
                            }
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
        form!.resetFields();
      });
    }).catch(e => console.log(e))
  }
  public render() {
    const { state } = this.props.location;
    const options = this.state.timeZone.map((x: GetTimeZone) => {
      var test = { label: x.displayText, value: x.value };
      return test;
    });
    if (this.state.loading) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            // backgroundColor: '#f0f2f5', // Optional background color for better visibility
          }}
        >
          <Loading /> {/* Replace with your actual loading spinner component */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Line
              percent={Math.round(this.state.progress)} // Ensure whole number percentages
              strokeWidth={4}
              strokeColor="#4caf50"
              trailWidth={4}
              trailColor="#d3d3d3"
              style={{ width: '400px' }}
            />
            <p
              style={{
                fontWeight: 'bold',
                marginLeft: '10px',
                fontSize: '18px',
                marginTop: '19px',
                color: '#333',
              }}
            >
              {Math.round(this.state.progress)}% completed
            </p>
          </div>
        </div>
      );
    }
    else
      return (
        <Form className="" onFinish={this.handleSubmit} ref={this.formRef}>

          <Row style={{ marginTop: 10 }}>
            <Col span={8} offset={8}>
              <Card>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h2
                    style={{
                      color: '#007B7F',
                      fontWeight: 'bold',
                      fontSize: '32px',
                      marginBottom: '10px',
                      textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                    }}
                  >
                    {L('Sign Up')}
                  </h2>
                  <p style={{ color: '#6c757d', fontSize: '14px', marginTop: '-10px' }}>
                    Join us to enjoy exclusive features and services.
                  </p>
                </div>

                {state && state.selectedPackage ? (
                  <Card
                    style={{
                      background: 'linear-gradient(90deg,rgb(64, 86, 110) 0%, #00C9A7 100%)',
                      borderRadius: '10px',
                      padding: '20px',
                      textAlign: 'center',
                      color: '#fff',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      marginBottom: '20px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        marginBottom: '5px',
                        letterSpacing: '1px',
                      }}
                    >
                      Selected Package
                    </h3>
                    <p
                      style={{
                        fontSize: '18px',
                        margin: 0,
                        fontWeight: 600,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                      }}
                    >
                      {state.selectedPackage.packageName}
                    </p>
                  </Card>
                ) : (
                  <Card
                    style={{
                      backgroundColor: '#fff1f0',
                      borderRadius: '10px',
                      padding: '20px',
                      textAlign: 'center',
                      color: '#ff4d4f',
                      border: '1px solid #ff4d4f',
                      marginBottom: '20px',
                    }}
                  >
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                      No Package Selected
                    </h3>
                    <p style={{ margin: 0 }}>Please select a package to proceed.</p>
                  </Card>
                )}

                <FormItem name={'firstName'} rules={rules.firstName}>
                  <Input placeholder={L('firstName')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem>
                <FormItem name={'lastName'} rules={rules.lastName}>
                  <Input placeholder={L('lastName')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem>
                <FormItem name={'userName'} rules={rules.userName}>
                  <Input placeholder={L('userName')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem>
                <FormItem name={'email'} rules={rules.email as []}>
                  <Input type='email' placeholder={L('email')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem>
                <FormItem name={'companyName'} rules={rules.companyName}>
                  <Input placeholder={L('companyName')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem>
                <FormItem name={'barLisenceNo'} rules={rules.barLisenceNo}>
                  <Input placeholder={L('barLisenceNo')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem>
                <FormItem name={'phoneNo'} rules={rules.phoneNo}>
                  <Input placeholder={L('phoneNo')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem>
                <FormItem name={'city'} rules={rules.city}>
                  <Input placeholder={L('city')} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem>
                <FormItem name={'time'} rules={rules.time}>
                  <Select showSearch placeholder={L("--select--")} options={options} allowClear filterOption={(input, option) => (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())} />
                </FormItem>
                {/* <FormItem
                  name={'password'}
                  rules={[{required: true,message: 'Please input your password!',},{min: 6,message: 'Password must be at least 6 characters long!',},{validator: this.validateToNextPassword,},]}>
                  <Input
                    // type="password"
                    placeholder={L('password')} prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem> */}
                <FormItem
                  name={'password'}
                  rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'Password must be at least 6 characters long!' }, { validator: this.validateToNextPassword }]}>
                  <Input
                    type={this.state.passwordVisible ? 'text' : 'password'}
                    placeholder={L('password')}
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                      this.state.passwordVisible ? (
                        <EyeInvisibleOutlined onClick={this.togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                      ) : (
                        <EyeOutlined onClick={this.togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                      )
                    }
                    size="large"
                  />
                </FormItem>
                {/* <FormItem
                  name={'confirm'}
                  rules={[{required: true,message: 'Please input your confirm password!',},{validator: this.compareToFirstPassword,}]}>
                  <Input
                    placeholder={L('password')} prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" />
                </FormItem> */}
                <FormItem
                  name={'confirm'}
                  rules={[{ required: true, message: 'Please input your confirm password!' }, { validator: this.compareToFirstPassword }]}>
                  <Input
                    type={this.state.confirmPasswordVisible ? 'text' : 'password'}
                    placeholder={L('Confirm Password')}
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                      this.state.confirmPasswordVisible ? (
                        <EyeInvisibleOutlined onClick={this.toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }} />
                      ) : (
                        <EyeOutlined onClick={this.toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }} />
                      )
                    }
                    size="large"
                  />
                </FormItem>
                <FormItem
                  name="termCondition"
                  valuePropName="checked"
                  rules={[{ required: true, message: 'You must agree to the terms and conditions' }]}>
                  <Checkbox>
                    By clicking Sign Up, you agree to our{' '}
                    <Link to="/user/register-v3">Terms</Link> and that you have read our{' '}
                    <Link to="/user/register-v3">Data Policy</Link>, including our{' '}
                    <Link to="/user/register-v3">Cookie Use</Link>.
                  </Checkbox>
                </FormItem>
                <Row style={{ margin: '0px 0px 10px 15px ' }}>
                  <CardElement />
                  <Button style={{ backgroundColor: '#f5222d', color: 'white' }} htmlType={'submit'} danger>
                    {L('Signup')}
                  </Button>
                </Row>
                <Row>
                  <Col span={24}>
                    <div>
                      Already a member? Click <Link to="/user/login">here</Link> to login.
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      );
  }
}

export default Signup;
