// Added use client to make client component
'use client';

import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Modal, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

// Assigning types for variable
interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  reviews?: Review[];
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images?: string[];
  thumbnail?: string;
}

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  // State to manage the modal open/close and the selected product
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Function to handle opening the modal and fetching product details
  const handleOpenModal = async (productId: number) => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      setSelectedProduct(data);
      setOpen(true);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  };
  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpen(false);
  };
  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          onClick={() => handleOpenModal(params.row.id)}
          className='review_btn'
        >
          View Reviews
        </Button>
      ),
      cellClassName: 'actions-column',
      headerClassName: 'actions-column-header',
    },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'price', headerName: 'Price', width: 110 },
    { field: 'discountPercentage', headerName: 'Discount (%)', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 110 },
    { field: 'stock', headerName: 'Stock', width: 110 },
    { field: 'tags', headerName: 'Tags', width: 200 },
    { field: 'brand', headerName: 'Brand', width: 150 },
  ];

  return (
    <div>
      <div className='tabel_width'>
        <div className='title'>
          <span className='tit-border'>Product</span> Table
        </div>
        <DataGrid rows={products} columns={columns} />
        {/* Modal to display product reviews */}
        <Modal open={open} onClose={handleCloseModal}>
          <Box
            sx={{
              width: 600,
              padding: 2,
              bgcolor: 'background.paper',
              margin: 'auto',
              marginTop: '20%',
            }}
          >
            <Typography variant='h5' className='mb-3'>
              Product Review
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
                marginTop: 2,
                border: '1px dashed red',
                padding: '20px !important',
              }}
            >
              {selectedProduct ? (
                <>
                  <Typography variant='body1'>
                    <span className='d-flex fw-bold'>Title</span>{' '}
                    {selectedProduct.title}
                  </Typography>
                  <Typography variant='body1'>
                    <span className='d-flex fw-bold'>Category</span>{' '}
                    {selectedProduct.category}
                  </Typography>
                  <Typography variant='body1'>
                    <span className='d-flex fw-bold'>Price</span> $
                    {selectedProduct.price}
                  </Typography>
                  <Typography variant='body1'>
                    <span className='d-flex fw-bold'>Discount</span>{' '}
                    {selectedProduct.discountPercentage}%
                  </Typography>
                  <Typography variant='body1'>
                    <span className='d-flex fw-bold'>Rating</span>{' '}
                    {selectedProduct.rating}
                  </Typography>
                  <Typography variant='body1'>
                    <span className='d-flex fw-bold'>Stock</span>{' '}
                    {selectedProduct.stock}
                  </Typography>
                  <Typography variant='body1'>
                    <span className='d-flex fw-bold'>Tags</span>{' '}
                    {selectedProduct.tags.join(', ')}
                  </Typography>
                  <Typography variant='body1'>
                    <span className='d-flex fw-bold'>Brand</span>{' '}
                    {selectedProduct.brand}
                  </Typography>
                  <Typography variant='subtitle1'>
                    <span className='d-flex fw-bold'>Description</span>{' '}
                    {selectedProduct.description}
                  </Typography>
                </>
              ) : (
                <Typography variant='body2'>Loading...</Typography>
              )}
            </Box>
            <div className='text-end'>
              {' '}
              <Button
                onClick={handleCloseModal}
                sx={{ marginTop: 2 }}
                className='close_btn'
              >
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ProductsTable;
