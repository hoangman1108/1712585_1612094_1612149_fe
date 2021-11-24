import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function CustomPagination({length, offset, limit, history}) {
  let items = [];
  for (let number = 0; number <= length / limit; number++) {
    items.push(
      <Pagination.Item key={number}
      active={number === offset - 1}
        onClick={()=>{
          history.push(`/classes?offset=${number+1}&limit=${limit}`)
        }}
      >
        {number + 1}
      </Pagination.Item>,
    );
  }
  return (
    <div>
      <Pagination className="justify-content-center">
        {items}
      </Pagination>
    </div>
  )
}
