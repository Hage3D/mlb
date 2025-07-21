'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
          エラーが発生しました
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          申し訳ありません。問題が発生しました。
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          再試行
        </button>
      </div>
    </div>
  )
}