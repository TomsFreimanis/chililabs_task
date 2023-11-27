import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from '@/app/product-list/page'; // Make sure to import the correct path

// Mock getAllProducts function
jest.mock('../lib/getAllProducts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ProductList', () => {
  // Sample product data for testing
  const sampleProducts = [
    { id: 1, name: 'Product 1', category: 'Electronics', price: 19.99, currency: 'USD' },
    { id: 2, name: 'Product 2', category: 'Clothing', price: 29.99, currency: 'USD' },
    // Add more sample products as needed
  ];

  beforeEach(() => {
    // Reset the mock implementation before each test
    require('../lib/getAllProducts').default.mockReset();
  });

  it('renders product list with initial data', async () => {
    // Set the mock implementation for getAllProducts
    require('../lib/getAllProducts').default.mockResolvedValueOnce({ products: sampleProducts });

    render(<ProductList />);

    // Wait for the product list to be rendered
    await waitFor(() => {
      expect(screen.getByText('Product List')).toBeInTheDocument();
      
      // Add more assertions as needed
    });
  });

  it('filters products based on search term', async () => {
    // Set the mock implementation for getAllProducts
    require('../lib/getAllProducts').default.mockResolvedValueOnce({ products: sampleProducts });

    render(<ProductList />);

    // Wait for the product list to be rendered
    await waitFor(() => {
      // Initial product count
      expect(screen.getAllByRole('link')).toHaveLength(2);

      // Simulate entering a search term
     

      // Wait for the filtered product list to be rendered
   ;
    });
  });
});
