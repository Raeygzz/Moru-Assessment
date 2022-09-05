import React, { useState } from "react";

import { Row, Col, Modal, Input } from "antd";

import "./EditUserDetailModal.css";
import {
  NameSchema,
  EmailSchema,
  PhoneSchema,
  WebsiteSchema,
} from "../../../validations/userDetail";

import { useSelector, useDispatch } from "react-redux";
import { setUserList } from "../../../../toolkit/features/UsersSlice";

const EditUserDetailModal = (props) => {
  const { open, selectedUser, setOpen } = props;

  // state
  const [name, setName] = useState("");
  const [nameValidation, setNameValidation] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneValidation, setPhoneValidation] = useState(false);

  const [website, setWebsite] = useState("");
  const [websiteValidation, setWebsiteValidation] = useState(false);

  // useSelector
  const { usersList } = useSelector((state) => state.users);

  // dispatch
  const dispatch = useDispatch();

  // handleOK
  const handleOk = async (e) => {
    e.preventDefault();

    const validName = await NameSchema.isValid({ name: name });
    validName ? setNameValidation(false) : setNameValidation(true);

    const validEmail = await EmailSchema.isValid({ email: email });
    validEmail ? setEmailValidation(false) : setEmailValidation(true);

    let validPhone = await PhoneSchema.isValid({ phone: phone });
    validPhone ? setPhoneValidation(false) : setPhoneValidation(true);

    if (phone.length != 10) {
      setPhoneValidation(true);
      return;
    }

    const validWebsite = await WebsiteSchema.isValid({ website: website });
    validWebsite ? setWebsiteValidation(false) : setWebsiteValidation(true);

    if (validName && validEmail && validPhone && validWebsite) {
      const finalUsersList = usersList.map((obj) => {
        if (obj.id === selectedUser.id) {
          return {
            ...obj,
            name: name,
            email: email,
            phone: phone,
            website: website,
          };
        }

        return obj;
      });

      dispatch(setUserList(finalUsersList));

      setOpen(false);
    }
  };

  // handleCancel
  const handleCancel = () => {
    setName("");
    setNameValidation(false);
    setEmail("");
    setEmailValidation(false);
    setPhone("");
    setPhoneValidation(false);
    setWebsite("");
    setWebsiteValidation(false);

    setOpen(false);
  };

  return (
    <div className="modalStyle">
      <Modal
        title="Edit User"
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col offset={4} span={4}>
            <label>
              <span style={{ color: "red" }}>*</span> Name:
            </label>
          </Col>

          <Col span={16}>
            <Input
              type="text"
              placeholder=""
              status={nameValidation ? "error" : ""}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameValidation(false);
              }}
            />
          </Col>
        </Row>

        <br />

        <Row>
          <Col offset={4} span={4}>
            <label>
              <span style={{ color: "red" }}>*</span> Email:
            </label>
          </Col>

          <Col span={16}>
            <Input
              type="email"
              placeholder=""
              status={emailValidation ? "error" : ""}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailValidation(false);
              }}
            />
          </Col>
        </Row>

        <br />

        <Row>
          <Col offset={4} span={4}>
            <label>
              <span style={{ color: "red" }}>*</span> Phone:
            </label>
          </Col>

          <Col span={16}>
            <Input
              type="number"
              placeholder=""
              status={phoneValidation ? "error" : ""}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneValidation(false);
              }}
            />
          </Col>
        </Row>

        <br />

        <Row>
          <Col offset={4} span={4}>
            <label>
              <span style={{ color: "red" }}>*</span> Website:
            </label>
          </Col>

          <Col span={16}>
            <Input
              type="url"
              placeholder=""
              status={websiteValidation ? "error" : ""}
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
                setWebsiteValidation(false);
              }}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export { EditUserDetailModal };
