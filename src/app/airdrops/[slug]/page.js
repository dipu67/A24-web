'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Users, Coins, ExternalLink } from 'lucide-react'

// This would come from your API/database in a real app
const airdropData = {
  jupiter: {
    name: "Jupiter",
    logo: "/project-logos/jupiter.svg",
    headerImage: "/project-headers/jupiter.jpg",
    description: "Jupiter is a key liquidity aggregator in the Solana ecosystem, providing the best swap rates through intelligent routing.",
    longDescription: `Jupiter is revolutionizing DeFi on Solana by offering:
    • Best-in-class swap aggregation
    • Advanced trading features
    • Deep liquidity integration
    • Cross-chain capabilities
    
    The Jupiter airdrop rewards early users and contributors to the ecosystem.`,
    value: "5,000",
    endDate: "2024-03-31",
    status: "Active",
    eligibility: [
      "Used Jupiter swap at least once",
      "Minimum trading volume of $100",
      "Held SOL for at least 30 days",
      "Participated in Solana DeFi"
    ],
    steps: [
      "Connect your Solana wallet",
      "Check eligibility on Jupiter's website",
      "Complete required trading volume",
      "Claim tokens when airdrop is live"
    ],
    socialLinks: {
      website: "https://jup.ag",
      twitter: "https://twitter.com/JupiterExchange",
      discord: "https://discord.gg/jupiter",
      telegram: "https://t.me/jupiter_exchange"
    },
    tokenomics: {
      totalSupply: "1,000,000,000",
      airdropAllocation: "100,000,000",
      initialPrice: "$0.50",
      vesting: "6 months linear vesting"
    }
  },
  "monad": {
    name: "Monad",
    logo: "/project-logos/monad.svg",
    headerImage: "/project-headers/monad.jpg",
    description: "Monad is a high-performance Layer 1 blockchain designed for maximum throughput and minimal latency, offering a unique airdrop opportunity for early participants.",
    longDescription: `Monad is revolutionizing blockchain performance with its innovative Layer 1 solution. The platform combines high throughput with minimal latency, making it ideal for complex DeFi applications and large-scale blockchain operations.

The Monad airdrop rewards early adopters and active community members who participate in various ecosystem activities, from testnet participation to community engagement.`,
    value: "Unknown",
    endDate: "2024-06-30",
    status: "Active",
    eligibility: [
      "Active Ethereum wallet with transaction history",
      "Participation in Monad testnet activities",
      "Completion of Layer3 quests",
      "Discord community engagement",
      "Optional: Wormhole token staking"
    ],
    steps: [
      "Complete testnet activities (token interactions, Fantasy tournament, etc.)",
      "Mint NFTs on testnet through various collections",
      "Complete Layer3 quests and community tasks",
      "Engage actively in Discord community",
      "Optional: Stake Wormhole tokens for additional benefits"
    ],
    socialLinks: {
      website: "https://monad.xyz",
      twitter: "https://twitter.com/monad",
      discord: "https://discord.gg/monad",
      telegram: "https://t.me/monad_official"
    },
    tokenomics: {
      totalSupply: "To be announced",
      airdropAllocation: "To be announced",
      initialPrice: "To be announced",
      vesting: "Details pending"
    }
  },
  // Add more airdrops here
}

export default function AirdropPage() {
  const params = useParams()
  const airdrop = airdropData[params.slug]

  if (!airdrop) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">Airdrop not found</h1>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'Upcoming':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'Past':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <Image
          src={airdrop.headerImage}
          alt={airdrop.name}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto relative h-full flex items-end pb-8">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background">
              <Image
                src={airdrop.logo}
                alt={airdrop.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{airdrop.name}</h1>
                <Badge className={getStatusColor(airdrop.status)}>
                  {airdrop.status}
                </Badge>
              </div>
              <p className="text-lg text-white/90 max-w-2xl">
                {airdrop.description}
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
                <CardTitle>About the Airdrop</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{airdrop.longDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {airdrop.eligibility.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="min-w-4 mt-1">•</div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How to Participate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {airdrop.steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-muted">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Airdrop Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Estimated Value:</span>
                  <span className="font-medium">${airdrop.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">End Date:</span>
                  <span className="font-medium">{airdrop.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Total Supply:</span>
                  <span className="font-medium">{airdrop.tokenomics.totalSupply}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Vesting:</span>
                  <span className="font-medium">{airdrop.tokenomics.vesting}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Official Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(airdrop.socialLinks).map(([platform, url]) => (
                  <Button
                    key={platform}
                    variant="outline"
                    className="w-full justify-start gap-2"
                    asChild
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 