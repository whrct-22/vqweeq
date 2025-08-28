"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react"

const alerts = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    currentPrice: 175.43,
    targetPrice: 180.0,
    condition: "above",
    status: "active",
    created: "2024-01-10",
  },
  {
    id: "2",
    symbol: "TSLA",
    name: "Tesla Inc.",
    currentPrice: 248.5,
    targetPrice: 230.0,
    condition: "below",
    status: "active",
    created: "2024-01-08",
  },
  {
    id: "3",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    currentPrice: 875.28,
    targetPrice: 900.0,
    condition: "above",
    status: "triggered",
    created: "2024-01-05",
  },
]

export function PriceAlerts() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAlert, setNewAlert] = useState({
    symbol: "",
    targetPrice: "",
    condition: "above",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-2 text-white"
      case "triggered":
        return "bg-chart-5 text-white"
      case "expired":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getConditionIcon = (condition: string) => {
    return condition === "above" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-chart-2" />
            <h3 className="text-lg font-semibold">价格提醒</h3>
          </div>
          <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            添加提醒
          </Button>
        </div>

        {showAddForm && (
          <div className="mb-6 p-4 bg-background rounded-lg border border-border">
            <h4 className="font-medium mb-4">创建价格提醒</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">股票代码</Label>
                <Input
                  id="symbol"
                  placeholder="AAPL"
                  value={newAlert.symbol}
                  onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">条件</Label>
                <Select
                  value={newAlert.condition}
                  onValueChange={(value) => setNewAlert({ ...newAlert, condition: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="above">高于</SelectItem>
                    <SelectItem value="below">低于</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-price">目标价格</Label>
                <Input
                  id="target-price"
                  type="number"
                  placeholder="0.00"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                />
              </div>

              <div className="flex items-end gap-2">
                <Button className="flex-1">创建提醒</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>股票</TableHead>
                <TableHead className="text-right">当前价格</TableHead>
                <TableHead className="text-center">条件</TableHead>
                <TableHead className="text-right">目标价格</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-semibold">{alert.symbol}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-32">{alert.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">${alert.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {getConditionIcon(alert.condition)}
                      <span className="text-sm">{alert.condition === "above" ? "高于" : "低于"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">${alert.targetPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status === "active" && "活跃"}
                      {alert.status === "triggered" && "已触发"}
                      {alert.status === "expired" && "已过期"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{alert.created}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-chart-4">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
