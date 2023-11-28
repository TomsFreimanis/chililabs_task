

import getAllProducts from "@lib/getAllProducts";

describe("getAllProducts", () => {
  it("fetches products successfully", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 20 },
    ];

    // Mocking the global fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ products: mockProducts }),
    });

    const products = await getAllProducts();

    expect(products).toEqual(mockProducts);

    // Assert that fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      "https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd"
    );
  });

  it("handles fetch failure", async () => {
    // Mocking the global fetch function to simulate a failed request
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    // Ensure that the function throws an error on a failed request
    await expect(getAllProducts()).rejects.toThrow("Failed to fetch data");
  });
});
