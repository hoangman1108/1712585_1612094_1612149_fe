import React from 'react'
import { Container } from 'react-bootstrap'
import According from '../../components/According'
import TabsDetail from '../ClassScreen/components/TabsDetail'

export default function DiscussClass() {
  return (
    <Container>
      <TabsDetail />
      <According/>
    </Container>
  )
}