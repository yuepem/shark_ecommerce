import Image from 'next/image'
export default function Product({name, image, description, price} ) {
    return (
        <div>
            <Image src={image} width={200} height={200} alt={name} />
            <h1> {name} </h1>
            <span>{price}</span> 
            <p>{description}</p>
        </div>
    )
}