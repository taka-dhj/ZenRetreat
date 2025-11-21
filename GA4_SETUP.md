# Google Analytics 4 設定ガイド

このドキュメントでは、Zen Retreat ASIAサイトのGoogle Analytics 4（GA4）の詳細設定手順を説明します。

## 📊 現在の実装状況

### 実装済みの機能

- ✅ Google Analytics 4 トラッキングコード（測定ID: `G-YM7EKE4SDE`）
- ✅ ページビュー自動追跡（すべてのページ）
- ✅ お問い合わせフォーム送信イベント（`form_submission`）
- ✅ ブログ記事閲覧イベント（`blog_article_view`）

### 追跡されるイベント

| イベント名 | 説明 | パラメータ |
|------------|------|------------|
| `page_view` | すべてのページ遷移 | 自動 |
| `form_submission` | お問い合わせフォーム送信 | `form_type`, `form_location`, `retreat_interest` |
| `blog_article_view` | ブログ記事閲覧 | `article_slug`, `article_title`, `article_category`, `article_tags`, `article_published_date`, `language` |

---

## 🔗 ステップ1: Google Search Consoleとの連携

### 1-1. Google Search Consoleにサイトを登録

1. [Google Search Console](https://search.google.com/search-console) にアクセス
2. **プロパティーを追加** をクリック
3. **URLプレフィックス** を選択
4. サイトURLを入力: `https://zen-retreat-asia.com`
5. **所有権の確認** を実行
   - **推奨方法**: HTMLファイルをアップロード
   - または、DNSレコード、HTMLタグ、Google Analytics、Google Tag Managerのいずれかで確認

### 1-2. サイトマップを送信

1. Google Search Console → **サイトマップ**
2. **新しいサイトマップを追加**
3. サイトマップURLを入力: `https://zen-retreat-asia.com/sitemap.xml`
4. **送信** をクリック

### 1-3. Google Analyticsと連携

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 左下の **管理（歯車アイコン）** をクリック
3. **プロパティー設定** を選択
4. **Search Console のリンク** セクションまでスクロール
5. **調整** をクリック
6. **Search Console アカウントを選択** → `zen-retreat-asia.com` を選択
7. **保存** をクリック

### 1-4. 連携後の確認

連携後、以下のデータが確認できるようになります：

- **Google Analytics → Reports → Acquisition → Search Console**
  - 検索クエリ（どのキーワードで検索されたか）
  - クリック数
  - インプレッション数
  - CTR（クリック率）
  - 平均順位

---

## 🎯 ステップ2: コンバージョンイベントの設定

### 2-1. お問い合わせフォーム送信をコンバージョンとして設定

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 左下の **管理（歯車アイコン）** をクリック
3. **イベント** を選択（データストリームの下）
4. **作成** をクリック
5. イベント名を入力: `form_submission`
6. **パラメータ** セクションで以下を確認：
   - `form_type`: `contact`
   - `form_location`: `modal` または `page`
   - `retreat_interest`: 選択されたリトリート
7. **保存** をクリック

### 2-2. コンバージョンとしてマーク

1. **イベント** ページで `form_submission` イベントを探す
2. 右側の **コンバージョンとしてマーク** のトグルを **ON** にする
3. これで、お問い合わせフォーム送信がコンバージョンとして計測されます

### 2-3. コンバージョンレポートの確認

設定後、以下の場所でコンバージョンデータを確認できます：

- **Reports → Engagement → Conversions**
  - コンバージョン数
  - コンバージョン率
  - コンバージョンに至った経路

---

## 📈 ステップ3: カスタムレポートの作成

### 3-1. ブログ記事の人気度レポート

#### 方法1: 探索レポートを使用（推奨）

1. Google Analytics → **探索** をクリック
2. **空白** テンプレートを選択
3. **変数** セクションで：
   - **指標**: `Event count`（イベント数）
   - **ディメンション**: `Event label`（記事タイトル）
4. **タブ** セクションで：
   - **行**: `Event label`
   - **値**: `Event count`
5. **フィルター** を追加：
   - `Event name` = `blog_article_view`
6. **保存** をクリック

#### 方法2: 標準レポートで確認

1. **Reports → Engagement → Events**
2. `blog_article_view` イベントをクリック
3. **パラメータ** セクションで以下を確認：
   - `article_title`: 記事タイトル
   - `article_category`: カテゴリ
   - `article_tags`: タグ
   - `article_published_date`: 投稿日

### 3-2. お問い合わせのコンバージョン率レポート

#### 方法1: 探索レポートを使用

1. Google Analytics → **探索** をクリック
2. **空白** テンプレートを選択
3. **変数** セクションで：
   - **指標**: `Conversions`（コンバージョン数）
   - **ディメンション**: `Page path`（ページパス）
4. **タブ** セクションで：
   - **行**: `Page path`
   - **値**: `Conversions`
5. **フィルター** を追加：
   - `Event name` = `form_submission`
6. **保存** をクリック

#### 方法2: 標準レポートで確認

1. **Reports → Engagement → Conversions**
2. `form_submission` コンバージョンをクリック
3. **パラメータ** セクションで以下を確認：
   - `form_location`: モーダル or ページ
   - `retreat_interest`: 興味のあるリトリート

### 3-3. カスタムレポートの保存

作成したレポートは以下で保存・共有できます：

1. レポート右上の **保存** をクリック
2. レポート名を入力（例: "ブログ記事人気度"）
3. **保存** をクリック
4. 保存したレポートは **探索** ページの左メニューからアクセス可能

---

## 📊 便利なレポート例

### レポート1: ブログ記事のパフォーマンス

**目的**: どのブログ記事が最も閲覧されているか

**設定**:
- **イベント**: `blog_article_view`
- **ディメンション**: `article_title`, `article_category`
- **指標**: `Event count`, `Total users`

### レポート2: リトリート別の興味度

**目的**: どのリトリートに最も興味があるか

**設定**:
- **イベント**: `form_submission`
- **ディメンション**: `retreat_interest`
- **指標**: `Conversions`, `Total users`

### レポート3: 言語別の行動分析

**目的**: 日本語ユーザーと英語ユーザーの行動の違い

**設定**:
- **ディメンション**: `language`（ブログ記事閲覧時）
- **指標**: `Event count`, `Total users`, `Conversions`

---

## 🔍 データ確認のタイミング

- **リアルタイムデータ**: すぐに確認可能
- **標準レポート**: 24〜48時間後
- **Search Console連携データ**: 3〜7日後
- **詳細な分析**: 1週間以上のデータ蓄積後

---

## 📝 注意事項

1. **データの反映時間**: 
   - リアルタイムデータは即座に反映
   - 標準レポートは24〜48時間かかる場合があります

2. **プライバシー**: 
   - 個人を特定できる情報（メールアドレス、名前など）は送信していません
   - イベントパラメータには匿名化されたデータのみが含まれます

3. **Cookie同意**: 
   - 必要に応じて、Cookie同意バナーの実装を検討してください

---

## 🆘 トラブルシューティング

### データが表示されない場合

1. **リアルタイムレポート** で確認
   - データがリアルタイムで表示されない場合、トラッキングコードに問題がある可能性があります

2. **ブラウザの開発者ツール** で確認
   - F12 → Network タブ
   - `gtag/js` や `collect` へのリクエストが送信されているか確認

3. **Google Tag Assistant** を使用
   - [Google Tag Assistant](https://tagassistant.google.com/) でトラッキングコードの動作を確認

### イベントが記録されない場合

1. **イベント名の確認**
   - `form_submission`: お問い合わせフォーム送信
   - `blog_article_view`: ブログ記事閲覧

2. **ブラウザのコンソール** で確認
   - F12 → Console タブ
   - エラーメッセージがないか確認

---

## 📚 参考リンク

- [Google Analytics 4 ヘルプ](https://support.google.com/analytics/answer/10089681)
- [Google Search Console ヘルプ](https://support.google.com/webmasters)
- [GA4 イベント設定ガイド](https://support.google.com/analytics/answer/9267735)

---

**最終更新**: 2025年11月

