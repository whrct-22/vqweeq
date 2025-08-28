"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Star, ArrowUpDown, Eye } from "lucide-react"

interface MarketDataTableProps {
  searchQuery: string
  selectedMarket: string
  selectedSector: string
  sortBy: string
  onSortChange: (sort: string) => void
}

const mockMarketData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    volume: "45.2M",
    marketCap: "2.8T",
    pe: 28.5,
    sector: "tech",
    market: "us",
    high52w: 198.23,
    low52w: 124.17,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2847.63,
    change: -15.23,
    changePercent: -0.53,
    volume: "28.1M",
    marketCap: "1.7T",
    pe: 24.2,
    sector: "tech",
    market: "us",
    high52w: 3030.93,
    low52w: 2193.62,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.85,
    change: 4.12,
    changePercent: 1.1,
    volume: "32.5M",
    marketCap: "2.9T",
    pe: 32.1,
    sector: "tech",
    market: "us",
    high52w: 384.3,
    low52w: 213.43,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.5,
    change: -8.75,
    changePercent: -3.4,
    volume: "89.3M",
    marketCap: "789B",
    pe: 65.8,
    sector: "consumer",
    market: "us",
    high52w: 299.29,
    low52w: 138.8,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 875.28,
    change: 23.45,
    changePercent: 2.75,
    volume: "67.8M",
    marketCap: "2.1T",
    pe: 71.2,
    sector: "tech",
    market: "us",
    high52w: 950.02,
    low52w: 180.96,
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    price: 147.82,
    change: 1.23,
    changePercent: 0.84,
    volume: "12.4M",
    marketCap: "432B",
    pe: 12.3,
    sector: "finance",
    market: "us",
    high52w: 169.81,
    low52w: 135.19,
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 162.45,
    change: -0.87,
    changePercent: -0.53,
    volume: "8.9M",
    marketCap: "428B",
    pe: 15.7,
    sector: "healthcare",
    market: "us",
    high52w: 179.92,
    low52w: 143.13,
  },
  {
    symbol: "BTC-USD",
    name: "Bitcoin",
    price: 67845.32,
    change: 1234.56,
    changePercent: 1.85,
    volume: "2.1B",
    marketCap: "1.3T",
    pe: null,
    sector: "crypto",
    market: "crypto",
    high52w: 73750.07,
    low52w: 15460.0,
  },
]

export function MarketDataTable({
  searchQuery,
  selectedMarket,
  selectedSector,
  sortBy,
  onSortChange,
}: MarketDataTableProps) {
  const [watchlist, setWatchlist] = useState<string[]>(["AAPL", "TSLA"])
  const [itemsPerPage, setItemsPerPage] = useState("20")

  const filteredData = useMemo(() => {
    return mockMarketData.filter((stock) => {
      const matchesSearch =
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesMarket = selectedMarket === "all" || stock.market === selectedMarket
      const matchesSector = selectedSector === "all" || stock.sector === selectedSector

      return matchesSearch && matchesMarket && matchesSector
    })
  }, [searchQuery, selectedMarket, selectedSector])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      switch (sortBy) {
        case "marketCap":
          return (
            Number.parseFloat(b.marketCap.replace(/[^0-9.]/g, "")) -
            Number.parseFloat(a.marketCap.replace(/[^0-9.]/g, ""))
          )
        case "price":
          return b.price - a.price
        case "change":
          return b.changePercent - a.changePercent
        case "volume":
          return (
            Number.parseFloat(b.volume.replace(/[^0-9.]/g, "")) - Number.parseFloat(a.volume.replace(/[^0-9.]/g, ""))
          )
        default:
          return 0
      }
    })
  }, [filteredData, sortBy])

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  const getSectorBadgeColor = (sector: string) => {
    const colors = {
      tech: "bg-chart-1 text-white",
      finance: "bg-chart-2 text-white",
      healthcare: "bg-chart-3 text-white",
      consumer: "bg-chart-4 text-white",
      energy: "bg-chart-5 text-white",
      crypto: "bg-primary text-primary-foreground",
    }
    return colors[sector as keyof typeof colors] || "bg-muted text-muted-foreground"
  }

  return (
    <Card className="bg-card border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">股票列表</h3>
            <Badge variant="outline">{sortedData.length} 只股票</Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">排序:</span>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketCap">市值</SelectItem>
                <SelectItem value="price">价格</SelectItem>
                <SelectItem value="change">涨跌幅</SelectItem>
                <SelectItem value="volume">成交量</SelectItem>
              </SelectContent>
            </Select>

            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold">
                  股票
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold">
                  价格
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold">
                  涨跌幅
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">成交量</TableHead>
              <TableHead className="text-right">市值</TableHead>
              <TableHead className="text-right">市盈率</TableHead>
              <TableHead>行业</TableHead>
              <TableHead className="text-right">52周区间</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.slice(0, Number.parseInt(itemsPerPage)).map((stock) => (
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
                        watchlist.includes(stock.symbol) ? "fill-chart-3 text-chart-3" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-32">{stock.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">${stock.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div
                    className={`flex items-center justify-end gap-1 ${
                      stock.change >= 0 ? "text-chart-5" : "text-chart-4"
                    }`}
                  >
                    {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span className="font-medium">
                      {stock.changePercent >= 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm">{stock.volume}</TableCell>
                <TableCell className="text-right font-medium">{stock.marketCap}</TableCell>
                <TableCell className="text-right">{stock.pe ? stock.pe.toFixed(1) : "—"}</TableCell>
                <TableCell>
                  <Badge className={getSectorBadgeColor(stock.sector)}>
                    {stock.sector === "tech" && "科技"}
                    {stock.sector === "finance" && "金融"}
                    {stock.sector === "healthcare" && "医疗"}
                    {stock.sector === "consumer" && "消费"}
                    {stock.sector === "energy" && "能源"}
                    {stock.sector === "crypto" && "加密"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-xs">
                  <div className="text-muted-foreground">
                    ${stock.low52w.toFixed(2)} - ${stock.high52w.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
