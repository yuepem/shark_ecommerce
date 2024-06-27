"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import emptyBasket from "@/public/shopping-cart.png";

export default function Cart() {
  const cartStore = useCartStore();

  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12"
      >
        <h1>Cart:</h1>
        {cartStore.cart.map((item) => (
          <div className="flex justify-around py-4 gap-4" key={item.id}>
            <Image
              src={item.image as string}
              width={200}
              height={200}
              alt={item.name}
              className="rounded-md h-24"
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>
                <button
                  onClick={() =>
                    cartStore.removeProduct({
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      quantity: item.quantity,
                      total: item.total,
                    })
                  }
                >
                  <IoRemoveCircle />
                </button>
                <button
                  onClick={() =>
                    cartStore.addProduct({
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      quantity: item.quantity,
                      total: item.total,
                    })
                  }
                >
                  <IoAddCircle />
                </button>
              </div>

              <p className="text-sm">Price: {formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
       
        {cartStore.cart.length > 0 ? (
          <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
            Checkout
          </button>
        ) : (
          <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
            <h1>Your cart is empty!</h1>
            <Image src={emptyBasket} alt="empty basket" width={120} height={120}/>
          </div>
          
        )}
      </div>
    </div>
  );
}
