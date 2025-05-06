"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export interface FilterState {
  id: string
  product: string
  category: string
  region: string
  dateFrom: Date | undefined
  dateTo: Date | undefined
  salesMin: number | undefined
  salesMax: number | undefined
  profitMin: number | undefined
  profitMax: number | undefined
}

interface DataFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  categories: string[]
  regions: string[]
  salesRange: { min: number; max: number }
  profitRange: { min: number; max: number }
  onResetFilters: () => void
}

export function DataFilters({
  filters,
  onFilterChange,
  categories,
  regions,
  salesRange,
  profitRange,
  onResetFilters,
}: DataFiltersProps) {
  const [localSalesRange, setLocalSalesRange] = useState<[number, number]>([
    filters.salesMin || salesRange.min,
    filters.salesMax || salesRange.max,
  ])
  const [localProfitRange, setLocalProfitRange] = useState<[number, number]>([
    filters.profitMin || profitRange.min,
    filters.profitMax || profitRange.max,
  ])

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.id) count++
    if (filters.product) count++
    if (filters.category) count++
    if (filters.region) count++
    if (filters.dateFrom || filters.dateTo) count++
    if (filters.salesMin !== undefined || filters.salesMax !== undefined) count++
    if (filters.profitMin !== undefined || filters.profitMax !== undefined) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {/* ID Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              ID
              {filters.id && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {filters.id}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Filter by ID</h4>
              <div className="grid gap-2">
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  placeholder="Enter ID"
                  value={filters.id}
                  onChange={(e) => updateFilter("id", e.target.value)}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Product Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              Product
              {filters.product && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {filters.product}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Filter by Product</h4>
              <div className="grid gap-2">
                <Label htmlFor="product">Product</Label>
                <Input
                  id="product"
                  placeholder="Enter product name"
                  value={filters.product}
                  onChange={(e) => updateFilter("product", e.target.value)}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Category Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              Category
              {filters.category && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {filters.category}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Filter by Category</h4>
              <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>

        {/* Region Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              Region
              {filters.region && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {filters.region}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Filter by Region</h4>
              <Select value={filters.region} onValueChange={(value) => updateFilter("region", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>

        {/* Date Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              Date
              {(filters.dateFrom || filters.dateTo) && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {filters.dateFrom ? format(filters.dateFrom, "MM/dd/yy") : "..."} -
                  {filters.dateTo ? format(filters.dateTo, "MM/dd/yy") : "..."}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <div className="space-y-2">
              <h4 className="font-medium">Filter by Date</h4>
              <div className="grid gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>From</Label>
                    <Calendar
                      mode="single"
                      selected={filters.dateFrom}
                      onSelect={(date) => updateFilter("dateFrom", date)}
                      initialFocus
                    />
                  </div>
                  <div>
                    <Label>To</Label>
                    <Calendar
                      mode="single"
                      selected={filters.dateTo}
                      onSelect={(date) => updateFilter("dateTo", date)}
                      initialFocus
                    />
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Sales Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              Sales
              {(filters.salesMin !== undefined || filters.salesMax !== undefined) && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  ${filters.salesMin || salesRange.min} - ${filters.salesMax || salesRange.max}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Filter by Sales</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>
                    Range: ${localSalesRange[0]} - ${localSalesRange[1]}
                  </Label>
                </div>
                <Slider
                  defaultValue={localSalesRange}
                  min={salesRange.min}
                  max={salesRange.max}
                  step={10}
                  onValueChange={(value) => {
                    setLocalSalesRange(value as [number, number])
                  }}
                  onValueCommit={(value) => {
                    updateFilter("salesMin", value[0])
                    updateFilter("salesMax", value[1])
                  }}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Profit Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              Profit
              {(filters.profitMin !== undefined || filters.profitMax !== undefined) && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  ${filters.profitMin || profitRange.min} - ${filters.profitMax || profitRange.max}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Filter by Profit</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>
                    Range: ${localProfitRange[0]} - ${localProfitRange[1]}
                  </Label>
                </div>
                <Slider
                  defaultValue={localProfitRange}
                  min={profitRange.min}
                  max={profitRange.max}
                  step={10}
                  onValueChange={(value) => {
                    setLocalProfitRange(value as [number, number])
                  }}
                  onValueCommit={(value) => {
                    updateFilter("profitMin", value[0])
                    updateFilter("profitMax", value[1])
                  }}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Reset Filters */}
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground" onClick={onResetFilters}>
            <X className="h-4 w-4" />
            Reset filters
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="rounded-md bg-muted px-3 py-2 text-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {activeFilterCount} active {activeFilterCount === 1 ? "filter" : "filters"}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
