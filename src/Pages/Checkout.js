import React from "react";
import { observer } from "mobx-react-lite";
import cartStore from "../store/CartStore";
import { Layout, Space } from "antd";
import { Button } from "antd";
import "./Checkout.css";
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const Checkout = observer(() => {
  const cart = cartStore.cart;

  // Calculate the total amount payable based on the number of passengers and the ticket price
  const ticketPrice = 1200;
  const totalAmountPayable = cart.length * ticketPrice;
  console.log(cart);
  return (
    <>
      <div className="parent">
        <div className="child child1 ch-div">
          <h4>Order Summary</h4>
          <hr />
          <div>
            <h5>Ferry Name: {cartStore.name}</h5>
            <p className="summary-div">
              <span>Total Number of Passengers: </span>
              <span>{cart.length}</span>
            </p>
            <p className="summary-div">
              <span>Classic Ticket </span> <span>Rs.1200</span>
            </p>

            <hr />
            <p className="summary-div">
              <span>Total Amount Payable: </span>
              <span>Rs. {totalAmountPayable}</span>
            </p>
            <Button type="primary" onClick={() => alert("Booking complete ")}>
              Pay and Checkout
            </Button>
          </div>
        </div>

        <div className="child child2 ch-div">
          <div className="form-div">
            {cart.map((item, index) => (
              <div key={index}>
                <h3>Passenger :{index + 1}</h3>
                <ul>
                  <p>Name: {item.product.name}</p>
                  <p>Email: {item.product.email}</p>
                  <p>Age: {item.product.age}</p>
                  <p>Gender: {item.product.gender}</p>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default Checkout;
