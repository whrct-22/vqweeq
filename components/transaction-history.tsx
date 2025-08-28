"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, ArrowUpDown, Search, Download } from "lucide-react"

const transactions = [
  {
    id: "1",
    date: "2024-01-15",
    type: "buy",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 25,
    price: 175.43,
    total: 4385.75,
    status: "completed",
  },
  {
    id: "2",
    date: "2024-01-14",
    type: "sell",
    symbol: "TSLA",
    name: "Tesla Inc.",
    shares: 10,
    price: 248.5,
    total: 2485.0,
    status: "completed",
  },
  {
    id: "3",
    date: "2024-01-12",
    type: "buy",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    shares: 5,
    price: 875.28,
    total: 4376.4,
    status: "completed",
  },
  {
    id: "4",
    date: "2024-01-10",
    type: "buy",
    symbol: "MSFT",
    name: "Microsoft Corp.",
    shares: 15,
    price: 378.85,
    total: 5682.75,
    status: "pending",
  },
  {
    id: "5",
    date: "2024-01-08",
    type: "sell",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 2,
    price: 2847.63,
    total: 5695.26,
    status: "completed",
  },
  {
    id: "6",
    date: "2024-01-05",
    type: "buy",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    shares: 8,
    price: 3456.78,
    total: 27654.24,
    status: "failed",
  },
]

export function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = filterType === "all" || transaction.type === filterType
      const matchesStatus = filterStatus === "all" || transaction.status === filterStatus

      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchQuery, filterType, filterStatus])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "total":
          return b.total - a.total
        case "symbol":
          return a.symbol.localeCompare(b.symbol)
        case "shares":
          return b.shares - a.shares
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

  const getTypeColor = (type: string) => {
    return type === "buy" ? "text-green-400" : "text-red-400"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white"
      case "pending":
        return "bg-yellow-500 text-white"
      case "failed":
        return "bg-red-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="bg-card border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">交易记录</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{sortedData.length} 条记录</Badge>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索股票..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="buy">买入</SelectItem>
              <SelectItem value="sell">卖出</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
              <SelectItem value="pending">待处理</SelectItem>
              <SelectItem value="failed">失败</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">日期</SelectItem>
              <SelectItem value="total">金额</SelectItem>
              <SelectItem value="symbol">股票</SelectItem>
              <SelectItem value="shares">股数</SelectItem>
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
              <TableHead>
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold" onClick={() => setSortBy("date")}>
                  日期
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>类型</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold" onClick={() => setSortBy("symbol")}>
                  股票
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold" onClick={() => setSortBy("shares")}>
                  股数
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">价格</TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" className="h-8 p-0 font-semibold" onClick={() => setSortBy("total")}>
                  总额
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/50">
                <TableCell className="text-sm text-foreground">{transaction.date}</TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1 ${getTypeColor(transaction.type)}`}>
                    {transaction.type === "buy" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span className="font-medium">{transaction.type === "buy" ? "买入" : "卖出"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-semibold text-foreground">{transaction.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-32">{transaction.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-foreground">{transaction.shares}</TableCell>
                <TableCell className="text-right text-foreground">${transaction.price.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold text-foreground">
                  ${transaction.total.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status === "completed" && "已完成"}
                    {transaction.status === "pending" && "待处理"}
                    {transaction.status === "failed" && "失败"}
                  </Badge>
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
