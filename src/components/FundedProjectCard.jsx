'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export function FundedProjectCard({ 
  name, 
  logo, 
  description, 
  raisedAmount, 
  investors,
  category,
  href = "#" 
}) {
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
            <CardDescription>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary">
                {category}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Raised Amount:</span>
            <span className="font-medium">${raisedAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Investors:</span>
            <span className="font-medium">{investors}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link 
          href={href}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
} 