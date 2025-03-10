'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

// Demo data - replace with API call in production
const blogPosts = {
  "understanding-jupiters-tokenomics": {
    title: "Understanding Jupiter's Tokenomics",
    headerImage: "/project-headers/jupiter.jpg",
    logo: "/project-logos/jupiter.svg",
    category: "Tokenomics",
    content: `Jupiter is revolutionizing DeFi on Solana by offering best-in-class swap aggregation, advanced trading features, and deep liquidity integration.`,
    mainPoints: `• Best-in-class swap aggregation
• Advanced trading features
• Deep liquidity integration
• Cross-chain capabilities`,
    requirements: `Token Distribution:
• 40% Community Rewards & Airdrops
• 30% Team & Advisors (4-year vesting)
• 20% Treasury
• 10% Initial Liquidity`,
    steps: `Key Utility:
• Governance rights
• Fee sharing
• Staking rewards
• Platform discounts`,
    conclusion: `The airdrop will distribute tokens to early users based on their engagement with the platform, trading volume, and overall contribution to the ecosystem.`,
    author: "John Doe",
    publishedAt: "2024-03-15",
    tags: "jupiter, tokenomics, solana, defi",
  },
  "layerzero-airdrop-guide": {
    title: "LayerZero Airdrop Guide",
    headerImage: "/project-headers/layerzero.jpg",
    logo: "/project-logos/layerzero.svg",
    category: "Airdrop Guide",
    content: `LayerZero is an omnichain interoperability protocol that enables direct cross-chain communication. This guide will help you understand the upcoming airdrop and how to participate.`,
    mainPoints: `• Omnichain interoperability protocol
• Direct cross-chain communication
• Secure message passing
• Efficient bridging`,
    requirements: `Eligibility Requirements:
1. Bridge assets using LayerZero
2. Use multiple supported chains
3. Maintain minimum activity threshold
4. Hold required tokens`,
    steps: `Steps to Participate:
1. Connect your wallet
2. Check eligibility on official website
3. Complete required transactions
4. Wait for airdrop announcement
5. Claim tokens when live`,
    conclusion: `Tips for Success:
• Diversify your activity across chains
• Maintain regular protocol usage
• Follow official channels for updates
• Be cautious of scams`,
    author: "Jane Smith",
    publishedAt: "2024-03-10",
    tags: "layerzero, airdrop, cross-chain, blockchain",
  },
  "monad-airdrop-complete-guide": {
    title: "Monad Airdrop: Complete Guide to Tasks and Eligibility",
    headerImage: "/project-headers/monad.jpg",
    logo: "/project-logos/monad.svg",
    category: "Airdrop Guide",
    content: `Monad is launching an exciting airdrop opportunity for early participants and community members. This comprehensive guide will walk you through all the available tasks and activities to maximize your chances of qualifying for the Monad (MON) airdrop.`,
    mainPoints: `• Multiple participation methods available
• Testnet activities and NFT minting opportunities
• Layer3 quest completion options
• Discord community engagement rewards
• Wormhole staking integration`,
    requirements: `Eligibility Requirements:
• Active wallet with ETH transactions
• Participation in testnet activities
• Discord community engagement
• Completion of Layer3 quests
• Optional: Wormhole token staking`,
    steps: `Steps to Participate:

1. Monad Testnet Activities
• Request test tokens from available faucets
• Buy available tokens on testnet
• Participate in Fantasy tournament
• Interact with ecosystem projects
• Deploy tokens on Owlto
• Stake MON tokens on aPriori
• Earn credits on Talentum

2. NFT Minting (Testnet)
• Mint NFTs from various collections
• Participate in available mints on MagicEden
• Complete mints on platforms like Morkie, Nerzo, and DeMask

3. Layer3 Tasks
• Connect wallet to Layer3
• Complete available quests
• Engage with community tasks

4. Discord Engagement
• Join Monad Discord
• Earn community roles
• Contribute to discussions
• Participate in regional channels

5. Wormhole Staking (Optional)
• Purchase $W tokens
• Transfer to supported EVM network
• Delegate tokens for staking`,
    conclusion: `Tips for Success:
• Diversify your participation across all available activities
• Stay active in the Discord community
• Complete as many testnet interactions as possible
• Keep track of your progress on each platform
• Follow official channels for updates

Remember: The more activities you complete and the more engaged you are with the ecosystem, the better your chances of qualifying for the airdrop. Stay tuned for official announcements regarding the airdrop distribution date and token allocation details.`,
    author: "Crypto Guide Team",
    publishedAt: "2024-03-05",
    tags: "monad, airdrop, testnet, nft-minting, layer3, blockchain",
  },
}

export default function BlogPost() {
  const params = useParams()
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="text-muted-foreground">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <Image
          src={post.headerImage}
          alt={post.title}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto relative h-full flex items-end pb-8">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background">
              <Image
                src={post.logo}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{post.title}</h1>
                <Badge variant="secondary">
                  {post.category}
                </Badge>
              </div>
              <p className="text-white/90">
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')} • {post.author}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto mt-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{post.content}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {post.mainPoints.split('\n').map((point, index) => (
                    <p key={index} className="flex items-start gap-2">
                      <span className="mt-1">{point.startsWith('•') ? '' : '•'}</span>
                      <span>{point.startsWith('•') ? point.slice(2) : point}</span>
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {post.requirements.split('\n').map((req, index) => (
                    <p key={index} className="flex items-start gap-2">
                      <span className="mt-1">{req.startsWith('•') ? '' : '•'}</span>
                      <span>{req.startsWith('•') ? req.slice(2) : req}</span>
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Steps & Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {post.steps.split('\n').map((step, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {step.match(/^\d\./) ? (
                        <>
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-muted">
                            {step.split('.')[0]}
                          </div>
                          <p className="mt-0.5">{step.split('.').slice(1).join('.').trim()}</p>
                        </>
                      ) : (
                        <p className="flex items-start gap-2">
                          <span className="mt-1">{step.startsWith('•') ? '' : '•'}</span>
                          <span>{step.startsWith('•') ? step.slice(2) : step}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conclusion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {post.conclusion.split('\n').map((line, index) => (
                    <p key={index} className="flex items-start gap-2">
                      <span className="mt-1">{line.startsWith('•') ? '' : ''}</span>
                      <span>{line.startsWith('•') ? line.slice(2) : line}</span>
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Published on {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Link href="/blog">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 