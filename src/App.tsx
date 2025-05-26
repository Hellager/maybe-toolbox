import { BrowserRouter as Router, Routes, Route } from "react-router"
import { useTranslation } from 'react-i18next'
import { useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import { HeaderProvider } from "@/contexts/HeaderContext"
import { HomeContent } from "./pages/Home"
import { JiugongSolver } from "./pages/JiugongSolver/JiugongSolver"

function App() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('title')
  }, [t])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <HeaderProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-background">
            <Header />
            <main className="flex-1 py-8 px-4">
              <div className="max-w-6xl mx-auto">
                <Routes>
                  <Route path="/" element={<HomeContent />} />
                  <Route path="/jiugongge" element={<JiugongSolver />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      </HeaderProvider>
    </ThemeProvider>
  )
}

export default App
