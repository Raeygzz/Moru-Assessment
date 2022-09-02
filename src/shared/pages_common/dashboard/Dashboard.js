import React from "react";

import { MailOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";

const Details = ({ value }) => {
  // console.log("value ==> ", value);

  return (
    <>
      <MailOutlined /> {value.email}
      <br />
      <PhoneOutlined /> {value.phone}
      <br />
      <GlobalOutlined /> {value.website}
    </>
  );
};

export { Details };
