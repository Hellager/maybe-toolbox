import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export function NotFound() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black text-primary/10 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary mb-4">{t('notFound.content')}</h2>
            <div className="w-24 h-1 bg-primary/20 mx-auto mb-6"></div>
          </div>
        </div>
      </div>
      <div className="max-w-lg">
        <Button 
          onClick={() => navigate('/')}
          size="lg"
          className="px-8 py-6 text-lg font-medium hover:scale-105 transition-transform"
        >
          {t('notFound.backHome')}
        </Button>
      </div>
    </div>
  )
}