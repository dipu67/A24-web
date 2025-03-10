'use client'

import { useState } from 'react'
import { MainNav } from "@/components/MainNav"
import { AirdropCard } from "@/components/AirdropCard"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Sample data - in a real app, this would come from an API
const allAirdrops = [
  {
    name: "Jupiter",
    logo: "/project-logos/jupiter.svg",
    description: "Jupiter is a key liquidity aggregator in the Solana ecosystem, providing the best swap rates through intelligent routing.",
    value: "5,000",
    endDate: "Mar 31, 2024",
    status: "Active",
    href: "/airdrops/jupiter"
  },
  {
    name: "LayerZero",
    logo: "/project-logos/layerzero.svg",
    description: "LayerZero is an omnichain interoperability protocol designed to enable message passing across chains.",
    value: "10,000",
    endDate: "Apr 15, 2024",
    status: "Upcoming",
    href: "/airdrops/layerzero"
  },
  {
    name: "Starknet",
    logo: "/project-logos/starknet.svg",
    description: "StarkNet is a permissionless decentralized ZK-Rollup operating as an L2 network over Ethereum.",
    value: "7,500",
    endDate: "Mar 25, 2024",
    status: "Active",
    href: "/airdrops/starknet"
  },
  {
    name: "Pyth Network",
    logo: "/project-logos/pyth.svg",
    description: "Pyth Network is a next-generation oracle solution delivering real-time market data.",
    value: "3,000",
    endDate: "Apr 5, 2024",
    status: "Active",
    href: "/airdrops/pyth"
  },
  {
    name: "Celestia",
    logo: "/project-logos/celestia.svg",
    description: "Celestia is the first modular blockchain network that enables anyone to deploy their own blockchain.",
    value: "4,500",
    endDate: "Mar 28, 2024",
    status: "Past",
    href: "/airdrops/celestia"
  },
  {
    name: "Eigenlayer",
    logo: "/project-logos/eigenlayer.svg",
    description: "EigenLayer is a protocol that enables restaking of assets to secure additional networks and services.",
    value: "15,000",
    endDate: "Apr 20, 2024",
    status: "Upcoming",
    href: "/airdrops/eigenlayer"
  },
];

export default function AirdropsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTab, setCurrentTab] = useState('all')

  // Filter airdrops based on search query and current tab
  const filteredAirdrops = allAirdrops.filter(airdrop => {
    const matchesSearch = airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         airdrop.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (currentTab === 'all') return matchesSearch
    if (currentTab === 'active') return matchesSearch && airdrop.status === 'Active'
    if (currentTab === 'upcoming') return matchesSearch && airdrop.status === 'Upcoming'
    if (currentTab === 'past') return matchesSearch && airdrop.status === 'Past'
    if (currentTab === 'my-airdrops') return matchesSearch && false // In a real app, check if user is participating
    
    return false
  })

  return (
    <div className="min-h-screen">
      <MainNav />
      <main className="container mx-auto py-6 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Airdrops</h1>
          <p className="text-xl text-muted-foreground">
            Discover and track the latest crypto airdrops
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search airdrops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
          <div className="relative w-full">
            <div className="overflow-auto pb-2 -mb-2">
              <TabsList className="w-full inline-flex whitespace-nowrap">
                <TabsTrigger className="flex-1" value="all">All</TabsTrigger>
                <TabsTrigger className="flex-1" value="active">Active</TabsTrigger>
                <TabsTrigger className="flex-1" value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger className="flex-1" value="past">Past</TabsTrigger>
                <TabsTrigger className="flex-1" value="my-airdrops">My Airdrops</TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value={currentTab} className="mt-6">
            {filteredAirdrops.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No airdrops found</h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? "Try adjusting your search query"
                    : "No airdrops available in this category yet"}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAirdrops.map((airdrop) => (
                  <AirdropCard key={airdrop.name} {...airdrop} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
} 