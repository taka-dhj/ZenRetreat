# トラブルシューティング

## 500エラーが出る場合

### 1. Cloudflare Pagesのログを確認

1. [Cloudflare Pages Dashboard](https://dash.cloudflare.com/) にログイン
2. `zenretreat` プロジェクトを選択
3. **Functions** → **Logs** でログを確認

### 2. よくある原因

#### RESEND_API_KEYが設定されていない

**エラー例:**
```
RESEND_API_KEY is not set in environment variables
```

**解決方法:**
1. Cloudflare Pages Dashboard → **Settings** → **Environment variables**
2. **Production** タブで以下を追加：
   - 変数名: `RESEND_API_KEY`
   - 値: あなたのResend APIキー
3. **Deployments** → 最新のデプロイメント → **Retry deployment**

#### Resend APIキーが無効

**エラー例:**
```
Resend API error (401): Invalid API key
```

**解決方法:**
1. [Resend Dashboard](https://resend.com/api-keys) でAPIキーを確認
2. 新しいAPIキーを作成
3. Cloudflare Pagesの環境変数を更新
4. 再デプロイ

#### Resendのドメイン認証がされていない

**エラー例:**
```
Resend API: Domain not verified
```

**解決方法:**
1. [Resend Dashboard](https://resend.com/domains) でドメインを追加
2. `discoveryhiddenjapan.com` のDNS設定でSPF/DKIMレコードを追加
3. ドメイン認証が完了するまで待つ（通常数分～数時間）

または、開発環境では `onboarding@resend.dev` を送信元として使用できます：

`functions/api/contact.ts` の以下を変更：
```typescript
from: 'onboarding@resend.dev',  // 開発用
// from: 'ZEN RETREAT <noreply@discoveryhiddenjapan.com>',  // 本番用
```

## フロントエンドでエラー詳細を確認する方法

1. フォームを送信して500エラーが出る
2. エラーメッセージの下の「エラー詳細を表示」をクリック
3. 詳細なエラーメッセージを確認
4. ブラウザのコンソール（F12 → Console）も確認

## ローカルでテストする方法

```bash
# ローカル開発サーバーを起動
npm run dev

# Cloudflare Pagesの環境をローカルで再現（wranglerが必要）
npx wrangler pages dev dist --binding RESEND_API_KEY="your_api_key_here"
```

## お問い合わせ

上記で解決しない場合は、以下の情報と共にお問い合わせください：
- Cloudflare Functionsのログ
- ブラウザのコンソールログ
- エラー詳細の内容

