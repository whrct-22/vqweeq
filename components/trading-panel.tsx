"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

interface TradingPanelProps {
  stock: {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
  }
}

export function TradingPanel({ stock }: TradingPanelProps) {
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState(stock.price.toString())
  const [totalValue, setTotalValue] = useState(0)

  const calculateTotal = () => {
    const qty = Number.parseFloat(quantity) || 0
    const prc = Number.parseFloat(price) || 0
    setTotalValue(qty * prc)
  }

  return (
    <Card className="p-4 bg-card border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">交易面板</h3>
          <Badge variant="outline" className="text-xs">
            {stock.symbol}
          </Badge>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="text-chart-5">
              <TrendingUp className="h-4 w-4 mr-2" />
              买入
            </TabsTrigger>
            <TabsTrigger value="sell" className="text-chart-4">
              <TrendingDown className="h-4 w-4 mr-2" />
              卖出
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={orderType === "market" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderType("market")}
                className="flex-1"
              >
                市价单
              </Button>
              <Button
                variant={orderType === "limit" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderType("limit")}
                className="flex-1"
              >
                限价单
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">数量</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value)
                  calculateTotal()
                }}
                className="bg-background border-border"
              />
            </div>

            {orderType === "limit" && (
              <div className="space-y-2">
                <Label htmlFor="price">价格</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder={stock.price.toString()}
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value)
                      calculateTotal()
                    }}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>
            )}

            <div className="p-3 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">预估总价</span>
                <span className="font-semibold">${totalValue.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-chart-5 hover:bg-chart-5/90 text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              买入 {stock.symbol}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            {/* 卖出界面类似买入，但颜色不同 */}
            <div className="flex gap-2">
              <Button
                variant={orderType === "market" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderType("market")}
                className="flex-1"
              >
                市价单
              </Button>
              <Button
                variant={orderType === "limit" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderType("limit")}
                className="flex-1"
              >
                限价单
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sell-quantity">数量</Label>
              <Input id="sell-quantity" type="number" placeholder="0" className="bg-background border-border" />
            </div>

            {orderType === "limit" && (
              <div className="space-y-2">
                <Label htmlFor="sell-price">价格</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="sell-price"
                    type="number"
                    placeholder={stock.price.toString()}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>
            )}

            <Button className="w-full bg-chart-4 hover:bg-chart-4/90 text-white">
              <TrendingDown className="h-4 w-4 mr-2" />
              卖出 {stock.symbol}
            </Button>
          </TabsContent>
        </Tabs>

        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium mb-2">持仓信息</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">可用资金</span>
              <span className="font-medium">$12,450.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">持有股数</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">购买力</span>
              <span className="font-medium">$24,900.00</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
