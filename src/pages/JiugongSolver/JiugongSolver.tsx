import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next'

export function JiugongSolver() {
  const { t } = useTranslation()

  return (
    <div className="flex-1 flex items-center justify-center py-16">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">{t('jiugongge.title')}</h1>
          <div className="space-y-6">
            { '九宫格求解器内容' }
          </div>
        </div>
      </div>
    </div>
  )
}
