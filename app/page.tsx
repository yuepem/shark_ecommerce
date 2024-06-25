import Stripe from "stripe";
import Product from "./components/product";

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
  });

  const products = await stripe.products.list();

  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        id: product.id,
        image: product.images[0],
        name: product.name,
        description: product.description,
        price: prices.data[0].unit_amount,
        currency: prices.data[0].currency,
      };
    })
  );

  return productWithPrices;
};
export default async function Home() {
  const products = await getProducts();
  // return the component
  return (
    <main className="grid grid-cols-fluid gap-4 p-24">
      {products.map((product) => (
        <Product {...product} />
      ))}
    </main>
  );
}
