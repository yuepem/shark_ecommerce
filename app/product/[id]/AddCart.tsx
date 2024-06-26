"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartTypes";
import { useState } from "react";

export default function AddCart({
  id,
  name,
  image,
  price,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, image, price, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <button
      className="my-12 text-black py-2 px-6 font-medium rounded-md outline"
      disabled={added}
      onClick={handleAddToCart}
    >
      {!added && <span>Add to cart</span>}
      {added && <span>Adding to cart</span>}
    </button>
  );
}
