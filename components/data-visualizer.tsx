"use client"

import { useState, useEffect } from "react"
import { DataTable } from "./data-table"
import { DataGraph } from "./data-graph"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataFilters, type FilterState } from "./data-filters"

// Mock data structure
interface DataItem {
  id: number
  name: string
  product: string
  category: string
  region: string
  sales: number
  profit: number
  status: "active" | "inactive" | "pending"
  date: string
}

// Generate mock data
const generateMockData = (): DataItem[] => {
  const categories = ["Electronics", "Clothing", "Food", "Furniture", "Office Supplies"]
  const regions = ["North", "South", "East", "West", "Central"]
  const products = [
    "Laptop",
    "Phone",
    "Tablet",
    "Monitor",
    "Keyboard",
    "Mouse",
    "Headphones",
    "Speaker",
    "Camera",
    "Printer",
  ]
  const statuses = ["active", "inactive", "pending"] as const

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    product: products[Math.floor(Math.random() * products.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    sales: Math.floor(Math.random() * 10000),
    profit: Math.floor(Math.random() * 5000) - 1000, // Allow for negative profits
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0],
  }))
}

export function DataVisualizer() {
  const [data, setData] = useState<DataItem[]>([])
  const [filteredData, setFilteredData] = useState<DataItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [activeTab, setActiveTab] = useState("table")
  const [filters, setFilters] = useState<FilterState>({
    id: "",
    product: "",
    category: "",
    region: "",
    dateFrom: undefined,
    dateTo: undefined,
    salesMin: undefined,
    salesMax: undefined,
    profitMin: undefined,
    profitMax: undefined,
  })

  // Load mock data on component mount
  useEffect(() => {
    const mockData = generateMockData()
    setData(mockData)
    setFilteredData(mockData)
  }, [])

  const categories = [...new Set(data.map((item) => item.category))].sort()
  const regions = [...new Set(data.map((item) => item.region))].sort()
  const salesRange = {
    min: Math.min(...data.map((item) => item.sales), 0),
    max: Math.max(...data.map((item) => item.sales), 1000),
  }
  const profitRange = {
    min: Math.min(...data.map((item) => item.profit), -1000),
    max: Math.max(...data.map((item) => item.profit), 1000),
  }

  // Handle search functionality
  useEffect(() => {
    let result = [...data]

    // Apply ID filter
    if (filters.id) {
      result = result.filter((item) => item.id.toString().includes(filters.id))
    }

    // Apply product filter
    if (filters.product) {
      result = result.filter((item) => item.product.toLowerCase().includes(filters.product.toLowerCase()))
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((item) => item.category === filters.category)
    }

    // Apply region filter
    if (filters.region) {
      result = result.filter((item) => item.region === filters.region)
    }

    // Apply date range filter
    if (filters.dateFrom || filters.dateTo) {
      result = result.filter((item) => {
        const itemDate = new Date(item.date)
        if (filters.dateFrom && filters.dateTo) {
          return itemDate >= filters.dateFrom && itemDate <= filters.dateTo
        } else if (filters.dateFrom) {
          return itemDate >= filters.dateFrom
        } else if (filters.dateTo) {
          return itemDate <= filters.dateTo
        }
        return true
      })
    }

    // Apply sales range filter
    if (filters.salesMin !== undefined || filters.salesMax !== undefined) {
      result = result.filter((item) => {
        if (filters.salesMin !== undefined && filters.salesMax !== undefined) {
          return item.sales >= filters.salesMin && item.sales <= filters.salesMax
        } else if (filters.salesMin !== undefined) {
          return item.sales >= filters.salesMin
        } else if (filters.salesMax !== undefined) {
          return item.sales <= filters.salesMax
        }
        return true
      })
    }

    // Apply profit range filter
    if (filters.profitMin !== undefined || filters.profitMax !== undefined) {
      result = result.filter((item) => {
        if (filters.profitMin !== undefined && filters.profitMax !== undefined) {
          return item.profit >= filters.profitMin && item.profit <= filters.profitMax
        } else if (filters.profitMin !== undefined) {
          return item.profit >= filters.profitMin
        } else if (filters.profitMax !== undefined) {
          return item.profit <= filters.profitMax
        }
        return true
      })
    }

    // Apply search term filter (across name, product, category)
    if (searchTerm.trim() !== "") {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.region.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredData(result)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, data, filters])

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const resetFilters = () => {
    setFilters({
      id: "",
      product: "",
      category: "",
      region: "",
      dateFrom: undefined,
      dateTo: undefined,
      salesMin: undefined,
      salesMax: undefined,
      profitMin: undefined,
      profitMax: undefined,
    })
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Interactive Data Table & Graph Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search across all fields..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Items per page:</span>
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            <DataFilters
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
              regions={regions}
              salesRange={salesRange}
              profitRange={profitRange}
              onResetFilters={resetFilters}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="graph">Graph View</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <DataTable
                data={currentItems}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </TabsContent>
            <TabsContent value="graph">
              <DataGraph data={filteredData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
