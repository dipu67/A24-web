'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { format } from "date-fns"

// Demo data - replace with API call in production
const blogPosts = [
  {
    id: '1',
    title: "Understanding Jupiter's Tokenomics",
    slug: "understanding-jupiters-tokenomics",
    excerpt: "A deep dive into Jupiter's token distribution and utility...",
    author: "John Doe",
    publishedAt: "2024-03-15",
  },
  {
    id: '2',
    title: "LayerZero Airdrop Guide",
    slug: "layerzero-airdrop-guide",
    excerpt: "Complete guide to participating in the LayerZero airdrop...",
    author: "Jane Smith",
    publishedAt: "2024-03-10",
  },
]

export default function BlogPage() {
  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Latest insights and guides about crypto airdrops
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="space-y-1">
                    <CardTitle>{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(post.publishedAt), 'MMMM d, yyyy')} • {post.author}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 