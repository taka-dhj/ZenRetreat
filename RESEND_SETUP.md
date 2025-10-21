# Resend セットアップガイド

このガイドでは、ZEN RETREATのお問い合わせフォームで使用するResendの設定方法を説明します。

## 📧 現在の設定

- **APIキー:** `re_EHsFcTbn_JyiCZTDGcJBedDF5h9dnzd3i`
- **ドメイン:** `zen-retreat-asia.com`
- **送信元メールアドレス:** `info@zen-retreat-asia.com`
- **受信メールアドレス:** `info@zen-retreat-asia.com`

## ステップ1: Resendアカウントの確認

1. [Resend](https://resend.com/) にログイン
2. 現在のAPIキーを確認
   - [API Keys](https://resend.com/api-keys) にアクセス
   - `re_EHsFcTbn_JyiCZTDGcJBedDF5h9dnzd3i` が存在することを確認

## ステップ2: ドメインの追加と認証

### ドメインの追加

1. [Resend Domains](https://resend.com/domains) にアクセス
2. **Add Domain** をクリック
3. `zen-retreat-asia.com` を入力
4. **Add** をクリック

### DNS設定（重要！）

Resendが表示するDNSレコードを、ドメインのDNS管理画面に追加する必要があります。

#### 追加が必要なレコード例

```
TYPEレコード         NAME                                VALUE
──────────────────────────────────────────────────────────────────
TXT                 @                                   v=spf1 include:_spf.resend.com ~all
TXT                 resend._domainkey                   (Resendが表示する値)
```

#### DNS設定の手順

**使用しているDNSプロバイダー（Cloudflare、Route53など）で:**

1. DNSレコード管理画面を開く
2. 上記のレコードを追加：
   - **SPFレコード**
     - Type: `TXT`
     - Name: `@` または空白
     - Value: `v=spf1 include:_spf.resend.com ~all`
   
   - **DKIMレコード**
     - Type: `TXT`
     - Name: `resend._domainkey`
     - Value: Resendダッシュボードに表示される値（非常に長い文字列）

3. **保存**して反映を待つ（数分～数時間）

### 認証の確認

1. Resend Dashboardのドメインページで **Verify** をクリック
2. ステータスが **Verified** になることを確認
3. 緑色のチェックマークが表示されればOK

## ステップ3: Cloudflare Pagesに環境変数を設定

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. `zenretreat` プロジェクトを選択
3. **Settings** → **Environment variables**
4. **Production** タブで以下を追加：
   - 変数名: `RESEND_API_KEY`
   - 値: `re_EHsFcTbn_JyiCZTDGcJBedDF5h9dnzd3i`
5. **Save**
6. **Deployments** → 最新のデプロイメント → **Retry deployment**

## ステップ4: テスト

### 環境変数のテスト

ブラウザで以下のURLにアクセス：
```
https://zenretreat.pages.dev/api/test
```

**期待される結果:**
```json
{
  "status": "ok",
  "environment": {
    "hasResendApiKey": true,
    "apiKeyPreview": "re_EHsF...zd3i"
  },
  "message": "Environment is configured correctly"
}
```

### フォーム送信のテスト

1. https://zenretreat.pages.dev/contact にアクセス
2. フォームに情報を入力
3. 送信
4. エラーが出ないことを確認
5. `info@zen-retreat-asia.com` にメールが届くことを確認

## 🚨 よくあるエラーと解決方法

### エラー1: "Domain not verified"

```
Resend API: The zen-retreat-asia.com domain is not verified
```

**原因:** DNSレコードが正しく設定されていない、または反映待ち

**解決方法:**
1. DNSレコードを再確認
2. DNS反映を待つ（最大24時間、通常は数分～数時間）
3. Resend Dashboardで **Verify** を再度クリック

### エラー2: "Invalid API key"

```
Resend API error (401): Invalid API key
```

**原因:** APIキーが間違っているか、無効化されている

**解決方法:**
1. [Resend API Keys](https://resend.com/api-keys) で新しいキーを作成
2. Cloudflare Pagesの環境変数を更新
3. 再デプロイ

### エラー3: "RESEND_API_KEY is not set"

```
Server configuration error: RESEND_API_KEY not set
```

**原因:** Cloudflare Pagesで環境変数が設定されていない

**解決方法:**
1. Cloudflare Dashboard → Settings → Environment variables
2. `RESEND_API_KEY` を追加
3. 再デプロイ

## 🔍 ログの確認方法

### Resendのログ

1. [Resend Dashboard](https://resend.com/) にログイン
2. **Emails** タブで送信履歴を確認
3. 各メールをクリックして詳細を確認

### Cloudflare Functionsのログ

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. `zenretreat` プロジェクト
3. **Functions** → **Logs**

## 📞 サポート

問題が解決しない場合：
1. Resend: https://resend.com/support
2. Cloudflare: https://community.cloudflare.com/

## ✅ チェックリスト

- [ ] Resendアカウントにログインできる
- [ ] APIキー `re_EHsFcTbn_JyiCZTDGcJBedDF5h9dnzd3i` が存在する
- [ ] ドメイン `zen-retreat-asia.com` が追加されている
- [ ] DNSレコード（SPF、DKIM）が設定されている
- [ ] ドメインが **Verified** ステータスになっている
- [ ] Cloudflare Pagesに `RESEND_API_KEY` が設定されている
- [ ] `/api/test` で環境変数が確認できる
- [ ] フォーム送信でメールが届く

