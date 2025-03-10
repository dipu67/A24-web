'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { BlogPostDialog } from "@/components/BlogPostDialog"
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog"
import { Trash2, Plus, Search, Undo2 } from "lucide-react"

// Demo data - replace with API call in production
const initialPosts = [
  {
    id: '1',
    title: "Understanding Jupiter's Tokenomics",
    slug: "understanding-jupiters-tokenomics",
    excerpt: "A deep dive into Jupiter's token distribution and utility...",
    status: "Published",
    author: "John Doe",
    publishedAt: "2024-03-15",
  },
  {
    id: '2',
    title: "LayerZero Airdrop Guide",
    slug: "layerzero-airdrop-guide",
    excerpt: "Complete guide to participating in the LayerZero airdrop...",
    status: "Draft",
    author: "Jane Smith",
    publishedAt: null,
  },
]

export default function AdminBlog() {
  const [posts, setPosts] = useState(initialPosts)
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [selectedPosts, setSelectedPosts] = useState([])
  const [actionHistory, setActionHistory] = useState([])
  const [postsHistory, setPostsHistory] = useState([initialPosts])

  const addToHistory = (newPosts, actionType) => {
    setPostsHistory(prev => [...prev, newPosts])
    setActionHistory(prev => [...prev, actionType])
  }

  const handleUndo = () => {
    if (postsHistory.length > 1) {
      const newHistory = [...postsHistory]
      const newPosts = newHistory.pop()
      setPostsHistory(newHistory)
      setPosts(newHistory[newHistory.length - 1])
      
      const newActionHistory = [...actionHistory]
      newActionHistory.pop()
      setActionHistory(newActionHistory)
      setSelectedPosts([])
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setDialogOpen(true)
  }

  const handleDelete = (id) => {
    setSelectedPosts([id])
    setDeleteDialogOpen(true)
  }

  const handleBulkDelete = () => {
    if (selectedPosts.length > 0) {
      setDeleteDialogOpen(true)
    }
  }

  const handleDeleteConfirm = () => {
    const newPosts = posts.filter(post => !selectedPosts.includes(post.id))
    addToHistory(newPosts, 'delete')
    setPosts(newPosts)
    setSelectedPosts([])
    setDeleteDialogOpen(false)
  }

  const handleAdd = () => {
    setEditingPost(null)
    setDialogOpen(true)
  }

  const handleSave = (formData) => {
    let newPosts
    if (editingPost?.id) {
      newPosts = posts.map(post => 
        post.id === editingPost.id ? { ...formData, id: post.id } : post
      )
      addToHistory(newPosts, 'edit')
    } else {
      newPosts = [...posts, { ...formData, id: Date.now().toString() }]
      addToHistory(newPosts, 'create')
    }
    setPosts(newPosts)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingPost(null)
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const togglePostSelection = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const toggleAllPosts = () => {
    setSelectedPosts(prev => 
      prev.length === filteredPosts.length
        ? []
        : filteredPosts.map(post => post.id)
    )
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">
            Create and manage your blog content
          </p>
        </div>
        <div className="flex gap-2">
          {postsHistory.length > 1 && (
            <Button
              variant="outline"
              onClick={handleUndo}
              className="flex items-center"
            >
              <Undo2 className="h-4 w-4 mr-2" />
              Undo {actionHistory[actionHistory.length - 1]}
            </Button>
          )}
          {selectedPosts.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              className="flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedPosts.length})
            </Button>
          )}
          <Button onClick={handleAdd} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <p className="text-lg font-medium">No posts found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery 
                    ? "Try adjusting your search query"
                    : "Start by creating your first blog post"}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader className="py-4">
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedPosts.length === filteredPosts.length}
                    onCheckedChange={toggleAllPosts}
                    className="mr-4"
                  />
                  <div className="grid grid-cols-4 flex-1 gap-4">
                    <div className="col-span-2">Title</div>
                    <div>Author</div>
                    <div>Status</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
            {filteredPosts.map(post => (
              <Card key={post.id} className={selectedPosts.includes(post.id) ? 'border-primary' : ''}>
                <CardHeader className="py-4">
                  <div className="flex items-center">
                    <Checkbox
                      checked={selectedPosts.includes(post.id)}
                      onCheckedChange={() => togglePostSelection(post.id)}
                      className="mr-4"
                    />
                    <div className="grid grid-cols-4 flex-1 gap-4">
                      <div className="col-span-2">
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm">{post.author}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </>
        )}
      </div>

      <BlogPostDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        post={editingPost}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${selectedPosts.length > 1 ? 'Posts' : 'Post'}`}
        description={`Are you sure you want to delete ${selectedPosts.length > 1 ? 'these posts' : 'this post'}? This action cannot be undone.`}
      />
    </div>
  )
} 