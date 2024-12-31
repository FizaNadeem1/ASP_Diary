import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import http from '../../services/httpService';
import { message } from 'antd';

const Subscription = () => {
  const [deleteId, setDeleteId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [totalCount, setTotalCount] = useState(0);
  const [pkgName, setPkgName] = useState([]);
  const [paid, setPaid] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState([]);
  const [maxCountArray, setMaxCountArray] = useState([10, 25, 100]);
  const [maxResultCount, setmaxResultCount] = useState(10); // Default table height
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [allSubscriptionHeader, setAllSubscriptionHeader] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [skipCount, setSkipCount] = useState(0);
  const currentDate = new Date(); // Get the current date

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  };

  const dateAmountStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '150px',
  };

  const detailsStyle = {
    flexDirection: 'column',
    width: '100%',
  };

  const textareaStyle = {
    width: '100%',
    resize: 'vertical',
  };
  const cardStyle = {
    border: '1px solid #e2e2e2',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#ffffff',
    overflowWrap: 'break-word',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    // margin: '0 auto', // Center the card if needed
    width: '100%',
  };

  const labelStyle = {
    fontSize: '14px', // Smaller font for labels
    color: 'brown', // Gray color for labels
    fontWeight: 'bold', // Bold text for labels
    marginRight: '8px', // Spacing between label and value
  };

  const valueStyle = {
    fontSize: '14px', // Slightly larger font for values
    color: '#000000', // Black color for values
    fontWeight: 'normal', // Regular font weight for values
  };

  const detailStyle = {
    fontSize: '15px', // Custom font size for details
    color: '#000000', // Keep details text in black
    fontWeight: 'normal',
  };

  const getAllSubscriptions = async () => {
    console.log('call hova subscription');
    try {
      setLoading(true);
      const result = await http.get('/api/services/app/SubscriptionDetail/GetAll');
      console.log('response of get subscripitom', result);
      const sortedSubscriptions = result.data.result?.items.sort(
        (a, b) => new Date(b.startSubscriptionDate) - new Date(a.startSubscriptionDate)
      );
      setAllSubscriptions(sortedSubscriptions);
      setTotalCount(result.data.result?.totalCount);
      setLoading(false);
    } catch (error) {
      console.error('Failed to make get all Subscriptions API call', error);
      setLoading(false);
    }
  };

  const handleFinalize = async () => {
    try {
      const result = await http.get('/api/services/app/SubscriptionDetail/FinalizeInvoice');
      console.log('response of FinalizeInvoice subscription', result);
    } catch (error) {
      console.error('Failed to make get all Subscriptions API call', error);
    }
  };
  const handleCancel = async (id) => {
    try {
      setLoading(true);
      const result = await http.post('api/services/app/SubscriptionDetail/CancelSubscription', {
        id: id,
      });
      console.log('response of cancel subscription', result);
      if (result.status === 200) {
        message.info('Your subscription has been cancelled successfully');
      }
      await getAllSubscriptions();
      setLoading(false);
    } catch (error) {
      console.error('Failed to make get all Subscriptions API call', error);
      setLoading(false);
    }
  };

  const handleRenew = async (id) => {
    try {
      setLoading(true);
      const result = await http.post('api/services/app/SubscriptionDetail/RenewSubscription', {
        id: id,
      });
      console.log('response of renew subscription', result);
      if (result.data.result !== null) {
        window.location.href = result.data.result;
      } else {
        await getAllSubscriptions();
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to make get all Subscriptions API call', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFinalize();
    getAllSubscriptions();
  }, []);

  return (
    <div>
      <h1>
        Subscriptions <small style={{ fontFamily: 'cursive' }}>All subscriptions list</small>
      </h1>
      <h4>All Subscriptions</h4>

      <div
        style={{
          overflowX: 'auto',
          // WebkitOverflowScrolling: 'touch',backgroundColor:'red',
          width: '100%',
        }}
      >
        <table style={{ width: '100%' }}>
          <tbody>
            {allSubscriptions.map((item, index) => (
              <React.Fragment key={index}>
                {/* Subscription Card */}
                <tr style={{ width: '1200px' }}>
                  <td colSpan="4">
                    <div
                      style={{
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '20px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <h5
                          style={{
                            backgroundColor: `${
                              item.packagePackageName === 'Starter  (Beginner  Level)'
                                ? 'yellowgreen'
                                : '#f9f9f9'
                            }`,
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center ',
                            alignItems: 'center',
                            borderRadius: '50px',
                            width: '410px',
                            paddingTop: '4px',
                            paddingBottom: '5px',
                          }}
                        >
                          {item.packagePackageName === 'Starter  (Beginner  Level)'
                            ? ' Free Trial / The cost is bear by @associatesdiary.com '
                            : null}
                        </h5>
                        <h5
                          style={{
                            color: '#333',
                            fontWeight: 'bold',
                            color: 'teal',
                            marginRight: '300px',
                          }}
                        >
                          {item.packagePackageName} - {item.packageIsMonthly ? 'Monthly' : 'Yearly'}
                        </h5>
                        <div style={{ display: 'flex' }}>
                          <h5
                            style={{
                              color: '#333',
                              padding: '2px 10px',
                              backgroundColor: 'yellowgreen',
                              color: 'white',
                              borderRadius: '50px',
                            }}
                          >
                            {item.subscriptionStatus ? 'Active' : 'Expired'}
                          </h5>
                          <h5
                            style={{
                              color: '#333',
                              marginLeft: '5px',
                              padding: '2px 10px',
                              backgroundColor: 'yellowgreen',
                              color: 'white',
                              borderRadius: '50px',
                            }}
                          >
                            {item.paid ? 'Paid' : 'Paid'}
                          </h5>
                        </div>
                      </div>
                      {/* Details */}
                      <div style={{ paddingLeft: '10px' }}>
                        <div style={rowStyle}>
                          <tr>
                            <td>
                              <span style={labelStyle}>Start Date -</span>
                              <span style={valueStyle}>
                                {item.startSubscriptionDate.split('T')[0]}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span style={labelStyle}>End Date -</span>
                              <span style={valueStyle}>
                                {item.endSubscriptionDate.split('T')[0]}
                              </span>
                            </td>
                          </tr>
                        </div>
                        <tr>
                          <td>
                            <span style={labelStyle}>Details -</span>
                            <span style={valueStyle}>{item.packageDetails}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={labelStyle}>Price Paid ($) -</span>
                            <span style={valueStyle}>{item.tottalPricePaid} Us Dollars</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={labelStyle}>Discount ($) -</span>
                            <span style={valueStyle}>{item.discountPrice} Us Dollars</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={labelStyle}> Price Exclusive Discount ($) -</span>
                            <span style={valueStyle}>
                              {item.priceWithoutDiscountDiscount} Us Dollars
                            </span>
                          </td>
                        </tr>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end', // Aligns button to the right
                            alignItems: 'center',
                            color: 'red',
                            fontSize: '16px',
                            fontWeight: 700,
                          }}
                        >
                          {(item.subscriptionStatus === true &&
                            item.cancel === false &&
                            item.paid === true) ||
                          (item.subscriptionStatus === true &&
                            item.cancel === false &&
                            currentDate > new Date(item.endSubscriptionDate)) ? (
                            <button
                              style={{
                                cursor: 'pointer',
                                padding: '10px 20px',
                                backgroundColor: 'yellowgreen',
                                color: 'white',
                                borderRadius: '25px',
                                border: 'none',
                                outline: 'none',
                                transition: 'all 0.3s ease-in-out',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                              }}
                              onMouseEnter={
                                (e) => (e.target.style.transform = 'translateY(-5px)') // Move up on hover
                              }
                              onMouseLeave={
                                (e) => (e.target.style.transform = 'translateY(0)') // Reset position on leave
                              }
                              onClick={() => {
                                if (
                                  item.subscriptionStatus === true &&
                                  item.cancel === false &&
                                  item.paid === true
                                ) {
                                  handleCancel(item.id); // Call the cancel API
                                } else {
                                  handleRenew(item.id); // Call the renew API
                                }
                              }}
                            >
                              {item.subscriptionStatus === true &&
                              item.cancel === false &&
                              item.paid === true
                                ? 'Cancel'
                                : [
                                    item.subscriptionStatus === true &&
                                    item.cancel === false &&
                                    currentDate > new Date(item.endSubscriptionDate)
                                      ? 'Renew Subscription'
                                      : null,
                                  ]}
                            </button>
                          ) : item.subscriptionStatus === true && item.cancel === true ? (
                            'Subscription cancelled'
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscription;
