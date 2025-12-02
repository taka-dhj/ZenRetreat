# セブツアーを追加する（簡単手順）

## ⚡ 3ステップで完了

### ステップ1: Supabase Dashboardを開く
以下のURLをクリックして、Supabase Dashboardにログインしてください：
👉 https://supabase.com/dashboard/project/slaqlygrjlkhuxrfxtjq/sql/new

### ステップ2: 以下のSQLをコピー＆ペースト

```sql
-- 一時的にanonユーザーにもINSERT権限を付与（開発環境のみ）
-- 既存のポリシーがあれば削除
DROP POLICY IF EXISTS "Allow insert for anon users (dev only)" ON retreats;

-- 新しいポリシーを作成
CREATE POLICY "Allow insert for anon users (dev only)"
  ON retreats
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 新しいセブツアーを追加
INSERT INTO retreats (
  id, title_ja, title_en, location_ja, location_en, duration, capacity, type, image,
  description_ja, description_en, long_description_ja, long_description_en,
  includes_ja, includes_en, schedule_ja, schedule_en, display_order
) VALUES (
  'cebu-climaco-beach-retreat',
  'セブ・クリマコビーチリトリート',
  'Cebu Climaco Beach Retreat',
  'セブ島、フィリピン',
  'Cebu Island, Philippines',
  4, 10, 'international', 'cebu-mountain.jpg',
  'セブ島の美しいビーチと自然の中で、心身をリフレッシュする4日間のリトリート。クリマコビーチ、モアルボアルでのシュノーケリング、アサイーボールとヨガなど、充実したプログラムをご用意しています。',
  'A 4-day retreat to refresh your mind and body amidst the beautiful beaches and nature of Cebu Island. Enjoy a full program including Climaco Beach, snorkeling in Moalboal, acai bowls, and yoga.',
  'セブ島の美しい自然環境の中で、心身をリフレッシュする特別な4日間のリトリート体験。

Day 1では、13:30の到着後、クリマコビーチで美しいビーチと透き通った海を楽しみます。Day 2は150 Peakwayへ移動し、モアルボアルでのシュノーケリング体験と、ツリーシェイドスパでのマッサージやプールでのリラクゼーションをお楽しみいただけます。150 Peakwayでの宿泊も含まれています。

Day 3は、SHAKAでのアサイーボールを味わい、その後ヨガセッションで心身を整えます。最終日のDay 4は、セブシティに戻りながらSM Seasideでのショッピングをお楽しみいただき、空港送迎でお見送りいたします。

このリトリートでは、フィリピンの豊かな自然と文化を体験しながら、心身のバランスを取り戻す時間を過ごしていただけます。',
  'A special 4-day retreat experience to refresh your mind and body in the beautiful natural environment of Cebu Island.

On Day 1, after arriving at 13:30, enjoy the beautiful beach and crystal-clear sea at Climaco Beach. Day 2 includes a move to 150 Peakway, snorkeling in Moalboal, and relaxation with massage and pool access at Tree Shade Spa. Accommodation at 150 Peakway is included.

Day 3 features acai bowls at SHAKA, followed by a yoga session to balance your mind and body. On the final Day 4, enjoy shopping at SM Seaside while returning to Cebu City, with airport transfer included.

This retreat offers you time to restore your mind-body balance while experiencing the rich nature and culture of the Philippines.',
  '["空港送迎", "3泊4日の宿泊（150 Peakway含む）", "モアルボアル・シュノーケリング", "ツリーシェイドスパ（マッサージ・プール）", "SHAKAでのアサイーボール", "ヨガセッション", "SM Seasideでのショッピング時間"]'::jsonb,
  '["Airport transfer", "3 nights accommodation (including 150 Peakway)", "Moalboal snorkeling", "Tree Shade Spa (massage & pool)", "Acai bowl at SHAKA", "Yoga session", "Shopping time at SM Seaside"]'::jsonb,
  '[{"time": "Day 1 - 13:30", "activity": "セブ到着 → クリマコビーチ"}, {"time": "Day 2 - 午前", "activity": "150 Peakwayへ移動"}, {"time": "Day 2 - 午後", "activity": "モアルボアル・シュノーケリング → ツリーシェイドスパ（マッサージ・プール）"}, {"time": "Day 2 - 夜", "activity": "150 Peakway宿泊"}, {"time": "Day 3 - 午前", "activity": "SHAKA（アサイーボール）"}, {"time": "Day 3 - 午後", "activity": "ヨガセッション"}, {"time": "Day 4 - 午前", "activity": "セブシティへ移動 → SM Seasideでショッピング"}, {"time": "Day 4 - 午後", "activity": "空港送迎"}]'::jsonb,
  '[{"time": "Day 1 - 13:30", "activity": "Arrival in Cebu → Climaco Beach"}, {"time": "Day 2 - Morning", "activity": "Transfer to 150 Peakway"}, {"time": "Day 2 - Afternoon", "activity": "Moalboal Snorkeling → Tree Shade Spa (Massage & Pool)"}, {"time": "Day 2 - Evening", "activity": "Accommodation at 150 Peakway"}, {"time": "Day 3 - Morning", "activity": "SHAKA (Acai Bowl)"}, {"time": "Day 3 - Afternoon", "activity": "Yoga Session"}, {"time": "Day 4 - Morning", "activity": "Transfer to Cebu City → Shopping at SM Seaside"}, {"time": "Day 4 - Afternoon", "activity": "Airport Transfer"}]'::jsonb,
  1
)
ON CONFLICT (id) DO UPDATE SET
  title_ja = EXCLUDED.title_ja,
  title_en = EXCLUDED.title_en,
  location_ja = EXCLUDED.location_ja,
  location_en = EXCLUDED.location_en,
  duration = EXCLUDED.duration,
  capacity = EXCLUDED.capacity,
  type = EXCLUDED.type,
  image = EXCLUDED.image,
  description_ja = EXCLUDED.description_ja,
  description_en = EXCLUDED.description_en,
  long_description_ja = EXCLUDED.long_description_ja,
  long_description_en = EXCLUDED.long_description_en,
  includes_ja = EXCLUDED.includes_ja,
  includes_en = EXCLUDED.includes_en,
  schedule_ja = EXCLUDED.schedule_ja,
  schedule_en = EXCLUDED.schedule_en,
  display_order = EXCLUDED.display_order,
  updated_at = now();
```

### ステップ3: 「Run」ボタンをクリック

SQLを実行したら、以下のコマンドで確認できます：

```bash
node scripts/check-retreats.mjs
```

## ✅ 確認方法

SQL実行後、以下のURLで確認できます：

- **国際ツアーページ**: http://localhost:5173/international
- **ツアー詳細ページ**: http://localhost:5173/retreat/cebu-climaco-beach-retreat

開発サーバーが起動していない場合は、以下のコマンドで起動してください：

```bash
npm run dev
```

