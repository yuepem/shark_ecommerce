import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
// import React from "react";
interface SearchParams {
  image: string;
  name: string;
  price: number;
  description: string;
}
export default async function ProductPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // for test the props content
  // console.log("protectName:========= ",searchParams.description)
  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image
        src={searchParams.image}
        width={600}
        height={600}
        alt={searchParams.name}
      />
      <div>
        <h1>{searchParams.name}</h1>
        <p>{searchParams.description}</p>
        <div className="flex gap-2">
          <p className="font-bold text-teal-700">
            {searchParams.price && formatPrice(searchParams.price)}
          </p>
        </div>
        <button className="my-12 text-black py-2 px-6 font-medium rounded-md outline">
          Add to cart
        </button>
      </div>
    </div>
  );
}
