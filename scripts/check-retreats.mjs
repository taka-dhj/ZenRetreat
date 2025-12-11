import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slaqlygrjlkhuxrfxtjq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYXFseWdyamxraHV4cmZ4dGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTUzMDksImV4cCI6MjA3NTIzMTMwOX0.tS3NfNsX6mZNER9uROkR3EYzkDSwmRbOZpFTWYXTh58';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkRetreats() {
  try {
    const { data, error } = await supabase
      .from('retreats')
      .select('*')
      .eq('type', 'international')
      .order('display_order', { ascending: true });

    if (error) throw error;

    console.log('📋 現在の国際ツアー一覧:');
    console.log(`   合計: ${data?.length || 0}件\n`);
    
    if (data && data.length > 0) {
      data.forEach((retreat, index) => {
        console.log(`${index + 1}. ${retreat.title_ja} (ID: ${retreat.id})`);
      });
    } else {
      console.log('   ⚠️  国際ツアーが見つかりませんでした');
    }

    // セブツアーが存在するか確認
    const { data: cebuRetreat } = await supabase
      .from('retreats')
      .select('id')
      .eq('id', 'cebu-climaco-beach-retreat')
      .maybeSingle();

    if (cebuRetreat) {
      console.log('\n✅ セブ・クリマコビーチリトリートは既に追加されています');
    } else {
      console.log('\n❌ セブ・クリマコビーチリトリートはまだ追加されていません');
    }
  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

checkRetreats();





