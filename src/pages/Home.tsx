import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button"
import { Moon, Sun, Code2, Regex, GitBranch, FileText, MessageSquare, ReceiptText } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface CardItem {
  id: number
  title: string
  description: string
  tip: string
  icon: React.ReactNode
  path: string
}

const cardItems: CardItem[] = [
  {
    id: 1,
    title: "EnvLens",
    description: "Environment Variable Inspector",
    tip: "Click to access this tool",
    icon: <Code2 className="h-6 w-6 text-muted-foreground" />, 
    path: "/tool/1"
  },
  {
    id: 2,
    title: "RegexBuddyLite",
    description: "Regex Playground & Tester",
    tip: "Click to access this tool",
    icon: <Regex className="h-6 w-6 text-muted-foreground" />, 
    path: "/tool/2"
  },
//   {
//     id: 3,
//     title: "BranchForge",
//     description: "Git Branch Name Generator",
//     tip: "Click to access this tool",
//     icon: <GitBranch className="h-6 w-6 text-muted-foreground" />, 
//     path: "/tool/3"
//   },
//   {
//     id: 4,
//     title: "InvoiceFlow",
//     description: "Simple Invoice Generator",
//     tip: "Click to access this tool",
//     icon: <FileText className="h-6 w-6 text-muted-foreground" />, 
//     path: "/tool/4"
//   },
//   {
//     id: 5,
//     title: "MinuteMind",
//     description: "Meeting Minute Taker",
//     tip: "Click to access this tool",
//     icon: <MessageSquare className="h-6 w-6 text-muted-foreground" />, 
//     path: "/tool/5"
//   },
//   {
//     id: 6,
//     title: "ExpenseEase",
//     description: "Expense Report Simplifier",
//     tip: "Click to access this tool",
//     icon: <ReceiptText className="h-6 w-6 text-muted-foreground" />, 
//     path: "/tool/6"
//   },
]

export function Home() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background">
      <div className="pt-12 pb-8 px-2">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent hover:bg-muted/50 shadow-none border-none"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="切换主题"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">切换主题</span>
          </Button>
        </div>
        <h1 className="text-5xl font-extrabold text-center mb-2">Dev & Office Toolbox</h1>
        <p className="text-center text-muted-foreground text-lg mb-10">A suite of productivity tools for developers and office professionals</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cardItems.map((item) => (
            <Card 
              key={item.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow h-full"
              onClick={() => navigate(item.path)}
            >
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div>{item.icon}</div>
                <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription className="text-base text-muted-foreground mb-1">{item.description}</CardDescription>
                <div className="text-xs text-gray-400 dark:text-gray-500">{item.tip}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <footer className="w-full text-center text-xs text-muted-foreground py-6 border-t mt-10">
        <div className="mb-1">© 2025 Dev & Office Toolbox</div>
        <div>Like this? Contribute to growth!<span className="ml-2">AI-IT Inc • SMS: 863-338-2669</span></div>
      </footer>
    </div>
  )
} 