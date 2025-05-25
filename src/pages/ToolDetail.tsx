import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button"

export function ToolDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        返回
      </Button>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">工具 {id} 详情</h1>
        <p className="text-gray-600">
          这是工具 {id} 的详细内容。您可以在这里添加具体的工具功能实现。
        </p>
      </div>
    </div>
  )
} 