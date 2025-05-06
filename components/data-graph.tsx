"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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

interface DataGraphProps {
  data: DataItem[]
}

export function DataGraph({ data }: DataGraphProps) {
  const [groupBy, setGroupBy] = useState<"category" | "region" | "product" | "status">("category")
  const [valueField, setValueField] = useState<"sales" | "profit">("sales")

  // Process data for the chart based on grouping
  const processChartData = () => {
    const groupedData: Record<string, number> = {}

    data.forEach((item) => {
      const key = item[groupBy]
      if (groupedData[key]) {
        groupedData[key] += item[valueField]
      } else {
        groupedData[key] = item[valueField]
      }
    })

    return Object.entries(groupedData).map(([name, value]) => ({
      name,
      value,
    }))
  }

  const chartData = processChartData()

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Data Visualization</CardTitle>
            <CardDescription>Visual representation of your data</CardDescription>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Select
              value={groupBy}
              onValueChange={(value: "category" | "region" | "product" | "status") => setGroupBy(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Group by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category">Group by Category</SelectItem>
                <SelectItem value="region">Group by Region</SelectItem>
                <SelectItem value="product">Group by Product</SelectItem>
                <SelectItem value="status">Group by Status</SelectItem>
              </SelectContent>
            </Select>
            <Select value={valueField} onValueChange={(value: "sales" | "profit") => setValueField(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Value to show" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Show Sales</SelectItem>
                <SelectItem value="profit">Show Profit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer
            config={{
              value: {
                label: valueField === "sales" ? "Sales ($)" : "Profit ($)",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
