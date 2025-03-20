import { useRouter } from 'next/router';
//tá usando isso pra não ter que ter um file pra cada produto, já tem no projeto no github, mas tem que implementar os produtos
const ProductPage = ({ product }) => {
  const router = useRouter();

  // If page is not yet generated (fallback mode), show loading
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold text-blue-500">${product.price}</p>
    </div>
  );
};

// Fetch product data before rendering (SSG with getStaticProps)
export async function getStaticProps({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: { product },
    revalidate: 10, // Revalidate every 10 seconds (optional)
  };
}

// Tell Next.js what pages to pre-generate
export async function getStaticPaths() {
  const res = await fetch('https://nome-da-api.com/produtos');
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: true }; // fallback: true enables on-demand generation
}

export default ProductPage;
