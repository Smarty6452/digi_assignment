import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteCategory, fetchCategories, updateCategory } from '../redux/reducer/CategorySlice';

const CategoryTable = ({ data }) => {
  const dispatch = useDispatch();
  const [editingCategory, setEditingCategory] = useState(null);

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleUpdate = async (updatedCategory) => {
    try {
      await dispatch(updateCategory(updatedCategory));
      setEditingCategory(null);
      await dispatch(fetchCategories());
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await dispatch(deleteCategory(categoryId));
        await dispatch(fetchCategories());
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories());
    };
    fetchData();
  }, [dispatch]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: (row, index) => index + 1,
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({ value }) => <span>{value}</span>,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => (
          <span className={` ${value === 'active' ? 'text-green-500' : 'text-red-500'}`}>
            {value}
          </span>
        ),
      },
      {
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="flex gap-5">
            <FiEdit className="text-gray cursor-pointer" onClick={() => handleEdit(row.original)} />
            <FiTrash2 className="text-gray cursor-pointer" onClick={() => handleDelete(row.original._id)} />
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
      <table {...getTableProps()} className="w-full table-auto border-collapse" style={{ borderSpacing: '0 10px', borderCollapse: 'separate' }}>
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
              <tr {...row.getRowProps()} className={`${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-2" key={cell.getCellProps().key}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {editingCategory && (
        <EditModal
          category={editingCategory}
          onUpdate={handleUpdate}
          onClose={() => setEditingCategory(null)}
        />
      )}
    </div>
  );
};

const EditModal = ({ category, onUpdate, onClose }) => {
  const [editedCategory, setEditedCategory] = useState({ ...category });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedCategory);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editedCategory.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={editedCategory.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={editedCategory.status}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className=" border text-primary border-primary hover:bg-gray-700  font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CategoryTable;
  
