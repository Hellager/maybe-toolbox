import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="w-full text-center text-xs text-muted-foreground py-6 border-t mt-10">
      <div className="mb-1">{t('copyright')}</div>
      <div>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          苏ICP备2022029029号
        </a>
      </div>
    </footer>
  )
} 