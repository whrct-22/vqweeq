"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Star, MoreHorizontal, Plus, ArrowUpDown } from "lucide-react"

interface WatchlistTableProps {
  searchQuery: string
  selectedList: string
}

const watchlistData = {
  default: [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.34, changePercent: 1.35, volume: "45.2M" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 378.85, change: 4.12, changePercent: 1.1, volume: "32.5M" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2847.63, change: -15.23, changePercent: -0.53, volume: "28.1M" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 248.5, change: -8.75, changePercent: -3.4, volume: "89.3M" },
  ],
  tech: [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.34, changePercent: 1.35, volume: "45.2M" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 378.85, change: 4.12, changePercent: 1.1, volume: "32.5M" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.28, change: 23.45, changePercent: 2.75, volume: "67.8M" },
  ],
  crypto: [
    { symbol: "BTC-USD", name: "Bitcoin", price: 67845.32, change: 1234.56, changePercent: 1.85, volume: "2.1B" },
    { symbol: "ETH-USD", name: "Ethereum", price: 3456.78, change: -123.45, changePercent: -3.45, volume: "1.8B" },
  ],
  dividend: [
    { symbol: "JNJ", name: "Johnson & Johnson", price: 162.45, change: -0.87, changePercent: -0.53, volume: "8.9M" },
    { symbol: "PG", name: "Procter & Gamble", price: 145.67, change: 1.23, changePercent: 0.85, volume: "6.2M" },
  ],
}

export function WatchlistTable({ searchQuery, selectedList }: WatchlistTableProps) {
  const [watchlist, setWatchlist] = useState<string[]>(["AAPL", "TSLA"])
  const [sortBy, setSortBy] = useState("symbol")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)

  const data = watchlistData[selectedList as keyof typeof watchlistData] || []

  const filteredData = useMemo(() => {
    return data.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [data, searchQuery])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.price - a.price
        case "change":
          return b.changePercent - a.changePercent
        case "volume":
          return (
            Number.parseFloat(b.volume.replace(/[^0-9.]/g, "")) - Number.parseFloat(a.volume.replace(/[^0-9.]/g, ""))
          )
        case "symbol":
          return a.symbol.localeCompare(b.symbol)
        default:
          return 0
      }
    })
  }, [filteredData, sortBy])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
    return sortedData.slice(startIndex, startIndex + Number.parseInt(itemsPerPage))
  }, [sortedData, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedData.length / Number.parseInt(itemsPerPage))

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  return (
    <Card className="bg-card border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">关注股票</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{sortedData.length} 只股票</Badge>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="symbol">代码</SelectItem>
                <SelectItem value="price">价格</SelectItem>
                <SelectItem value="change">涨跌</SelectItem>
                <SelectItem value="volume">成交量</SelectItem>
              </SelectContent>
            </Select>
            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              添加股票
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold" onClick={() => setSortBy("symbol")}>
                  股票
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold" onClick={() => setSortBy("price")}>
                  价格
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold" onClick={() => setSortBy("change")}>
                  涨跌幅
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold" onClick={() => setSortBy("volume")}>
                  成交量
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((stock) => (
              <TableRow key={stock.symbol} className="hover:bg-muted/50">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleWatchlist(stock.symbol)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        watchlist.includes(stock.symbol) ? "fill-green-400 text-green-400" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-semibold text-foreground">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-32">{stock.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold text-foreground">${stock.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div
                    className={`flex items-center justify-end gap-1 ${
                      stock.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <div>
                      <div className="font-medium">
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </div>
                      <div className="text-xs">
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-foreground">{stock.volume}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              显示 {(currentPage - 1) * Number.parseInt(itemsPerPage) + 1} -{" "}
              {Math.min(currentPage * Number.parseInt(itemsPerPage), sortedData.length)} 条，共 {sortedData.length} 条
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                上一页
              </Button>
              <span className="text-sm">
                第 {currentPage} 页，共 {totalPages} 页
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                下一页
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
