import { Button, Card, Modal } from "antd";
import { Layout, Space } from "antd";

import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";
import { observer } from "mobx-react-lite";
import cartStore from "../store/CartStore";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import ImgCom from "./ImgCom";
const { Option } = Select;
const { Header, Content } = Layout;

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
  backgroundColor: "#F0F9FD",
};

const HomePage = () => {
  const [ferryProducts, setFerryProducts] = useState([]);
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedFerry, setSelectedFerry] = useState(null);
  const [isTravelDateDisabled, setTravelDateDisabled] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch JSON data here
    fetch("/FerryProd.json")
      .then((response) => response.json())
      .then((data) => setFerryProducts(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const [areRequiredFieldsFilled, setRequiredFieldsFilled] = useState(false);

  const handleFormChange = () => {
    // Check if all required fields are filled
    form
      .validateFields()
      .then(() => {
        setRequiredFieldsFilled(true);
      })
      .catch(() => {
        setRequiredFieldsFilled(false);
      });
  };

  useEffect(() => {
    handleFormChange(); // Initially check the form
  }, []);

  const handleNationalityChange = (value) => {
    if (value === "Indian") {
      form.setFieldsValue({ passportNumber: "" });
    }
  };

  const handleAddPassenger = () => {
    form.validateFields().then((values) => {
      cartStore.addToCart(values);
      alert("Passenger added to the cart");
      form.resetFields();
      if (passengerCount > 1) {
        setPassengerCount(passengerCount - 1);
      } else {
        setModalOpen(false);
      }
      setTravelDateDisabled(true);
    });
  };

  const validateForm = () => {
    
    form
      .validateFields()
      .then(() => {
        setRequiredFieldsFilled(true);
      })
      .catch(() => {
        setRequiredFieldsFilled(false);
      });
  };

  useEffect(() => {
    validateForm(); 
  }, []);

  const handleOk = () => {
    form.validateFields().then((values) => {
      cartStore.addToCart(values);
      cartStore.getFerryName(selectedFerry);
      // navigate("/checkout");
      setModalOpen(false);
      setModal2Open(false);
      form.resetFields();
      if (passengerCount > 1) {
        setPassengerCount(passengerCount - 1);
      } else {
        setModalOpen(false);
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setModalOpen(false);
    setModal2Open(false);
  };
  const handleFerrySelection = (product) => {
    setSelectedFerry(product);
    setModal2Open(true);
  };
//passprt no validation
const renderPassportField = () => {
  const nationality = form.getFieldValue("nationality");
  if (nationality === "Other") {
    return (
      <Form.Item
        name="passportNumber"
        label="Passport Number"
        rules={[
          {
            required: true,
            message: "Please enter your passport number",
          },
        ]}
      >
        <Input />
      </Form.Item>
    );
  }
  return null;
};
  return (
    <>
      <Layout>
        <center>
          <center>
            <ImgCom />
          </center>
          <Content style={contentStyle}>
            {" "}
            <div>
              <section className="display">
                {ferryProducts.map((product, index) => (
                  <Card
                    key={index}
                    style={{
                      width: 300,
                      margin: "10px",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ maxWidth: "100%" }}
                    />
                    <h2 className="title">{product.title}</h2>
                    <p>{product.description}</p>
                    <Button
                      type="primary"
                      onClick={() => handleFerrySelection(product.title)}
                    >
                      Add to cart
                    </Button>
                  </Card>
                ))}
              </section>
              <section>
                <Modal
                  title="Add Traveller(s) Details"
                  centered
                  open={modal2Open}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  okButtonProps={{ disabled: !areRequiredFieldsFilled }}
                >
                  <Form
                    form={form}
                    name="passengerForm"
                    onValuesChange={handleFormChange}
                  >
                    <Form.Item
                      name="travelDate"
                      label="Travel Date"
                      rules={[
                        {
                          required: !isTravelDateDisabled,
                          message: "Please select a travel date",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "60%" }}
                        disabled={isTravelDateDisabled}
                        disabledDate={(current) => {
                          return current && current < moment().startOf("day");
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Invalid email" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="age"
                      label="Age"
                      rules={[
                        { required: true, message: "Please enter your age" },
                      ]}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="gender" label="Gender">
                      <Select style={{ width: "100%" }}>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="nationality" label="Nationality">
                      <Select
                        style={{ width: "100%" }}
                        onChange={handleNationalityChange}
                      >
                        <Option value="Indian">Indian</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                    {renderPassportField()}

                    <Button
                      type="default"
                      onClick={handleAddPassenger}
                      disabled={!areRequiredFieldsFilled}
                    >
                      Add Another Passenger
                    </Button>
                  </Form>
                </Modal>
              </section>
            </div>
          </Content>
        </center>
      </Layout>
    </>
  );
};

export default observer(HomePage);
