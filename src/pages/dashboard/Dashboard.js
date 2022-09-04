import React, { useState, useEffect } from "react";

import { Row, Col, Card } from "antd";
import {
  EditOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteFilled,
} from "@ant-design/icons";

import "./Dashboard.css";
import {
  DashboardDetails,
  EditUserDetailModal,
} from "../../shared/pages_common";

import { useSelector, useDispatch } from "react-redux";
import { usersListApi, setUserList } from "../../toolkit/features/UsersSlice";

const { Meta } = Card;

const Dashboard = (props) => {
  const {} = props;

  // state
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  // useSelector
  const { usersList } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    dispatch(usersListApi());
  }, []);

  // favorite handler
  const favoriteHandler = (val) => {
    const finalUsersList = usersList.map((obj) => {
      if (obj.id === val.id) {
        return { ...obj, favorite: val.favorite ? false : true };
      }

      return obj;
    });

    dispatch(setUserList(finalUsersList));
  };

  // edit handler
  const editHandler = (val) => {
    setSelectedUser(val);

    setOpen(true);
  };

  // delete handler
  const deleteHandler = (val) => {
    let tempUsersListArr = usersList.filter((data) => data.id !== val.id);

    dispatch(setUserList(tempUsersListArr));
  };

  // renderItem
  const renderItem =
    usersList.length > 0
      ? usersList.map((obj, index) => {
          return (
            <Col span={6} key={index}>
              <Card
                style={{
                  width: 300,
                }}
                cover={<img alt="example" src={obj.img} />}
                actions={[
                  obj.favorite ? (
                    <HeartFilled
                      key="heart"
                      style={{ color: "red" }}
                      onClick={favoriteHandler.bind(this, obj)}
                    />
                  ) : (
                    <HeartOutlined
                      key="heart"
                      style={{ color: "red" }}
                      onClick={favoriteHandler.bind(this, obj)}
                    />
                  ),
                  <EditOutlined
                    key="edit"
                    onClick={editHandler.bind(this, obj)}
                  />,
                  <DeleteFilled
                    key="delete"
                    onClick={deleteHandler.bind(this, obj)}
                  />,
                ]}
              >
                <Meta
                  title={obj.name}
                  description={<DashboardDetails value={obj} />}
                />
              </Card>
            </Col>
          );
        })
      : null;

  return (
    <>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {renderItem}
      </Row>

      <EditUserDetailModal
        open={open}
        selectedUser={selectedUser}
        setOpen={(val) => setOpen(val)}
      />
    </>
  );
};

export { Dashboard };
