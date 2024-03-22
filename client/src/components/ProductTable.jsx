import React from 'react';
import { useTable } from 'react-table';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const ProductTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: 'Pack Size',
        accessor: 'packSize',
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: 'Category',
        accessor: 'category',
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: 'MRP',
        accessor: 'mrp',
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ value }) => <img src={value} alt="Product Image" className="h-10 w-10" />,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => (
          <span className={`${value === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{value}</span>
        ),
      },
      {
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="flex gap-4">
            <FiEdit className="text-gray cursor-pointer" />
            <FiTrash2 className="text-gray cursor-pointer" />
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="w-full table-auto  border-collapse"
      style={{ borderSpacing: '0 10px', borderCollapse: 'separate' }}>
        <thead className="bg-[#FFF8B7]">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="p-2 text-left">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
              >
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="p-2">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
