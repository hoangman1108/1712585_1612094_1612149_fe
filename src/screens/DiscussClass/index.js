import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListPost from "./components/ListPost";
import TabsDetail from "../ClassScreen/components/TabsDetail";

export default function DiscussClass() {
  const { me } = useSelector((state) => state.auth);
  console.log("me ne", me);
  return (
    <Container>
      <TabsDetail />
      <ListPost me={me} />
    </Container>
  );
}
