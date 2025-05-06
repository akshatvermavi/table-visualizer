import { DataVisualizer } from "@/components/data-visualizer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Interactive Data Table & Graph Visualization</h1>
        <DataVisualizer />
      </div>
    </main>
  )
}
