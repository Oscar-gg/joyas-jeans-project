import React, { useEffect, useState } from 'react';

const BrandPage = () => {
  // Placeholder data for card models (you can replace this with API data)
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description for Product 1', imageUrl: 'product1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', imageUrl: 'product2.jpg' },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', imageUrl: 'product3.jpg' },
  ]);

  // Fetch products from an API
  // useEffect(() => {
  //   fetch('API_URL_HERE')
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);

  return (
    <div>
      {/* Banner Section */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Levis</h1>
      </section>

      {/* Card Models Section */}
      <section className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2">
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-4" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BrandPage;