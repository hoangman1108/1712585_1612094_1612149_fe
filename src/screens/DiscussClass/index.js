import React from "react";
import { Container } from "react-bootstrap";
import ListPost from "./components/ListPost";
import TabsDetail from "../ClassScreen/components/TabsDetail";

export default function DiscussClass() {
  return (
    <Container>
      <TabsDetail />
      <ListPost />
    </Container>
  );
}
