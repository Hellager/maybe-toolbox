import { Button } from "@/components/ui/button"
import { Moon, Sun, Languages } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useTranslation } from 'react-i18next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { t, i18n } = useTranslation()

  return (
    <header className="w-full py-6 px-4 border-b">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-extrabold mb-2">{t('title')}</h1>
            <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-transparent hover:bg-muted/100 shadow-none border-none focus:outline-none focus:ring-0"
                  style={{ boxShadow: 'none', outline: 'none' }}
                  aria-label={t('language')}
                >
                  <Languages className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-50 dark:bg-background">
                <DropdownMenuItem
                  onClick={() => i18n.changeLanguage('en')}
                  className={`bg-slate-50 dark:bg-background ${i18n.language === 'en' ? 'font-bold' : ''}`}
                >
                  English {i18n.language === 'en' && <span className="ml-2">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => i18n.changeLanguage('zh')}
                  className={`bg-slate-50 dark:bg-background ${i18n.language === 'zh' ? 'font-bold' : ''}`}
                >
                  简体中文 {i18n.language === 'zh' && <span className="ml-2">✓</span>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent hover:bg-muted/100 shadow-none border-none focus:outline-none focus:ring-0"
              style={{ boxShadow: 'none', outline: 'none' }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={t('themeToggle')}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{t('themeToggle')}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 