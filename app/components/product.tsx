import formatPrice from '@/util/PriceFormat';
import Image from 'next/image'
import Link from 'next/link';

type ProductProps = {
    name: string;
    image: string;
    description: string;
    price: number | null;
    id: string;
};

export default function Product({ name, image, description, price, id }: ProductProps) {
    return (
        <Link
            href={{ pathname: `/product/${id}`, query: { name, image, price, id, description } }}
        >
            <div >
                <Image src={image} width={200} height={200} alt={name} />
                <h1 className='font-medium py-2'> {name} </h1>
                <h2 className='text-sm text-primary'>
                    {price !== null ? formatPrice(price) : 'N/A'}
                </h2>
                <p className='text-sm font-style: italic py-2'>
                    {description}
                </p>
            </div>
        </Link>
    )
}