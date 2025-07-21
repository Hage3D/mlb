export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          404 - ページが見つかりません
        </h1>
        <p className="text-lg text-gray-600">
          お探しのページは存在しません
        </p>
      </div>
    </div>
  )
}