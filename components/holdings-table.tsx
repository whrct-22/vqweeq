"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, MoreHorizontal, ArrowUpDown, Search, Download } from "lucide-react"
import { usePortfolio } from "@/hooks/use-portfolio"

export function HoldingsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("marketValue")
  const [filterBy, setFilterBy] = useState("all")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)

  const { holdings, isLoading } = usePortfolio()

  const filteredData = useMemo(() => {
    return holdings.filter((holding) => {
      const matchesSearch =
        holding.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        holding.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "profit" && holding.gainLoss > 0) ||
        (filterBy === "loss" && holding.gainLoss < 0)

      return matchesSearch && matchesFilter
    })
  }, [holdings, searchQuery, filterBy])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      switch (sortBy) {
        case "marketValue":
          return b.marketValue - a.marketValue
        case "gainLoss":
          return b.gainLoss - a.gainLoss
        case "gainLossPercent":
          return b.gainLossPercent - a.gainLossPercent
        case "allocation":
          return b.allocation - a.allocation
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

  if (isLoading) {
    return (
      <Card className="bg-card border-border">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">加载投资组合数据...</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">持仓明细</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{sortedData.length} 只股票</Badge>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索股票..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="profit">盈利</SelectItem>
              <SelectItem value="loss">亏损</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marketValue">市值</SelectItem>
              <SelectItem value="gainLoss">盈亏</SelectItem>
              <SelectItem value="gainLossPercent">盈亏率</SelectItem>
              <SelectItem value="allocation">占比</SelectItem>
              <SelectItem value="symbol">股票代码</SelectItem>
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
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold" onClick={() => setSortBy("symbol")}>
                  股票
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right text-muted-foreground">股数</TableHead>
              <TableHead className="text-right text-muted-foreground">成本价</TableHead>
              <TableHead className="text-right text-muted-foreground">现价</TableHead>
              <TableHead className="text-right text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 p-0 font-semibold"
                  onClick={() => setSortBy("marketValue")}
                >
                  市值
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 p-0 font-semibold"
                  onClick={() => setSortBy("gainLoss")}
                >
                  盈亏
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 p-0 font-semibold"
                  onClick={() => setSortBy("allocation")}
                >
                  占比
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((holding) => (
              <TableRow key={holding.symbol} className="hover:bg-muted/50 border-border">
                <TableCell>
                  <div>
                    <div className="font-semibold text-foreground">{holding.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-32">{holding.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-foreground">{holding.shares}</TableCell>
                <TableCell className="text-right text-foreground">${holding.avgPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold text-foreground">
                  ${holding.currentPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-semibold text-foreground">
                  ${holding.marketValue.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={`flex items-center justify-end gap-1 ${
                      holding.gainLoss >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {holding.gainLoss >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <div>
                      <div className="font-medium">
                        {holding.gainLoss >= 0 ? "+" : ""}${Math.abs(holding.gainLoss).toFixed(2)}
                      </div>
                      <div className="text-xs">
                        {holding.gainLossPercent >= 0 ? "+" : ""}
                        {holding.gainLossPercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-foreground">{holding.allocation.toFixed(1)}%</TableCell>
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
