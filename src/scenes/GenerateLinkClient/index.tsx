import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Input, Row, Col, DatePicker, Layout, Tooltip, } from "antd";
import { LoginOutlined, SearchOutlined, UserOutlined, } from "@ant-design/icons";
import moment from "moment";
import http from "../../services/httpService";
// import { useParams } from "react-router-dom";

const { Header, Content } = Layout;

interface CaseRecord {
  key: string;
  caseNo: string;
  caseTitle: string;
  benchCode: string;
  caseType: string;
  proceeding: string;
  previousDate: string;
  nextDate: string;
}

const App: React.FC = () => {
  // const { id } = useParams<{ id: string }>(); // `id` will be extracted from the URL
  // const [tenantData, setTenantData] = useState<any>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  console.log("client link vala call hova")
  const [data, setData] = useState<CaseRecord[]>([
    {
      key: "1",
      caseNo: "12345",
      caseTitle: "John Doe vs ABC Corp",
      benchCode: "A1",
      caseType: "Civil",
      proceeding: "Hearing",
      previousDate: "2024-12-01",
      nextDate: "2024-12-15",
    },
    {
      key: "2",
      caseNo: "67890",
      caseTitle: "Jane Roe vs XYZ Ltd",
      benchCode: "B2",
      caseType: "Criminal",
      proceeding: "Judgement",
      previousDate: "2024-12-03",
      nextDate: "2024-12-18",
    },
  ]);

  const columns = [
    {
      title: "Case No",
      dataIndex: "caseCaseNo",
      key: "caseCaseNo",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Case Title",
      dataIndex: "caseCaseTitle",
      key: "caseCaseTitle",
    },
    {
      title: "Bench Code",
      dataIndex: "benchId",
      key: "benchId",
      render: (text: string) => (
        <Tooltip title="Bench Code for the case">
          <Tag color="green">{text}</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Case Type",
      dataIndex: "caseCaseTypeCaseTypeName",
      key: "caseCaseTypeCaseTypeName",
      //   render: (type: string) => (
      //     <Tag color={type === "Civil" ? "volcano" : "cyan"}>{type}</Tag>
      //   ),
    },
    {
      title: "Proceeding",
      dataIndex: "proceedingStatusProceedingName",
      key: "proceedingStatusProceedingName",
    },
    {
      title: "Previous Date",
      dataIndex: "previousDate",
      key: "previousDate",
      render: (text: string) => <div >{text ? moment(text).format('YYYY-MM-DD') : '-'}</div>
    },
    {
      title: "Next Date",
      dataIndex: "nexttDate",
      key: "nexttDate",
      render: (text: string) => <div >{text ? moment(text).format('YYYY-MM-DD') : '-'}</div>
    },
  ];
  //   useEffect(() => {
  //     const fetchTenantData = async () => {
  //         try {
  //             // Replace `/api/tenantclient/` with your backend API endpoint
  //             const response = await fetch(`/api/tenantclient/${id}`);
  //             if (!response.ok) throw new Error("Failed to fetch tenant data.");
  //             const data = await response.json();
  //             setTenantData(data);
  //         } catch (error) {
  //             console.error(error);
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     fetchTenantData();
  // }, [id]);
  // if (loading) {
  //     return (
  //         <div style={{ textAlign: "center", marginTop: "50px" }}>
  //             <Spin size="large" tip="Loading Tenant Data..." />
  //         </div>
  //     );
  // }

  // if (!tenantData) {
  //     return (
  //         <div style={{ textAlign: "center", marginTop: "50px" }}>
  //             <h1>Page Not Found</h1>
  //             <p>Invalid link or tenant data not available.</p>
  //         </div>
  //     );
  // }
  const [id, setId] = useState<string | null>(null);
  const handleSearch = async () => {
    await getData()
  };

  // Modal logic
  const handleDateChange = (date: any, dateString: string) => {
    setSelectedDate(dateString);
  };
  const getData = async () => {
    const pathParts = window.location.pathname.split("/");
    const extractedId = pathParts[pathParts.length - 1]; // Last part of the path
    setId(extractedId);

    console.log("Extracted ID:", extractedId.split("_")[0]);
    const params = {
      Keyword: keyword,
      ClientCauseListDate: selectedDate || moment().format("YYYY-MM-DD"),
      Tenancy: extractedId.split("_")[0],
    };

    try {
      console.log("search bar params", params);
      const response = await http.get("api/services/app/TenantClient/GetAllCauseListCases", { params });
      const { items } = response.data.result;
      console.log("response of api or client link data", items)
      setData(items)
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
    }
  }
  useEffect(() => {
    getData()

    // API call ya logic yahan implement karen
  }, []);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <Header style={{ background: "#fff", textAlign: "center", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ color: "#000", margin: 0, fontSize: "1.5rem" }}>
          LEGAL DIARY SYSTEM ~Digital Diary For Lawyers~
        </h1>
      </Header>

      <Content style={{ padding: "20px" }}>
        {/* Tenant Tags Section */}
        <Row justify="space-between" align="middle" style={{ marginBottom: "20px" }}>

          {/* </Badge.Ribbon> */}
          <Col>
            <Tag icon={<UserOutlined />} color="#f50" style={{ borderRadius: '4px', fontSize: '16px' }}>
              Tenant- {id?.split("_")[1]}
            </Tag>
            <Tag color="#2db7f5" style={{ borderRadius: '4px', fontSize: '16px' }}>
              Today Date -{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Tag>
            <Tag color="#87d068" style={{ borderRadius: '4px', fontSize: '16px' }}>Cause List</Tag>
          </Col>
          <Col>
            <Button type="link" icon={<LoginOutlined />} style={{ fontSize: '16px', color: 'teal' }} onClick={() => window.location.href = "/user/login"}>Click here for login into your tenant</Button>
          </Col>
        </Row>

        {/* Search Section */}
        <Row gutter={8} align="middle" style={{ marginBottom: "20px" }}>
          <Col flex="auto">
            <Input
              placeholder="Search by Case Title / Party Names / Client Name"
              size="large"
              prefix={<SearchOutlined />}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: "100%", borderRadius: '6px' }}
              onPressEnter={() => handleSearch()}
            />
          </Col>
          <Col style={{ width: "300px" }}>
            <DatePicker size="large" defaultValue={selectedDate ? moment(selectedDate) : moment()}
              onChange={handleDateChange} style={{ width: "100%", borderRadius: '6px' }} />
          </Col>
          <Col>
            <Button type="primary" size="large" icon={<SearchOutlined />} style={{ borderRadius: '6px' }} onClick={() => handleSearch()} >
              Search your case with date on one click
            </Button>
          </Col>
        </Row>

        {/* Table Section */}
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            // pageSize: 5,
            // showSizeChanger: true,
            // pageSizeOptions: ["5", "10", "20"],
            position: ["bottomCenter"],
            showTotal: (total) => `Total ${total} items`,
          }}
          bordered
          rowKey="key"
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        />

      </Content>
    </Layout>
  );
};

export default App;
