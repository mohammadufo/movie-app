'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => router.back()}
      className="mb-6"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </Button>
  )
}
