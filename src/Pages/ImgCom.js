import React from "react";
import { Button, Card, Flex, Typography } from "antd";
const cardStyle = {
  width: 1200,
  textAlign: "center",
};
const imgStyle = {
  display: "block",
  width: 700,
};
const ImgCom = () => (
  <Card
    hoverable
    style={cardStyle}
    bodyStyle={{
      padding: 0,
      overflow: "hidden",
    }}
  >
    <Flex justify="space-between">
      <img alt="avatar" src="./Ferry.webp" style={imgStyle} />
      <Flex
        vertical
        align="flex-end"
        justify="space-between"
        style={{
          padding: 32,
        }}
      >
        <Typography.Title level={3}>
          “If you’re really ready to sail, then the sea, the wind and the ship will be ready too! You must be ready first for the universe to help you!” ”
        </Typography.Title>
        <Button type="primary" href="#" target="_blank">
          Book now
        </Button>
      </Flex>
    </Flex>
  </Card>
);
export default ImgCom;
