

import getProduct from "@lib/getProduct";

describe("getProduct", () => {
  it("fetches a product successfully", async () => {
    const mockProductId = "123";
    const mockProduct = { id: mockProductId, name: "Mock Product", price: 10 };

    // Mocking the global fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => mockProduct,
    });

    const product = await getProduct(mockProductId);

    expect(product).toEqual(mockProduct);

    // Assert that fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      `https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd/${mockProductId}`
    );
  });

  it("handles fetch failure", async () => {
    const mockProductId = "456";

    // Mocking the global fetch function to simulate a failed request
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    // Ensure that the function throws an error on a failed request
    await expect(getProduct(mockProductId)).rejects.toThrow("Failed to fetch product. Status: 404");
  });

  it("handles other errors", async () => {
    const mockProductId = "789";
  
    // Mocking the global fetch function to simulate a network error
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
  
    // Ensure that the function throws an error on a network error
    await expect(getProduct(mockProductId)).rejects.toThrow("Network error");
  });
  
});
