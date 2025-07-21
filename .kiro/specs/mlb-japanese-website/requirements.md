# Requirements Document

## Introduction

MLBの試合結果と試合概要を日本語で毎日更新するウェブサイトの開発。ユーザーは最新の試合情報を日本語で確認でき、YouTubeのハイライト動画も視聴できる。完全無料のソリューションとして構築する。

## Requirements

### Requirement 1

**User Story:** MLBファンとして、最新の試合結果を日本語で確認したいので、毎日更新される試合情報にアクセスできるようにしたい

#### Acceptance Criteria

1. WHEN ユーザーがウェブサイトにアクセス THEN システム SHALL 当日および過去7日間の試合結果を日本語で表示する
2. WHEN 新しい試合が終了 THEN システム SHALL 自動的に試合結果を更新する
3. WHEN ユーザーが特定の日付を選択 THEN システム SHALL その日の全試合結果を表示する

### Requirement 2

**User Story:** MLBファンとして、試合の詳細な概要を日本語で読みたいので、各試合の重要なポイントや統計情報を確認できるようにしたい

#### Acceptance Criteria

1. WHEN ユーザーが特定の試合をクリック THEN システム SHALL 試合の詳細概要を日本語で表示する
2. WHEN 試合概要が表示される THEN システム SHALL スコア、イニング別得点、主要な統計情報を含む
3. WHEN 試合に注目すべきプレイがある THEN システム SHALL そのプレイの説明を日本語で提供する

### Requirement 3

**User Story:** MLBファンとして、試合のハイライト動画を視聴したいので、YouTubeの埋め込み動画でハイライトを見られるようにしたい

#### Acceptance Criteria

1. WHEN ユーザーが試合詳細を表示 THEN システム SHALL 関連するYouTubeハイライト動画を埋め込み表示する
2. WHEN ハイライト動画が利用可能 THEN システム SHALL 動画を直接ウェブサイト内で再生可能にする
3. WHEN ハイライト動画が見つからない THEN システム SHALL 「ハイライト動画準備中」のメッセージを表示する

### Requirement 4

**User Story:** ユーザーとして、無料でサービスを利用したいので、課金や登録なしでアクセスできるようにしたい

#### Acceptance Criteria

1. WHEN ユーザーがウェブサイトにアクセス THEN システム SHALL ユーザー登録なしで全機能を利用可能にする
2. WHEN システムが運用される THEN システム SHALL 無料のAPIとサービスのみを使用する
3. WHEN データを取得する THEN システム SHALL 無料利用枠内でAPI呼び出しを管理する
4. WHEN サイトが運営される THEN システム SHALL 運営者にとって完全無料のホスティングサービスを使用する
5. WHEN システムがデプロイされる THEN システム SHALL GitHub Pages、Netlify、Vercelなどの無料ホスティングを利用する

### Requirement 5

**User Story:** ユーザーとして、モバイルデバイスでも快適に閲覧したいので、レスポンシブなデザインで表示されるようにしたい

#### Acceptance Criteria

1. WHEN ユーザーがモバイルデバイスでアクセス THEN システム SHALL モバイル最適化されたレイアウトを表示する
2. WHEN ユーザーがタブレットでアクセス THEN システム SHALL タブレット向けのレイアウトを表示する
3. WHEN ユーザーがデスクトップでアクセス THEN システム SHALL デスクトップ向けのレイアウトを表示する

### Requirement 6

**User Story:** ユーザーとして、お気に入りのチームの情報を優先的に見たいので、チーム別でフィルタリングできるようにしたい

#### Acceptance Criteria

1. WHEN ユーザーがチームを選択 THEN システム SHALL そのチームの試合のみを表示する
2. WHEN ユーザーが「全チーム」を選択 THEN システム SHALL 全ての試合を表示する
3. WHEN チームフィルターが適用される THEN システム SHALL 選択されたチームを視覚的に強調表示する

### Requirement 7

**User Story:** ユーザーとして、試合結果を知りたくない時があるので、得点を隠すモードに簡単に切り替えられるようにしたい

#### Acceptance Criteria

1. WHEN ユーザーが得点隠しモードを有効にする THEN システム SHALL 全ての試合のスコアを「？-？」で表示する
2. WHEN 得点隠しモードが有効 THEN システム SHALL 試合詳細でもスコア情報を隠す
3. WHEN ユーザーが得点隠しモードを切り替える THEN システム SHALL ワンクリックで即座にモードを変更する
4. WHEN 得点隠しモードが有効 THEN システム SHALL ユーザーの設定をローカルストレージに保存する

### Requirement 8

**User Story:** ユーザーとして、スマートフォンで快適に操作したいので、タッチフレンドリーなUIで設計されたインターフェースを使いたい

#### Acceptance Criteria

1. WHEN ユーザーがスマートフォンでアクセス THEN システム SHALL 指で操作しやすいボタンサイズを提供する
2. WHEN ユーザーがタッチ操作を行う THEN システム SHALL 適切なタッチフィードバックを提供する
3. WHEN ユーザーがスワイプ操作を行う THEN システム SHALL 日付やチーム切り替えでスワイプナビゲーションをサポートする
4. WHEN ユーザーがモバイルでアクセス THEN システム SHALL 縦向き・横向き両方のレイアウトに対応する