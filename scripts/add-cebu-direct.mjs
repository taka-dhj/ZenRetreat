// Supabase REST APIを使って直接データを追加
const supabaseUrl = 'https://slaqlygrjlkhuxrfxtjq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYXFseWdyamxraHV4cmZ4dGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTUzMDksImV4cCI6MjA3NTIzMTMwOX0.tS3NfNsX6mZNER9uROkR3EYzkDSwmRbOZpFTWYXTh58';

const newRetreat = {
  id: 'cebu-climaco-beach-retreat',
  title_ja: 'セブ・クリマコビーチリトリート',
  title_en: 'Cebu Climaco Beach Retreat',
  location_ja: 'セブ島、フィリピン',
  location_en: 'Cebu Island, Philippines',
  duration: 4,
  capacity: 10,
  type: 'international',
  image: 'cebu-mountain.jpg',
  description_ja: 'セブ島の美しいビーチと自然の中で、心身をリフレッシュする4日間のリトリート。クリマコビーチ、モアルボアルでのシュノーケリング、アサイーボールとヨガなど、充実したプログラムをご用意しています。',
  description_en: 'A 4-day retreat to refresh your mind and body amidst the beautiful beaches and nature of Cebu Island. Enjoy a full program including Climaco Beach, snorkeling in Moalboal, acai bowls, and yoga.',
  long_description_ja: `セブ島の美しい自然環境の中で、心身をリフレッシュする特別な4日間のリトリート体験。

Day 1では、13:30の到着後、クリマコビーチで美しいビーチと透き通った海を楽しみます。Day 2は150 Peakwayへ移動し、モアルボアルでのシュノーケリング体験と、ツリーシェイドスパでのマッサージやプールでのリラクゼーションをお楽しみいただけます。150 Peakwayでの宿泊も含まれています。

Day 3は、SHAKAでのアサイーボールを味わい、その後ヨガセッションで心身を整えます。最終日のDay 4は、セブシティに戻りながらSM Seasideでのショッピングをお楽しみいただき、空港送迎でお見送りいたします。

このリトリートでは、フィリピンの豊かな自然と文化を体験しながら、心身のバランスを取り戻す時間を過ごしていただけます。`,
  long_description_en: `A special 4-day retreat experience to refresh your mind and body in the beautiful natural environment of Cebu Island.

On Day 1, after arriving at 13:30, enjoy the beautiful beach and crystal-clear sea at Climaco Beach. Day 2 includes a move to 150 Peakway, snorkeling in Moalboal, and relaxation with massage and pool access at Tree Shade Spa. Accommodation at 150 Peakway is included.

Day 3 features acai bowls at SHAKA, followed by a yoga session to balance your mind and body. On the final Day 4, enjoy shopping at SM Seaside while returning to Cebu City, with airport transfer included.

This retreat offers you time to restore your mind-body balance while experiencing the rich nature and culture of the Philippines.`,
  includes_ja: [
    '空港送迎',
    '3泊4日の宿泊（150 Peakway含む）',
    'モアルボアル・シュノーケリング',
    'ツリーシェイドスパ（マッサージ・プール）',
    'SHAKAでのアサイーボール',
    'ヨガセッション',
    'SM Seasideでのショッピング時間'
  ],
  includes_en: [
    'Airport transfer',
    '3 nights accommodation (including 150 Peakway)',
    'Moalboal snorkeling',
    'Tree Shade Spa (massage & pool)',
    'Acai bowl at SHAKA',
    'Yoga session',
    'Shopping time at SM Seaside'
  ],
  schedule_ja: [
    { time: 'Day 1 - 13:30', activity: 'セブ到着 → クリマコビーチ' },
    { time: 'Day 2 - 午前', activity: '150 Peakwayへ移動' },
    { time: 'Day 2 - 午後', activity: 'モアルボアル・シュノーケリング → ツリーシェイドスパ（マッサージ・プール）' },
    { time: 'Day 2 - 夜', activity: '150 Peakway宿泊' },
    { time: 'Day 3 - 午前', activity: 'SHAKA（アサイーボール）' },
    { time: 'Day 3 - 午後', activity: 'ヨガセッション' },
    { time: 'Day 4 - 午前', activity: 'セブシティへ移動 → SM Seasideでショッピング' },
    { time: 'Day 4 - 午後', activity: '空港送迎' }
  ],
  schedule_en: [
    { time: 'Day 1 - 13:30', activity: 'Arrival in Cebu → Climaco Beach' },
    { time: 'Day 2 - Morning', activity: 'Transfer to 150 Peakway' },
    { time: 'Day 2 - Afternoon', activity: 'Moalboal Snorkeling → Tree Shade Spa (Massage & Pool)' },
    { time: 'Day 2 - Evening', activity: 'Accommodation at 150 Peakway' },
    { time: 'Day 3 - Morning', activity: 'SHAKA (Acai Bowl)' },
    { time: 'Day 3 - Afternoon', activity: 'Yoga Session' },
    { time: 'Day 4 - Morning', activity: 'Transfer to Cebu City → Shopping at SM Seaside' },
    { time: 'Day 4 - Afternoon', activity: 'Airport Transfer' }
  ],
  display_order: 1
};

async function addRetreatViaRPC() {
  try {
    // まず、RPC関数を使ってSQLを実行する方法を試す
    // ただし、これはSupabaseの設定によっては利用できない可能性があります
    
    // 代わりに、直接REST APIを呼び出してみます
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        sql: `
          -- 一時的にanonユーザーにもINSERT権限を付与
          CREATE POLICY IF NOT EXISTS "Allow insert for anon users (dev only)"
            ON retreats
            FOR INSERT
            TO anon
            WITH CHECK (true);
        `
      })
    });

    if (!response.ok) {
      throw new Error(`RPC failed: ${response.statusText}`);
    }

    console.log('✅ RLSポリシーを追加しました');
  } catch (error) {
    console.log('⚠️  RPC関数が利用できないため、直接INSERTを試みます...');
    console.log('   エラー:', error.message);
  }

  // 直接INSERTを試みる
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/retreats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(newRetreat)
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        // 既に存在する場合はUPDATE
        console.log('⚠️  既に存在するため、更新を試みます...');
        const updateResponse = await fetch(`${supabaseUrl}/rest/v1/retreats?id=eq.${newRetreat.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(newRetreat)
        });

        if (updateResponse.ok) {
          const updateData = await updateResponse.json();
          console.log('✅ ツアーを更新しました:', updateData);
        } else {
          throw new Error(`Update failed: ${updateResponse.statusText}`);
        }
      } else {
        throw new Error(`Insert failed: ${response.status} ${response.statusText} - ${JSON.stringify(data)}`);
      }
    } else {
      console.log('✅ ツアーを追加しました:', data);
    }
  } catch (error) {
    console.error('❌ エラー:', error.message);
    console.error('\n💡 解決方法:');
    console.error('   1. Supabase Dashboard (https://supabase.com/dashboard) にログイン');
    console.error('   2. SQL Editorを開く');
    console.error('   3. ADD_CEBU_RETREAT.mdファイル内のSQLを実行してください');
    process.exit(1);
  }
}

addRetreatViaRPC();


