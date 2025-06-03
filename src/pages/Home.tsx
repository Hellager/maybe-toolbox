import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router"
import { Puzzle } from "lucide-react"
import { useTranslation } from 'react-i18next'
import { useHeader } from "@/contexts/HeaderContext"
import { useEffect } from "react"

interface CardItem {
  id: number
  title: string
  description: string
  tip: string
  icon: React.ReactNode
  path: string
}

export function HomeContent() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { setHeader } = useHeader()

  useEffect(() => {
    setHeader(t('title'), t('subtitle'))
  }, [t, setHeader])

  const cardItems: CardItem[] = [
    {
      id: 1,
      title: t('jiugongge.title'),
      description: t('jiugongge.description'),
      tip: "",
      icon: <Puzzle className="h-6 w-6 text-muted-foreground" />,
      path: "/jiugongge"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardItems.map((item) => (
        <Card 
          key={item.id} 
          className="cursor-pointer hover:shadow-lg transition-shadow h-full bg-slate-100 dark:bg-background"
          onClick={() => navigate(item.path)}
        >
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div>{item.icon}</div>
            <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <CardDescription className="text-base text-muted-foreground mb-1">{item.description}</CardDescription>
            {item.tip && <div className="text-xs text-gray-400 dark:text-gray-500">{item.tip}</div>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
