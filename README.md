# ZEN RETREAT

日本とアジアのヨガリトリートを提供するウェブサイト

## 🚀 デプロイメント

このプロジェクトは Cloudflare Pages にデプロイされています。

**本番サイト:** https://zenretreat.pages.dev/

## 📋 環境変数の設定

### Cloudflare Pages での設定

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. `zenretreat` プロジェクトを選択
3. **Settings** → **Environment variables** に移動
4. **Production** タブで以下を設定：

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `RESEND_API_KEY` | `re_EHsFcTbn_JyiCZTDGcJBedDF5h9dnzd3i` | Resend API キー |

5. **Save** をクリック
6. **Deployments** → 最新のデプロイメント → **Retry deployment** で再デプロイ

### Resend ドメイン認証

メール送信には `zen-retreat-asia.com` ドメインの認証が必要です：

1. [Resend Dashboard](https://resend.com/domains) にアクセス
2. `zen-retreat-asia.com` を追加
3. 表示されるDNSレコード（SPF、DKIM）をドメインのDNS設定に追加
4. 認証が完了するまで待つ（通常数分～数時間）

## 🛠️ 開発環境

### 前提条件

- Node.js 18以上
- npm

### セットアップ

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

### ローカルでFunctionsをテスト

```bash
# ビルド後、Cloudflare Pagesの環境をローカルで再現
npm run build
npx wrangler pages dev dist --binding RESEND_API_KEY="re_EHsFcTbn_JyiCZTDGcJBedDF5h9dnzd3i"
```

## 📁 プロジェクト構造

```
ZenRetreat/
├── functions/          # Cloudflare Functions (サーバーレス API)
│   └── api/
│       ├── contact.ts  # お問い合わせフォーム処理
│       └── test.ts     # 環境変数テスト用
├── src/
│   ├── components/     # Reactコンポーネント
│   ├── pages/          # ページコンポーネント
│   ├── contexts/       # React Context
│   ├── hooks/          # カスタムフック
│   ├── lib/            # ユーティリティ
│   └── types/          # TypeScript型定義
├── public/             # 静的ファイル
└── dist/               # ビルド出力 (git管理外)
```

## 🔧 トラブルシューティング

詳細は [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) を参照してください。

### クイックチェック

1. **環境変数の確認**
   ```
   https://zenretreat.pages.dev/api/test
   ```
   にアクセスして環境変数が正しく設定されているか確認

2. **エラーログの確認**
   - Cloudflare Dashboard → Functions → Logs

3. **フォームエラーの詳細**
   - フォーム送信後、「エラー詳細を表示」をクリック

## 📧 使用しているメールアドレス

- **送信元:** info@zen-retreat-asia.com
- **送信先（管理者）:** info@zen-retreat-asia.com
- **顧客への確認メール:** フォームで入力されたメールアドレス

## 🔄 デプロイフロー

```
git push origin main
    ↓
Cloudflare Pages が自動デプロイ
    ↓
https://zenretreat.pages.dev/ に反映
```

## 📝 主要な機能

- 🧘 ヨガリトリート一覧・詳細
- 🌍 日本語・英語の多言語対応
- 📩 お問い合わせフォーム（Resend経由でメール送信）
- 📱 レスポンシブデザイン
- ⚡ Cloudflare Pages でホスティング

## 🛡️ セキュリティ

- APIキーは環境変数で管理（コードには含めない）
- CORS設定済み
- フォームバリデーション

## 📄 ライセンス

Private - All rights reserved

