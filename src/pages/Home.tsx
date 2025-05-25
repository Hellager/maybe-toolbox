import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface CardItem {
  id: number
  title: string
  description: string
  path: string
}

const cardItems: CardItem[] = [
  {
    id: 1,
    title: "工具一",
    description: "这是第一个工具的详细描述",
    path: "/tool/1"
  },
  {
    id: 2,
    title: "工具二",
    description: "这是第二个工具的详细描述",
    path: "/tool/2"
  },
  {
    id: 3,
    title: "工具三",
    description: "这是第三个工具的详细描述",
    path: "/tool/3"
  }
]

export function Home() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">工具箱</h1>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">切换主题</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardItems.map((item) => (
          <Card 
            key={item.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(item.path)}
          >
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">点击查看详情</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 