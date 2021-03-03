import React from "react";
import {
  Button
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";

import { Layout } from "../../AT3K/layouts";

export default function Dashboard(props) {
  return (
    <>
      <PageTitle title="Dashboard"/>
      <Layout />
    </>
  );
}

