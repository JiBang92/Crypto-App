import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  if (coinHistory?.data?.history) {
    for (let i = 0; i < coinHistory.data.history.length; i++) {
      coinPrice.push(coinHistory.data.history[i].price);
    }

    for (let i = 0; i < coinHistory.data.history.length; i++) {
      coinTimestamp.push(
        new Date(
          coinHistory.data.history[i].timestamp * 1000
        ).toLocaleDateString("en-US")
      );
    }
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change:{" "}
            {coinHistory?.data?.change < 0 ? (
              <span style={{ color: "red" }}>{coinHistory.data.change}%</span>
            ) : coinHistory?.data?.change > 0 ? (
              <span style={{ color: "green" }}>{coinHistory.data.change}%</span>
            ) : null}
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${" "}
            <span style={{ color: "#0066AC" }}>{currentPrice}</span>
          </Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  );
};

export default LineChart;
