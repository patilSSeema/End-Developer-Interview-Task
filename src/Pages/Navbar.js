import React from "react";
import { Layout } from "antd";
import "../App.css";
import { Badge } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import cartStore from "../store/CartStore";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;

const headerStyle = {
  color: "#fff",

  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const Navbar = () => {
  const cart = cartStore.cart;
  return (
    <div style={{ marginBottom: "10px" }}>
      <Header style={headerStyle}>
        <div className="navdiv">
          <img src="./logo.png" />
          <h2>INSTADUKAN</h2>
          <Badge count={cart.length}>
            <Link to="/checkout" className="link">
              <ShoppingOutlined style={{ fontSize: "30px" }} />
            </Link>
          </Badge>
        </div>
      </Header>
    </div>
  );
};

export default Navbar;
