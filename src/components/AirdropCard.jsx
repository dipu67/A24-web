'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function AirdropCard({ 
  name, 
  logo, 
  description, 
  value, 
  endDate, 
  status = "Active",
  slug = name.toLowerCase()
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-500'
      case 'Upcoming':
        return 'text-yellow-500'
      case 'Past':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src={logo}
              alt={name}
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
          </div>
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)} bg-current`} />
              <span>{status}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Value:</span>
            <span className="font-medium">${value}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">End Date:</span>
            <span className="font-medium">{endDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link 
          href={`/airdrops/${slug}`}
          className="w-full"
        >
          <Button className="w-full">
            Learn More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
} 