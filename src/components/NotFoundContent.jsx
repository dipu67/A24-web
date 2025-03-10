"use client"

import { useSearchParams } from 'next/navigation'

export default function NotFoundContent() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[400px] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          {from ? `The page "${from}" was not found.` : "The page you&apos;re looking for doesn&apos;t exist."}
        </p>
      </div>
    </div>
  )
} 