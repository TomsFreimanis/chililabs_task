// ProductList.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "@/app/product-list/page";
import getAllProducts from "@lib/getAllProducts";


jest.mock("@lib/getAllProducts");

const mockedProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    price: 10,
    currency: "USD",
  },
  {
    id:2,
    name: "Product 2",
    category: "Category B",
    price: 20,
    currency: "EUR",
  },
];

beforeEach(() => {
  // Mock the implementation of getAllProducts
  (getAllProducts as jest.Mock).mockResolvedValue(mockedProducts);
});

test("renders ProductList component", async () => {
  render(<ProductList />);

  // Wait for the loading state to finish
  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  // Check if the products are rendered
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.getByText("Product 2")).toBeInTheDocument();
});

test("filters products based on search term", async () => {
  render(<ProductList />);

  // Wait for the loading state to finish
  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  // Type in the search input
  fireEvent.change(screen.getByPlaceholderText("Search by product name"), {
    target: { value: "Product 1" },
  });

  // Check if the filtered product is rendered
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.queryByText("Product 2")).toBeInTheDocument();
});
