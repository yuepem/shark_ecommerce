'use client'

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'

import Image from 'next/image'

export default function Nav({ user }: Session) {
    return (
        <nav className='flex justify-between items-center py-5'>
            <h1> NavBar </h1>
            <ul>
                {!user && (
                    <li className='bg-teal-500 text-white px-2 py-1 rounded-md'>
                        <button onClick={() => signIn()}>Sign in </button>
                    </li>

                )}
                {user && (
                    <>
                        <li>
                            <Image
                                src={user?.image as string}
                                width={50} height={50}
                                alt="user avatar"
                                className='rounded-full'
                            />
                        </li>
                        <li>Dashboard</li>
                    </>
                )}
            </ul>
        </nav>
    )
}