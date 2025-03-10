"use client"

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import NotFoundContent from '@/components/NotFoundContent'

export default function NotFound() {
  return <NotFoundContent />
} 