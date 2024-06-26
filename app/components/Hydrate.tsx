'use client'
import { ReactNode, useEffect, useState } from "react"

export default function Hydrate({ children }: { children: React.ReactNode }) {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
    }),[]

    return (
        <>
            {hydrated ? <>{children}</> : <> Loading....</>}
        </>
    )
}