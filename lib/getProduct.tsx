export default async function getProduct(id: string) {
    try {
      const res = await fetch(`https://run.mocky.io/v3/b54fe93f-f5a1-426b-a76c-e43d246901fd/${id}`);
  
      if (!res.ok) {
        throw new Error(`Failed to fetch product. Status: ${res.status}`);
      }
  
      return res.json();
    } catch (error) {
      // Instead of logging the error, throw it again
      throw error;
    }
  }
  