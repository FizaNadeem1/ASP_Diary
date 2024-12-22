// import React from "react";
// import { Button, Divider, Card,  } from "antd";
// import Logo from '../../assets/images/LegalDiaryLogo.png'

// const SubscriptionDetail = () => {
//   const packageDetails =
//   {
//     key: "1",
//     packageName: "Start Up (Advance Level)",
//     packageDetails: "This package is for those who want to register with us and have up to 200 or more cases at one time.",
//     packageType: "Monthly",
//     startDate: "Friday, December 20, 2024 - 12:00 AM",
//     endDate: "Monday, January 20, 2025 - 12:00 AM",
//     price: "$30.00",
//   }


//   return (
//     <div style={{ padding: "20px", minHeight: "100vh" }}>
//       <Card style={{ width: "77%", margin: "0 auto", padding: "20px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
//         {/* Header Section */}
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//           <div>
//             <h3>Subscription Detail (Payment)</h3>
//           </div>
//           <Button type="primary" onClick={() => window.print()}>Print (Invoice Details)</Button>
//         </div>

//         {/* Company Details */}
//         <div style={{ display: 'flex', justifyContent: "space-between" }}>
//           <Card hoverable={true} style={{ marginBottom: "20px" }}>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginBottom:'25px'}}>
//               <img src={Logo} alt="" style={{ height: '100px', width: '100px', borderRadius: 100 }} />
//             </div>
//             <h4 style={{fontSize:'18px'}}>To: <span style={{color:"teal"}}>Associates Diary (Web Application)</span></h4>
//             <p style={{fontSize:'16px'}}>
//               Office #1, 3rd floor, main GT road, nighar chawnk, Bhutta Center
//               {/* <br /> */}
//               Gujranwala, Punjab, Pakistan
//               <br />
//               📞 +92 311 2222799
//             </p>
//           </Card>

//           {/* Invoice Details */}
//           <Card hoverable={true} title='Payment Detail (Invoice)' style={{  marginBottom: "20px" }}>
//             <div>
//               <p style={{fontSize:'16px'}}><strong>Invoice ID:</strong> #71f0fcac-c6d5-4495-8064-08dd20e67ddd</p>
//               <p style={{fontSize:'16px'}}><strong >User:</strong> #success</p>
//               <p style={{fontSize:'16px'}}><strong>Tenant:</strong> #TENANCY_254417_SF</p>
//               <p style={{fontSize:'16px'}}><strong>Subscription Date:</strong> Friday, December 20, 2024 - 4:07 PM</p>
//               <p style={{fontSize:'16px'}}><strong>Status:</strong> <span style={{backgroundColor:"green",color:'white',padding:'0 10px',borderRadius:'35px'}}>Invoice Status (Paid)</span></p>
//             </div>
//           </Card>
//           <Card hoverable={true} title='Price Detail ' style={{  marginBottom: "20px" }}>
//             <div>
//               <p style={{fontSize:'16px'}}><strong>Total Amount:</strong> $30.00</p>
//               <p style={{fontSize:'16px'}}><strong>Discount:</strong> $0.00</p>
//               <p style={{fontSize:'16px'}}><strong>Price After Discount:</strong> $30.00</p>
//             </div>
//           </Card>
//         </div>

//         <Divider />

//         {/* Package Details Table */}
//         <Card hoverable={true} title="Package Details">
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div>
//               <p style={{fontSize:'18px'}}><strong>Package Name  </strong> {packageDetails.packageName} <span style={{backgroundColor:"green",color:'white',padding:'0 10px',borderRadius:'35px'}}>{packageDetails.packageType}</span></p>
//               <p style={{fontSize:'18px'}}><strong>Package Start Date:</strong> {packageDetails.startDate}</p>
//               <p style={{fontSize:'18px'}}><strong>Package End Date:</strong> {packageDetails.endDate}</p>
//               <p style={{fontSize:'18px'}}><strong>Package Details:</strong>{packageDetails.packageDetails}</p>
//             </div>
//             <div style={{ width: '200px' }}>
//               <h2 style={{ fontSize: '30px', color: "green" }}><strong >Price:</strong> <p style={{ fontSize: '30px' }} >{packageDetails.price}</p></h2>
//             </div>
//           </div>
//           <div style={{display:'flex',justifyContent:'center'}}>
//               <Button type="primary"  onClick={() => alert("Redirect to tenant login")}>
//             Click to log in to your tenant - TENANCY_254417_SF
//           </Button>
//           </div>
//         </Card>

//         {/* Additional Details */}
//         <div style={{display:'flex'}}>
//         <Card hoverable={true} title="Payment (Additional Details)" style={{ marginTop: "20px" }}>
//           <p style={{fontSize:'20px'}}>
//              Note: This invoice is system generated (digital invoice). Copy the above tenancy name after #, and click on the login button, then click on change and paste the copy tenancy name into the text box, give username/password, and log in. If you are subscribing to a monthly package then the amount of packages will automatically be deducted at the end of the above-given end date, so before the expiration of the above-mentioned date you must unsubscribe from the package subscription if you do not want to continue with us.
//           </p>
//           <Divider />

//         </Card>

