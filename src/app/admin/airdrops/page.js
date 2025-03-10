'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AirdropDialog } from "@/components/AirdropDialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { format } from "date-fns"

// In a real app, this would come from an API
const initialAirdrops = [
  {
    id: '1',
    name: "Jupiter",
    logo: "/project-logos/jupiter.svg",
    description: "Jupiter is a key liquidity aggregator in the Solana ecosystem.",
    value: "5000",
    endDate: "2024-03-31",
    status: "Active",
  },
  {
    id: '2',
    name: "LayerZero",
    logo: "/project-logos/layerzero.svg",
    description: "LayerZero is an omnichain interoperability protocol.",
    value: "10000",
    endDate: "2024-04-15",
    status: "Upcoming",
  },
]

export default function AdminAirdrops() {
  const [airdrops, setAirdrops] = useState(initialAirdrops)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTab, setCurrentTab] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAirdrop, setEditingAirdrop] = useState(null)

  const handleEdit = (airdrop) => {
    setEditingAirdrop({ ...airdrop })
    setDialogOpen(true)
  }

  const handleAdd = () => {
    setEditingAirdrop(null)
    setDialogOpen(true)
  }

  const handleSave = async (formData) => {
    if (editingAirdrop?.id) {
      // Update existing airdrop
      setAirdrops(airdrops.map(airdrop => 
        airdrop.id === editingAirdrop.id ? { ...formData, id: airdrop.id } : airdrop
      ))
    } else {
      // Add new airdrop
      setAirdrops([...airdrops, { ...formData, id: Date.now().toString() }])
    }
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this airdrop?')) {
      setAirdrops(airdrops.filter(airdrop => airdrop.id !== id))
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingAirdrop(null)
  }

  const filteredAirdrops = airdrops.filter(airdrop => {
    const matchesSearch = 
      airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airdrop.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (currentTab === 'all') return matchesSearch
    return matchesSearch && airdrop.status.toLowerCase() === currentTab.toLowerCase()
  })

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Airdrops</h1>
          <p className="text-muted-foreground">
            Add, edit, or remove airdrops from the platform
          </p>
        </div>
        <Button onClick={handleAdd}>
          Add New Airdrop
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <Input
          placeholder="Search airdrops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex-1 min-w-0">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAirdrops.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <p className="text-lg font-medium">No airdrops found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery 
                    ? "Try adjusting your search query"
                    : "No airdrops available in this category"}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAirdrops.map(airdrop => (
            <Card key={airdrop.id} className="overflow-hidden">
              <CardHeader className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border">
                      <Image
                        src={airdrop.logo}
                        alt={airdrop.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        {airdrop.name}
                        <Badge className={getStatusColor(airdrop.status)}>
                          {airdrop.status}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {airdrop.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(airdrop)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(airdrop.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="border-t bg-muted/50 p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium">Value</p>
                    <p className="text-2xl font-bold">${parseInt(airdrop.value).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-2xl font-bold">{format(new Date(airdrop.endDate), 'MMM d, yyyy')}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-2xl font-bold">{airdrop.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AirdropDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        airdrop={editingAirdrop}
      />
    </div>
  )
} 