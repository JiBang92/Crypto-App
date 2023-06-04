import React from "react";
import millify from "millify";
import { Row, Col, Collapse } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";

const { Panel } = Collapse;

const Exchanges = () => {
  const { data: getCryptos } = useGetCryptosQuery(100);
  console.log("getCryptosQuery", getCryptos.data.coins);

  return (
    <div className="exchanges">
      <div className="exchanges-header">
        <Row
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <Col span={6}>Crypto</Col>
          <Col span={6}>24h Volume</Col>
          <Col span={6}>Market Cap</Col>
          <Col span={6}>Change</Col>
        </Row>
      </div>
      <Collapse>
        {getCryptos.data.coins.map((coin, i) => (
          <Panel
            showArrow={false}
            header={
              <Row
                className="exchanges-panel"
                style={{ display: "flex", textAlign: "center" }}
              >
                <Col
                  className="exchanges-coin-details"
                  span={6}
                  style={{
                    display: "flex",
                    flexWrap: { sm: "column", lg: "row" },
                  }}
                >
                  <div
                    className="exchanges-coin-rank"
                    style={{ marginRight: "10px" }}
                  >
                    {coin.rank}.
                  </div>
                  <img
                    className="exchanges-coin-icon"
                    src={coin.iconUrl}
                    alt={coin.name}
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "10px",
                    }}
                  />
                  <div
                    className="exchanges-coin-name"
                    style={{ fontWeight: "bold" }}
                  >
                    {coin.name} &#40;{coin.symbol}&#41;
                  </div>
                </Col>
                <Col className="exchanges-coin-24hVolume" span={6}>
                  $ {millify(coin["24hVolume"])}
                </Col>
                <Col className="exchanges-coin-marketCap" span={6}>
                  $ {millify(coin.marketCap)}
                </Col>
                <Col
                  className="exchanges-coin-change"
                  span={6}
                  style={
                    coin?.change < 0 ? { color: "red" } : { color: "green" }
                  }
                >
                  {millify(coin.change)} %
                </Col>
              </Row>
            }
            key={i}
          >
            <p className="exchanges-coin-description">{coin.name}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Exchanges;
