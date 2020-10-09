import React from "react";
import {
  Button,
  Row,
  Col,
  Typography,
  Input,
  Form,
  List,
  Avatar,
  Tooltip,
  Rate
} from "antd";
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const { Title } = Typography;
const list = [
  {
    key: 1,
    title: "abc",
    time: dayjs().subtract(1, "day"),
  },
  {
    key: 2,
    title: "abc",
    time: dayjs().subtract(1, "day"),
  },
  {
    key: 3,
    title: "abc",
    time: dayjs().subtract(1, "day"),
  },
];
function App() {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div>
      <div className="App">
        <div className="header">
          <Row gutter={16} justify="space-around" align="middle">
            <Col xs={24} sm={24} md={24}>
              <Title level={3} style={{ textAlign: "center" }}>
                Todo App
              </Title>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col xs={24} sm={20} md={20}>
                    <Form.Item
                      label="Nội dung"
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống nội dung công việc!",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập nội dung" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={4} md={4}>
                    <Button
                      icon={<PlusOutlined />}
                      type="primary"
                      htmlType="submit"
                    >
                      Thêm mới
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <div className="App" style={{ marginTop: "1em" }}>
        <Row gutter={16} justify="space-around" align="middle">
          <Col xs={24} sm={24} md={24}>
            <Title level={3} style={{ textAlign: "center" }}>
              Danh sách nội dung công việc
            </Title>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <List
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button icon={<FormOutlined />} type="default">
                      Sửa
                    </Button>,
                    <Button danger icon={<DeleteOutlined />}>
                      Xóa
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar size="large" icon={<ProfileOutlined />} />}
                    title={<p>{item.title}</p>}
                    description={
                      <Tooltip title={dayjs(item.time).fromNow()}>
                        {dayjs(item.time).format("DD/MM/YYYY")}
                      </Tooltip>
                    }
                  />
                  <Rate count={1} />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
