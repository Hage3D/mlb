# MLB Results Web Service

MLBの試合結果とハイライトを日本時間で表示するWebサービス。Next.js 15とTypeScriptで構築されており、Vercelでのデプロイ用に最適化されています。

## 📋 プロジェクト概要

- **目的**: MLB試合結果の日本語対応表示とYouTubeハイライト検索
- **技術スタック**: Next.js 15, TypeScript, Tailwind CSS
- **API**: MLB Stats API (公式)
- **デプロイ**: Vercel
- **言語**: 日本語UI、JST時間表示

## 🚀 主要機能

### 試合表示
- **優先度ソート**: パドレス → ドジャース → 日本人選手チーム → その他
- **日本時間表示**: 全ての時刻をJSTで表示
- **日付ナビゲーション**: 前日/翌日への簡単移動
- **リアルタイム更新**: 1時間ごとのISR (Incremental Static Regeneration)

### 日本人選手対応
- **動的チーム検出**: 現在所属チームの自動更新
- **WBC対応**: ヌートバー選手も日本枠に含む
- **フォールバック**: API失敗時の安全な代替データ

### ハイライト機能
- **YouTube統合**: 試合終了後にハイライト検索リンク
- **日付指定検索**: アメリカ現地日付での正確な検索
- **チーム略称対応**: 検索精度向上

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── date/[date]/       # 日付別ページ (動的ルーティング)
│   ├── layout.tsx         # 全体レイアウト
│   └── page.tsx          # ホームページ (最新日付へリダイレクト)
├── components/            # UIコンポーネント
│   └── GameCard.tsx      # 試合表示カード
├── lib/                  # ビジネスロジック
│   ├── constants.ts      # アプリケーション定数
│   ├── date-utils.ts     # 日付変換ユーティリティ
│   ├── game-sorter.ts    # ゲームソートロジック
│   ├── game-utils.ts     # ゲームデータ処理
│   ├── japanese-players.ts # 日本人選手チーム検出
│   ├── mlb-api.ts        # MLB API クライアント
│   ├── team-priority.ts  # チーム優先度設定
│   └── teams.ts          # チーム情報とロゴ
└── types/                # TypeScript型定義
    └── mlb.ts           # MLB関連の型
```

## 🔧 開発コマンド

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# 型チェック
npm run typecheck

# コードフォーマット
npm run lint
```

## 🌐 デプロイ設定

### Vercel設定
- **Framework**: Next.js
- **Node.js**: 18.x以上
- **Build Command**: `npm run build`
- **Install Command**: `npm install`

### 環境変数
現在は外部API キーは不要（MLB Stats APIは公開API）

## 📊 データフロー

### 1. 日付処理
```
JST日付 → US日付変換 → MLB API → 試合データ → JST表示変換
```

### 2. 優先度ソート
```
Priority 1: San Diego Padres
Priority 2: Los Angeles Dodgers  
Priority 3: Japanese Players Teams
Priority 4: Other Teams
```

### 3. 日本人選手チーム (2025年)
- **Los Angeles Dodgers**: 大谷翔平、山本由伸
- **Los Angeles Angels**: 菊池雄星
- **Chicago Cubs**: 鈴木誠也
- **Boston Red Sox**: 吉田正尚
- **St. Louis Cardinals**: ヌートバー (WBC日本代表)

## 🎨 デザイン仕様

- **カラーテーマ**: ライトグレー背景、ホワイトカード
- **レスポンシブ**: モバイル対応 (grid: md:2列, lg:3列)
- **フォント**: システムフォント、日本語対応
- **ホバー効果**: シャドウとトランジション

## 🔄 更新履歴

### v3.0 (最新)
- 大規模リファクタリング完了
- チーム優先度システムの改善
- 日本人選手検出の最適化
- 型安全性の大幅向上

### v2.0
- MLB Stats API統合
- 日付ベースナビゲーション
- YouTube検索の精度向上

### v1.0
- 初期リリース
- 基本的な試合表示機能

## 🐛 トラブルシューティング

### よくある問題

**1. ビルドエラー**
```bash
npm run typecheck  # 型エラーの確認
```

**2. 試合データが表示されない**
- MLB APIのレスポンスを確認
- 日付変換ロジックをチェック

**3. 日本人選手チームが更新されない**
- `japanese-players.ts`の`KNOWN_JAPANESE_PLAYERS`を更新

## 🤝 貢献

1. 移籍情報の更新
2. 新機能の提案
3. バグ報告

## 📝 メモ

- ISRにより1時間ごとにデータ更新
- 24時間キャッシュで日本人選手チーム情報を保持
- Vercelのエッジ機能で高速配信
- 日本のMLBファン向けに最適化

---

**GitHub**: https://github.com/Hage3D/mlb
**Deployment**: Vercel
**Last Updated**: 2025年7月22日