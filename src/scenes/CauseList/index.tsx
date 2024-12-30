import React, { useState, useRef, useEffect } from "react";
import { Card, Row, Col, Table, Input, Button, Select, Modal, DatePicker, Form } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import http from "../../services/httpService";
import moment from "moment";

const CauseList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [benchList, setBenchList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [proceedingList, setProceedingList] = useState([]);
  const [totalCases, setTotalCases] = useState(0);
  const [caseData, setCaseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>(''); // Added day state
  const [selectedBench, setSelectedBench] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedProceeding, setSelectedProceeding] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0, width: 800 });

  const searchBarRef = useRef<HTMLDivElement>(null);

  // Form instance for reset
  const [form] = Form.useForm();

  // Get list data
  const getProceedingList = async () => {
    try {
      const response = await http.get("api/services/app/ProceedingsStatus/GetAllProceedingsStatusItems");
      if (response?.data?.result?.items) {
        const list = response.data.result.items.map((item: any) => ({
          value: item.value,
          label: item.displayText,
        }));
        setProceedingList(list);
      }
    } catch (error) {
      console.error("Failed to fetch proceeding data:", error);
    }
  };

  const getBenchList = async () => {
    try {
      const response = await http.get("api/services/app/Bench/GetBenchComboboxItem");
      if (response?.data?.result?.items) {
        const options = response.data.result.items.map((l: any) => ({
          value: l.value,
          label: l.displayText,
        }));
        setBenchList(options);
      }
    } catch (error) {
      console.error("Failed to fetch bench data:", error);
    }
  };

  const getClientList = async () => {
    try {
      const response = await http.get("api/services/app/Client/GetClientComboboxItem");
      if (response?.data?.result?.items) {
        const options = response.data.result.items.map((l: any) => ({
          value: l.value,
          label: l.displayText,
        }));
        setClientList(options);
      }
    } catch (error) {
      console.error("Failed to fetch client data:", error);
    }
  };

  useEffect(() => {
    getBenchList();
    getClientList();
    getProceedingList();
  }, []);

  // Handle search and apply filters
  const handleSearch = async (paginationParams = { current: 1, pageSize: 10 }) => {
    setIsLoading(true);

    const params = {
      Keyword: keyword,
      CauseListDate: selectedDate || moment().format("YYYY-MM-DD"),
      ClientId: selectedClient,
      ProceedingStatusId: selectedProceeding,
      BenchId: selectedBench,
    };

    try {
      console.log("search bar params", params);
      const response = await http.get("api/services/app/CaseProceeding/GetAllCauseListCases", { params });
      const { items, totalCount } = response.data.result;
      setCaseData(items);
      setTotalCases(totalCount);
      setPagination({ ...paginationParams, total: totalCount });
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Modal logic
  const handleDateChange = (date: any, dateString: string) => {
    setSelectedDate(dateString);
    setSelectedDay(moment(dateString).format("dddd")); // Get day based on selected date
  };

  const handleFilterClick = () => {
    const searchBar = searchBarRef.current?.getBoundingClientRect();
    if (searchBar) {
      setModalPosition({
        top: searchBar.bottom + window.scrollY,
        left: searchBar.left + window.scrollX,
        width: searchBar.width,
      });
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form fields when modal is closed
  };

  const handleApplyFilters = () => {
    handleSearch();
    closeModal(); // Close modal after applying filters
  };

  const columns = [
    { title: "Case No", dataIndex: "caseCaseNo", key: "caseCaseNo" },
    { title: "Case Title", dataIndex: "caseCaseTitle", key: "caseCaseTitle" },
    { title: "Bench Code", dataIndex: "benchId", key: "benchId" },
    { title: "Case Type", dataIndex: "caseCaseTypeCaseTypeName", key: "caseCaseTypeCaseTypeName" },
    { title: "Proceeding", dataIndex: "proceedingStatusProceedingName", key: "proceedingStatusProceedingName" },
    { title: "Previous Date", dataIndex: "previousDate", key: "previousDate",render: (text: string) => <div >{text.split("T")[0]}</div>, },
    { title: "Next Date", dataIndex: "nexttDate", key: "nexttDate",render: (text: string) => <div >{text.split("T")[0]}</div> },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "20px" }}>
      <h1 style={{  fontWeight: "bold", marginBottom: "24px" }}>Cause List</h1>

      {/* Search Bar */}
      <Row
        style={{
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "18px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        align="middle"
      >
        <Col span={4} style={{display:'flex'}}>
          <div style={{ fontSize: "16px", fontWeight: "bold" ,marginRight:'18px'}}>
            {selectedDay || moment().format('dddd')} {/* Display the day */}
          </div>
          <div style={{ fontSize: "16px", color: "#555" }}>
            {selectedDate || moment().format("YYYY-MM-DD")}
          </div>
        </Col>
        <Col span={4} style={{ textAlign: "center",display:'flex' }}>
          <div style={{ fontSize: "16px", fontWeight: "bold" ,marginRight:'18px'}}>Total Cases</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", color: "#1890ff" }}>{totalCases}</div>
        </Col>
        <Col span={16} style={{ textAlign: "right" }}>
          <div ref={searchBarRef} style={{ display: "inline-block" }}>
            <Input
              placeholder="Search cases"
              style={{ width: "800px", marginRight: "8px",
                borderRadius:'5px'
               }}
              prefix={<SearchOutlined />}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onPressEnter={() => handleSearch()}
            />
            <Button
              icon={<FilterOutlined />}
              onClick={handleFilterClick}
              style={{
                backgroundColor: "#1890ff",
                color: "#fff",
                borderRadius:'5px'
              }}
            >
              Filter
            </Button>
          </div>
        </Col>
      </Row>

      {/* Filter Modal */}
      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={modalPosition.width}
        style={{
          top: modalPosition.top,
          left: modalPosition.left,
          position: "absolute",
        }}
        mask={false}
      >
        <div style={{ padding: "16px" }}>
          <Form
            layout="vertical"
            form={form} // Link the Form to the instance
            onFinish={handleApplyFilters}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Select Date" name="date">
                  <DatePicker
                    defaultValue={selectedDate ? moment(selectedDate) : moment()}
                    onChange={handleDateChange}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Bench Code" name="benchCode">
                  <Select
                    style={{ width: "100%" }}
                    options={benchList}
                    onChange={(value) => setSelectedBench(value.toString())}
                    filterOption={(input, option) =>
                      (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Client Name" name="client">
                  <Select
                    style={{ width: "100%" }}
                    options={clientList}
                    onChange={(value) => setSelectedClient(value.toString())}
                    filterOption={(input, option) =>
                      (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Proceeding" name="proceeding">
                  <Select
                    style={{ width: "100%" }}
                    options={proceedingList}
                    onChange={(value) => setSelectedProceeding(value.toString())}
                    filterOption={(input, option) =>
                      (option as { label: string; value: string })?.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Button
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit"
            >
              Search
            </Button>
          </Form>
        </div>
      </Modal>

      {/* Table */}
      <Card style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Table
          rowKey={(record) => record.id.toString()}
          bordered
          columns={columns}
          size="small"
          pagination={pagination}
          loading={isLoading}
          dataSource={caseData}
          // onChange={handleSearch}
        />
      </Card>
    </div>
  );
};

export default CauseList;
