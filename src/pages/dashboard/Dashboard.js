import React, { useEffect } from "react";

import { Row, Col, Card } from "antd";
import {
  EditOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteFilled,
} from "@ant-design/icons";

import "./Dashboard.css";
import { Details } from "../../shared/pages_common";

import { useSelector, useDispatch } from "react-redux";
import { usersListApi } from "../../toolkit/features/UsersSlice";

const { Meta } = Card;

const Dashboard = (props) => {
  const {} = props;

  // useSelector
  const { usersList } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersListApi());
  }, []);

  // favorite handler
  const favoriteHandler = (val) => {
    console.log("favorite ==> ", val);
  };

  // edit handler
  const editHandler = (val) => {
    console.log("edit ==> ", val);
  };

  // delete handler
  const deleteHandler = (val) => {
    console.log("delete ==> ", val);
  };

  const renderItem =
    usersList.length > 0
      ? usersList.map((obj, index) => {
          // console.log("obj ==> ", obj, index);

          return (
            <Col span={6} key={index}>
              <Card
                style={{
                  width: 300,
                }}
                cover={<img alt="example" src={obj.img} />}
                actions={[
                  false ? (
                    <HeartOutlined
                      key="heart"
                      style={{ color: "red" }}
                      onClick={favoriteHandler.bind(this, obj)}
                    />
                  ) : (
                    <HeartFilled
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
                <Meta title={obj.name} description={<Details value={obj} />} />
              </Card>
            </Col>
          );
        })
      : null;

  // console.log("usersList ==> ", usersList);
  return (
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
  );
};

export { Dashboard };
