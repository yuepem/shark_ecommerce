'use client'

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Cart from './Cart'
import { useCartStore } from '@/store'
import {AiFillShopping } from 'react-icons/ai'

export default function Nav({ user }: Session) {
    const cartStore = useCartStore()
    return (
        <nav className='flex justify-between items-center py-2 px-4'>
            <Link href={'/'}>
                <h1>Home</h1>
            </Link>
            
            <ul onClick={() => cartStore.toggleCart()} className='flex items-center gap-12'>
                <li className='flex items-center text-3xl relative cursor-pointer'>
                    <AiFillShopping />
                    <span className='bg-teal-500 text-white text-sm font-bold  px-1 py-1 w-5 h-5 rounded-full absolute -top-2 -right-2 flex items-center justify-center'>
                        {cartStore.cart.length}
                    </span>
                </li>
                {!user && (
                    <li className='bg-teal-500 text-white px-2 py-1 rounded-md'>
                        <button onClick={() => signIn()}>Sign in </button>
                    </li>

                )}
                {user && (
                    <>
                        <li className='w-auto h-auto'>
                            <Image
                                src={user?.image as string}
                                width={50} height={50}
                                alt="user avatar"
                                className='rounded-full '
                            />
                        </li>
                    </>
                )}
            </ul>
            {cartStore.isOpen && <Cart />}
        </nav>
    )
}