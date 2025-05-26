import { useTranslation } from 'react-i18next'
import { useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { RouterProvider } from "react-router";
import { ThemeProvider } from "@/components/theme-provider"
import router from "./router";

function App() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('title')
  }, [t])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-background">
          <Header />
          <main className="flex-1 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <RouterProvider router={router} />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
