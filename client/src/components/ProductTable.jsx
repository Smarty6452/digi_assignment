import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteProduct, fetchProducts, updateProduct } from '../redux/reducer/ProductSlice';

const ProductTable = ({ products }) => {
  const dispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await dispatch(updateProduct(updatedProduct));
      setEditingProduct(null);
      await dispatch(fetchProducts());
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(productId)); 
        await dispatch(fetchProducts());
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts());
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
            <FiEdit
              className="text-gray cursor-pointer"
              onClick={() => handleEdit(row.original)}
            />
            <FiTrash2
              className="text-gray cursor-pointer"
              onClick={() => handleDelete(row.original._id)} // Use _id here
            />
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
  } = useTable({ columns, data: products });

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="w-full table-auto  border-collapse"
        style={{ borderSpacing: '0 10px', borderCollapse: 'separate' }}
      >
        <thead className="bg-[#FFF8B7]">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
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
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="p-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {editingProduct && (
        <EditModal
          product={editingProduct}
          onUpdate={handleUpdate}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

const EditModal = ({ product, onUpdate, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedProduct);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editedProduct.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="packSize">
                  Pack Size
                </label>
                <input
                  type="text"
                  name="packSize"
                  id="packSize"
                  value={editedProduct.packSize}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={editedProduct.category}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mrp">
                  MRP
                </label>
                <input
                  type="number"
                  name="mrp"
                  id="mrp"
                  value={editedProduct.mrp}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={editedProduct.image}
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
                  value={editedProduct.status}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
                  className="border text-primary border-primary hover:bg-gray-700  font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default ProductTable;

