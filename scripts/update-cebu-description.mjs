import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slaqlygrjlkhuxrfxtjq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYXFseWdyamxraHV4cmZ4dGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTUzMDksImV4cCI6MjA3NTIzMTMwOX0.tS3NfNsX6mZNER9uROkR3EYzkDSwmRbOZpFTWYXTh58';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const updatedDescription = {
  long_description_ja: `セブ島の美しい自然環境の中で、心身をリフレッシュする特別な4日間のリトリート体験。

Day 1では、クリマコビーチで美しいビーチと透き通った海、ヨガを楽しみます。Day 2〜3は、モアルボアルでのシュノーケリング、スパでのマッサージやプールでのリラクゼーションを楽しんでから150 Peakwayに宿泊。アサイーボールやオーガニック野菜を楽しみ、旅を通じてヨガセッションで心身を整えます。

このリトリートでは、フィリピンの豊かな自然と文化を体験しながら、心身のバランスを取り戻す時間を過ごしていただけます。`,
  long_description_en: `A special 4-day retreat experience to refresh your mind and body in the beautiful natural environment of Cebu Island.

On Day 1, enjoy the beautiful beach, crystal-clear sea, and yoga at Climaco Beach. On Days 2-3, enjoy snorkeling in Moalboal, massage and pool relaxation at the spa, then stay at 150 Peakway. Savor acai bowls and organic vegetables, and balance your mind and body through yoga sessions throughout your journey.

This retreat offers you time to restore your mind-body balance while experiencing the rich nature and culture of the Philippines.`
};

async function updateDescription() {
  try {
    const { data, error } = await supabase
      .from('retreats')
      .update(updatedDescription)
      .eq('id', 'cebu-climaco-beach-retreat')
      .select();

    if (error) throw error;

    if (data && data.length > 0) {
      console.log('✅ リトリート概要を更新しました！');
      console.log('\n更新された内容:');
      console.log('\n【日本語】');
      console.log(data[0].long_description_ja);
      console.log('\n【English】');
      console.log(data[0].long_description_en);
    } else {
      console.log('⚠️  更新対象のリトリートが見つかりませんでした');
    }
  } catch (error) {
    console.error('❌ エラー:', error);
    console.error('\n💡 Supabase Dashboardで以下のSQLを実行してください:');
    console.error(`
UPDATE retreats
SET 
  long_description_ja = 'セブ島の美しい自然環境の中で、心身をリフレッシュする特別な4日間のリトリート体験。

Day 1では、クリマコビーチで美しいビーチと透き通った海、ヨガを楽しみます。Day 2〜3は、モアルボアルでのシュノーケリング、スパでのマッサージやプールでのリラクゼーションを楽しんでから150 Peakwayに宿泊。アサイーボールやオーガニック野菜を楽しみ、旅を通じてヨガセッションで心身を整えます。

このリトリートでは、フィリピンの豊かな自然と文化を体験しながら、心身のバランスを取り戻す時間を過ごしていただけます。',
  long_description_en = 'A special 4-day retreat experience to refresh your mind and body in the beautiful natural environment of Cebu Island.

On Day 1, enjoy the beautiful beach, crystal-clear sea, and yoga at Climaco Beach. On Days 2-3, enjoy snorkeling in Moalboal, massage and pool relaxation at the spa, then stay at 150 Peakway. Savor acai bowls and organic vegetables, and balance your mind and body through yoga sessions throughout your journey.

This retreat offers you time to restore your mind-body balance while experiencing the rich nature and culture of the Philippines.'
WHERE id = 'cebu-climaco-beach-retreat';
    `);
    process.exit(1);
  }
}

updateDescription();










