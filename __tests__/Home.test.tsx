// Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Ensure this import is present

import Home from '@/app/page'; // Adjust the import path based on your project structure

describe('Home Component', () => {
  test('renders welcome message and link to product list', () => {
    render(<Home />);

    // Check if the welcome message is rendered
    const welcomeMessage = screen.getByText('Welcome to My Products App');
    expect(welcomeMessage).toBeInTheDocument();

    // Check if the link to the product list is rendered with the correct text and href
    const productListLink = screen.getByText('Explore our amazing products on the Product List page');
    expect(productListLink).toBeInTheDocument();
    expect(productListLink.tagName).toBe('A'); // Ensure it is an anchor element
    expect(productListLink).toHaveAttribute('href', '/product-list');
  });
});
