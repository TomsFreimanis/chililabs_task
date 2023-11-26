export default async function getAllProducts() {
    const res = await fetch(
      "https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd"
    );
    if (!res.ok) throw new Error("Failed to fetch data");
  
    const data = await res.json();
  
    // Assuming 'data' is an object with a 'products' property containing the array
    const products = data.products || [];
  
    return products;
  }
  