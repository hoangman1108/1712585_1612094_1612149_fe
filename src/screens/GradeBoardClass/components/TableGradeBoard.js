import React from "react";
import { useTable, usePagination } from "react-table";
import BTable from "react-bootstrap/Table";
import { BsPencilSquare } from "react-icons/bs";

function TableGradeBoard({ columns, data, onEdit }) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      usePagination
    );
  return (
    <>
      <BTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="text-center bg-secondary tr-header-table"
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {
                        cell.column.Header === "Action" ? (
                          <BsPencilSquare
                            onClick={onEdit.bind(this, cell.row.original)}
                            style={{ marginLeft: "10px", fontSize: "20px", cursor: 'pointer' }}
                          />
                        ) : cell.render("Cell")
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>
    </>
  );
}

export default TableGradeBoard;