//         {/* Footer */}
//         {/* <Card hoverable={true} style={{ textAlign: "center", marginTop: "20px" }}>
//           <p>Thank you for your purchase - <strong>#TENANCY_254417_SF</strong></p>
          
//         </Card> */}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default SubscriptionDetail;

import React, { useEffect, useState } from "react";
import { Button, Divider, Card, Tag } from "antd";
import { PrinterOutlined, LoginOutlined } from "@ant-design/icons";
import Logo from "../../assets/images/LegalDiaryLogo.png";
import "./index.less"; // Import CSS file for print styles
import http from "../../services/httpService";

const SubscriptionDetail = (props:any) => {
  const session_id = props.match.params.session_id;
  console.log("param session id",session_id?.split('=')[1])
  const [details, setdetails] = useState({"userId": 2,
    "tenantId": 0,
    "subscriptionDate": "",
    "startSubscriptionDate": "",
    "endSubscriptionDate": "",
    "packageId": 0,
    "packagePackageName": "",
    "packageDetails": "",
    "packageIsMonthly": true,
    "subscriptionStatus": true,
    "paid": true,
    "stripeResponseKey": null,
    "stripeDesciptionKey": null,
    "stripeKey": "",
    "tottalPricePaid": 0,
    "discountPrice": 0,
    "priceWithoutDiscountDiscount": 0,
    "tenantName": "",
    "userName": "",
    "lastModificationTime": null,
    "lastModifierUserId": null,
    "creationTime": "",
    "creatorUserId": null,
    "id": ""})
  const packageDetails = {
    key: "1",
    packageName: "Start Up (Advance Level)",
    packageDetails: "This package is for those who want to register with us and have up to 200 or more cases at one time.",
    packageType: "Monthly",
    startDate: "Friday, December 20, 2024 - 12:00 AM",
    endDate: "Monday, January 20, 2025 - 12:00 AM",
    price: "$30.00",
  };
  const getSessionData= async()=>{
    let result = await http.get('api/services/app/SignUpBaseManagement/GetStripeSubscription', {params:{sessionId:session_id?.split('=')[1]}})
    console.log("get session data response",result.data.result)
    let params={
      clientRefId:result.data.result.clientReferenceId,
      status:true,
      stripeResKey:'',
      stripeDesKey:''
    }
    if(result.data.success){
      let result = await http.get('api/services/app/SignUpBaseManagement/GetSubscription', {params})
      console.log("get subscription response",result.data.result)
      setdetails(result.data.result)
    }
  }
useEffect(()=>{
  getSessionData()
},[])
  return (
    <div className="subscription-detail">
      <Card className="main-card">
        {/* Header Section */}
        <div className="header-section no-print">
          <h2>Subscription Detail (Payment)</h2>
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={() => window.print()}
            className="print-button"
          >
            Print Invoice
          </Button>
        </div>

        {/* Company and Invoice Details */}
        <div className="details-section">
          <Card hoverable className="company-details">
            <img src={Logo} alt="Logo" className="logo" />
            <h4>To: <span className="highlight">Associates Diary</span></h4>
            <p>
              Office #1, 3rd floor, main GT road, Bhutta Center, Gujranwala, Punjab, Pakistan
              <br />
              📞 +92 311 2222799
            </p>
          </Card>

          <Card hoverable className="payment-details" title="Payment Details">
            <p><strong>Invoice ID:</strong> {details.id}</p>
            <p><strong>User:</strong> success</p>
            <p><strong>Tenant:</strong> {details.tenantName}</p>
            <p><strong>Subscription Date:</strong> {details.startSubscriptionDate.split("T")[0]}</p>
            <p>
              <strong>Status:</strong> <Tag color="green" className="status-tag">Paid</Tag>
            </p>
          </Card>

          <Card hoverable className="price-details" title="Price Details">
            <p><strong>Total Amount:</strong> ${details.priceWithoutDiscountDiscount}</p>
            <p><strong>Discount:</strong> ${details.discountPrice}</p>
            <p><strong>Final Price:</strong> ${details.tottalPricePaid}</p>
          </Card>
        </div>

        <Divider className="divider" />

        {/* Package Details */}
        <Card hoverable title="Package Details" className="package-details">
          <p>
            <strong>Package Name:</strong> {details.packagePackageName}{" "}
            <Tag color="green" className="package-type">{packageDetails.packageType}</Tag>
          </p>
          <p><strong>Start Date:</strong> {details.startSubscriptionDate.split("T")[0]}</p>
          <p><strong>End Date:</strong> {details.endSubscriptionDate.split("T")[0]}</p>
          <p><strong>Details:</strong> {details.packageDetails}</p>
          <div className="center no-print">
            <Button
              type="primary"
              icon={<LoginOutlined />}
              className="login-button"
              onClick={() => alert("Redirect to tenant login")}
            >
              Log in to {details.tenantName}
            </Button>
          </div>
        </Card>

        <Divider className="divider" />

        {/* Footer Notes */}
        <Card hoverable className="notes-card" title="Additional Notes">
          <p>
            Note: This invoice is system-generated. Please copy your tenancy name, log in to the tenant portal, and update your details as required.
          </p>
        </Card>
      </Card>
    </div>
  );
};

export default SubscriptionDetail;




