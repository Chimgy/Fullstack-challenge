import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Typography, Space, Spin, message, Tag } from 'antd';
import { RocketOutlined, DatabaseOutlined, CloudOutlined } from '@ant-design/icons';
import './App.css';

const { Title, Text, Paragraph } = Typography;

interface HelloResponse {
  message: string;
  timestamp: string;
  environment: string;
}

function App() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHello = async () => {
    setLoading(true);
    try {
      const response = await axios.get<HelloResponse>(
        `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'}/api/hello`);
        setData(response.data);
        message.success('Data fetched successfully from docker container');
    } catch (error) {
      message.error("Failed to fetch data from docker container");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App" style={{ padding: '50px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <CloudOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
          <Title level={1}>Hello World - Dockerized Full-Stack App</Title>
          <Tag color="blue">Running in Docker Containers</Tag>
        </div>

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={4}><RocketOutlined /> Tech Stack:</Title>
            <ul style={{ textAlign: 'left' }}>
              <li><strong>Backend:</strong> Node.js + NestJS (Container)</li>
              <li><strong>Frontend:</strong> React + TypeScript (Container)</li>
              <li><strong>Database:</strong> PostgreSQL (Container)</li>
              <li><strong>UI Library:</strong> Ant Design</li>
              <li><strong>Orchestration:</strong> Docker Compose</li>
            </ul>

            <Button 
              type="primary" 
              onClick={fetchHello}
              loading={loading}
              size="large"
              icon={<DatabaseOutlined />}
              block
            >
              Fetch Hello from Backend Container
            </Button>
            {loading && (
              <div style={{ textAlign: 'center' }}>
                <Spin size="large" />
                <Paragraph>Connecting to backend container...</Paragraph>
              </div>
            )}

            {data && (
              <Card type="inner" style={{ backgroundColor: '#e6f7ff' }}>
                <Space direction="vertical">
                  <Text strong>✅ Response from Backend:</Text>
                  <Paragraph style={{ fontSize: '16px', margin: 0 }}>{data.message}</Paragraph>
                  <Text type="secondary">Environment: {data.environment}</Text>
                  <Text type="secondary">Timestamp: {new Date(data.timestamp).toLocaleString()}</Text>
                </Space>
              </Card>
            )}
          </Space>
        </Card>
        <Card size="small" style={{ backgroundColor: '#fff7e6' }}>
          <Text type="secondary">
            💡 All services are running in separate Docker containers and communicating with each other!
          </Text>
        </Card>
      </Space>
    </div>
  );
}
export default App;

