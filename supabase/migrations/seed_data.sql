-- First, create the tables
CREATE TABLE IF NOT EXISTS retreats (
  id text PRIMARY KEY,
  title_ja text NOT NULL,
  title_en text NOT NULL,
  location_ja text NOT NULL,
  location_en text NOT NULL,
  duration integer NOT NULL DEFAULT 0,
  price integer NOT NULL DEFAULT 0,
  capacity integer NOT NULL DEFAULT 0,
  type text NOT NULL DEFAULT 'domestic',
  image text NOT NULL DEFAULT '',
  description_ja text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  long_description_ja text NOT NULL DEFAULT '',
  long_description_en text NOT NULL DEFAULT '',
  includes_ja jsonb NOT NULL DEFAULT '[]'::jsonb,
  includes_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  schedule_ja jsonb NOT NULL DEFAULT '[]'::jsonb,
  schedule_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE retreats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read retreats"
  ON retreats
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS retreats_type_idx ON retreats(type);
CREATE INDEX IF NOT EXISTS retreats_display_order_idx ON retreats(display_order);

CREATE TABLE IF NOT EXISTS blog_posts (
  id text PRIMARY KEY,
  title_ja text NOT NULL,
  title_en text NOT NULL,
  excerpt_ja text NOT NULL DEFAULT '',
  excerpt_en text NOT NULL DEFAULT '',
  content_ja text NOT NULL DEFAULT '',
  content_en text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  category_ja text NOT NULL DEFAULT '',
  category_en text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  published_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  TO public
  USING (true);

-- Insert retreat data
INSERT INTO retreats (id, title_ja, title_en, location_ja, location_en, duration, price, capacity, type, image, description_ja, description_en, long_description_ja, long_description_en, includes_ja, includes_en, schedule_ja, schedule_en, display_order) VALUES
('kyoto-chishakuin', '京都・智積院寺院ヨガリトリート', 'Kyoto Chishakuin Temple Yoga Retreat', '京都・智積院', 'Kyoto, Chishakuin Temple', 6, 298000, 8, 'domestic', '/image copy.png', '古都の静寂な寺院での瞑想とヨガ。千年の歴史を持つ智積院で心の平穏を見つけましょう。', 'Meditation and yoga in the serene temples of ancient capital. Find peace of mind at Chishakuin Temple with a thousand years of history.', '京都の東山に位置する智積院は、真言宗智山派の総本山として千年以上の歴史を誇る名刹です。このリトリートでは、寺院の静寂な環境の中で本格的なヨガと瞑想を体験していただきます。朝のお勤めから始まり、庭園での瞑想、精進料理、そして夕方の座禅まで、日本の伝統的な精神文化を深く体験できるプログラムです。', 'Chishakuin Temple, located in Higashiyama, Kyoto, is the head temple of the Shingon Chizan sect with over a thousand years of history. In this retreat, you will experience authentic yoga and meditation in the serene temple environment. From morning services to garden meditation, vegetarian cuisine, and evening zazen, this program offers a deep experience of traditional Japanese spiritual culture.', '["宿坊での宿泊（5泊）","精進料理（朝・昼・夕食）","ヨガ・瞑想指導","朝のお勤め参加","庭園散策ガイド","茶道体験","書道体験"]', '["Temple lodging (5 nights)","Vegetarian meals (breakfast, lunch, dinner)","Yoga and meditation instruction","Morning service participation","Garden walk guide","Tea ceremony experience","Calligraphy experience"]', '[{"time":"6:00","activity":"朝のお勤め・座禅"},{"time":"7:30","activity":"朝食（精進料理）"},{"time":"9:00","activity":"庭園ヨガ"},{"time":"11:00","activity":"瞑想指導"},{"time":"12:30","activity":"昼食"},{"time":"14:00","activity":"茶道・書道体験"},{"time":"16:00","activity":"自由時間・庭園散策"},{"time":"18:00","activity":"夕食"},{"time":"19:30","activity":"夕方の座禅"},{"time":"21:00","activity":"就寝準備"}]', '[{"time":"6:00","activity":"Morning service & Zazen"},{"time":"7:30","activity":"Breakfast (vegetarian)"},{"time":"9:00","activity":"Garden yoga"},{"time":"11:00","activity":"Meditation instruction"},{"time":"12:30","activity":"Lunch"},{"time":"14:00","activity":"Tea ceremony & Calligraphy"},{"time":"16:00","activity":"Free time & Garden walk"},{"time":"18:00","activity":"Dinner"},{"time":"19:30","activity":"Evening Zazen"},{"time":"21:00","activity":"Bedtime preparation"}]', 1),

('yamanashi-forest', '山梨・森林セラピー＆ヨガリトリート', 'Yamanashi Forest Therapy & Yoga Retreat', '山梨・富士五湖', 'Yamanashi, Fuji Five Lakes', 4, 168000, 12, 'domestic', '/image copy copy.png', '富士山を望む森林でのヨガと温泉。自然のエネルギーで心身をリフレッシュ。', 'Yoga and hot springs in forests with Mt. Fuji views. Refresh your mind and body with nature energy.', '富士山の麓、山梨県の美しい森林地帯で行う自然療法リトリートです。森林セラピーの効果を最大限に活用し、樹木の発するフィトンチッドや森の音、香りを感じながらヨガと瞑想を行います。温泉での癒しも含め、都市生活で疲れた心身を自然の力で根本から回復させるプログラムです。', 'A nature therapy retreat in the beautiful forest area of Yamanashi Prefecture at the foot of Mt. Fuji. Maximizing the effects of forest therapy, we practice yoga and meditation while feeling the phytoncides emitted by trees, forest sounds, and aromas. Including healing in hot springs, this program fundamentally restores minds and bodies tired from urban life with the power of nature.', '["ロッジ宿泊（3泊）","地元食材を使った食事","森林ヨガ・瞑想指導","温泉入浴","ハイキングガイド","呼吸法ワークショップ","アロマセラピー"]', '["Lodge accommodation (3 nights)","Meals using local ingredients","Forest yoga & meditation instruction","Hot spring bathing","Hiking guide","Breathing technique workshop","Aromatherapy"]', '[{"time":"6:30","activity":"朝の森林ヨガ"},{"time":"8:00","activity":"朝食"},{"time":"9:30","activity":"森林セラピーウォーク"},{"time":"11:30","activity":"呼吸法ワークショップ"},{"time":"12:30","activity":"昼食"},{"time":"14:00","activity":"温泉入浴・休憩"},{"time":"16:00","activity":"アロマセラピー"},{"time":"18:00","activity":"夕食"},{"time":"19:30","activity":"夜の瞑想"},{"time":"21:00","activity":"自由時間"}]', '[{"time":"6:30","activity":"Morning forest yoga"},{"time":"8:00","activity":"Breakfast"},{"time":"9:30","activity":"Forest therapy walk"},{"time":"11:30","activity":"Breathing technique workshop"},{"time":"12:30","activity":"Lunch"},{"time":"14:00","activity":"Hot spring bathing & rest"},{"time":"16:00","activity":"Aromatherapy"},{"time":"18:00","activity":"Dinner"},{"time":"19:30","activity":"Evening meditation"},{"time":"21:00","activity":"Free time"}]', 2),

('hokkaido-onsen', '北海道・温泉＆雪見ヨガリトリート', 'Hokkaido Hot Springs & Snow Yoga Retreat', '北海道・ニセコ', 'Hokkaido, Niseko', 5, 248000, 10, 'domestic', '/yuki.jpg', '雪景色の中での特別なヨガ体験と天然温泉。冬の北海道の美しさを堪能。', 'Special yoga experience in snowy landscapes and natural hot springs. Enjoy the beauty of winter Hokkaido.', '北海道ニセコの雪景色の中で行う特別なヨガリトリートです。雪の上でのヨガ体験、温泉での温冷療法、そして北海道の新鮮な食材を使った料理で、冬の北海道ならではの癒しを体験していただきます。雪見露天風呂での瞑想は、他では味わえない特別な体験となるでしょう。', 'A special yoga retreat in the snowy landscape of Niseko, Hokkaido. Experience unique healing of winter Hokkaido through yoga on snow, hot and cold therapy in hot springs, and cuisine using fresh Hokkaido ingredients. Meditation in outdoor hot springs with snow views will be a special experience you can''t find anywhere else.', '["温泉旅館宿泊（4泊）","北海道食材の料理","雪上ヨガ指導","温泉入浴（露天風呂含む）","スノーシューハイキング","温冷療法指導","アイスバス体験"]', '["Hot spring ryokan accommodation (4 nights)","Cuisine with Hokkaido ingredients","Snow yoga instruction","Hot spring bathing (including outdoor baths)","Snowshoe hiking","Hot and cold therapy instruction","Ice bath experience"]', '[{"time":"7:00","activity":"朝の雪上ヨガ"},{"time":"8:30","activity":"朝食"},{"time":"10:00","activity":"スノーシューハイキング"},{"time":"12:00","activity":"昼食"},{"time":"13:30","activity":"温泉入浴・休憩"},{"time":"15:30","activity":"温冷療法ワークショップ"},{"time":"17:00","activity":"雪見露天風呂瞑想"},{"time":"18:30","activity":"夕食"},{"time":"20:00","activity":"室内ヨガ・ストレッチ"},{"time":"21:30","activity":"自由時間"}]', '[{"time":"7:00","activity":"Morning snow yoga"},{"time":"8:30","activity":"Breakfast"},{"time":"10:00","activity":"Snowshoe hiking"},{"time":"12:00","activity":"Lunch"},{"time":"13:30","activity":"Hot spring bathing & rest"},{"time":"15:30","activity":"Hot and cold therapy workshop"},{"time":"17:00","activity":"Snow-viewing outdoor bath meditation"},{"time":"18:30","activity":"Dinner"},{"time":"20:00","activity":"Indoor yoga & stretching"},{"time":"21:30","activity":"Free time"}]', 3),

('kumano-kodo', '熊野古道・巡礼ウォーキング＆ヨガリトリート', 'Kumano Kodo Pilgrimage Walking & Yoga Retreat', '和歌山・熊野古道', 'Wakayama, Kumano Kodo', 6, 278000, 8, 'domestic', '/image copy copy copy.png', '世界遺産の熊野古道を歩く巡礼体験。古代からの聖地でのヨガと瞑想。', 'Pilgrimage experience walking the World Heritage Kumano Kodo. Yoga and meditation at ancient sacred sites.', '世界遺産に登録されている熊野古道を歩きながら行う巡礼ヨガリトリートです。古代から続く聖地を巡りながら、自然の中でのヨガと瞑想を深めます。熊野三山への参拝、温泉での癒し、そして地元の精進料理を楽しみながら、心身の浄化と再生を体験できるプログラムです。', 'A pilgrimage yoga retreat walking the World Heritage Kumano Kodo. Deepen your yoga and meditation practice in nature while visiting sacred sites that have existed since ancient times. This program allows you to experience purification and renewal of mind and body while visiting Kumano Sanzan shrines, healing in hot springs, and enjoying local vegetarian cuisine.', '["宿坊・旅館宿泊（5泊）","精進料理・地元料理","熊野古道ウォーキングガイド","ヨガ・瞑想指導","温泉入浴","熊野三山参拝","自然瞑想"]', '["Temple & inn accommodation (5 nights)","Vegetarian & local cuisine","Kumano Kodo walking guide","Yoga & meditation instruction","Hot spring bathing","Kumano Sanzan shrine visits","Nature meditation"]', '[{"time":"6:00","activity":"朝のヨガ"},{"time":"7:30","activity":"朝食"},{"time":"8:30","activity":"熊野古道ウォーキング"},{"time":"12:00","activity":"昼食"},{"time":"13:30","activity":"聖地参拝"},{"time":"15:30","activity":"温泉入浴・休憩"},{"time":"17:00","activity":"自然瞑想"},{"time":"18:30","activity":"夕食"},{"time":"20:00","activity":"夜の瞑想"},{"time":"21:30","activity":"自由時間"}]', '[{"time":"6:00","activity":"Morning yoga"},{"time":"7:30","activity":"Breakfast"},{"time":"8:30","activity":"Kumano Kodo walking"},{"time":"12:00","activity":"Lunch"},{"time":"13:30","activity":"Sacred site visit"},{"time":"15:30","activity":"Hot spring bathing & rest"},{"time":"17:00","activity":"Nature meditation"},{"time":"18:30","activity":"Dinner"},{"time":"20:00","activity":"Evening meditation"},{"time":"21:30","activity":"Free time"}]', 5),

('nikko-temple', '日光・東照宮神社ヨガリトリート', 'Nikko Toshogu Shrine Yoga Retreat', '栃木・日光', 'Tochigi, Nikko', 4, 188000, 12, 'domestic', '/shrine-architecture.jpg', '歴史ある神社での神聖なヨガ体験。日光の美しい自然に囲まれながら。', 'Sacred yoga experience at historic shrines. Surrounded by the beautiful nature of Nikko.', '世界遺産・日光東照宮をはじめとする歴史ある神社仏閣で行うヨガリトリートです。神聖な空気に包まれた境内でのヨガと瞑想、そして日光の美しい自然の中でのトレッキングを楽しめます。温泉での癒しと地元の精進料理で、心身ともにリフレッシュできるプログラムです。', 'A yoga retreat at historic shrines and temples including World Heritage Site Nikko Toshogu. Enjoy yoga and meditation in sacred precincts filled with divine atmosphere, and trekking in Nikko''s beautiful nature. This program refreshes both mind and body through healing in hot springs and local vegetarian cuisine.', '["温泉旅館宿泊（3泊）","精進料理・地元料理","神社ヨガ・瞑想指導","東照宮参拝ガイド","自然トレッキング","温泉入浴","禅体験"]', '["Hot spring inn accommodation (3 nights)","Vegetarian & local cuisine","Shrine yoga & meditation instruction","Toshogu visit guide","Nature trekking","Hot spring bathing","Zen experience"]', '[{"time":"6:30","activity":"朝の神社ヨガ"},{"time":"8:00","activity":"朝食"},{"time":"9:30","activity":"東照宮参拝"},{"time":"11:30","activity":"瞑想指導"},{"time":"12:30","activity":"昼食"},{"time":"14:00","activity":"自然トレッキング"},{"time":"16:00","activity":"温泉入浴・休憩"},{"time":"18:00","activity":"夕食"},{"time":"19:30","activity":"禅体験"},{"time":"21:00","activity":"自由時間"}]', '[{"time":"6:30","activity":"Morning shrine yoga"},{"time":"8:00","activity":"Breakfast"},{"time":"9:30","activity":"Toshogu visit"},{"time":"11:30","activity":"Meditation instruction"},{"time":"12:30","activity":"Lunch"},{"time":"14:00","activity":"Nature trekking"},{"time":"16:00","activity":"Hot spring bathing & rest"},{"time":"18:00","activity":"Dinner"},{"time":"19:30","activity":"Zen experience"},{"time":"21:00","activity":"Free time"}]', 6),

('okinawa-beach', '沖縄・ビーチヨガ＆マインドフルネスリトリート', 'Okinawa Beach Yoga & Mindfulness Retreat', '沖縄・宮古島', 'Okinawa, Miyako Island', 5, 258000, 10, 'domestic', '/okinawa.jpg', 'エメラルドグリーンの海を眺めながらのビーチヨガ。沖縄の癒しのエネルギーを体感。', 'Beach yoga while gazing at emerald green sea. Experience Okinawa healing energy.', '沖縄の美しいビーチで行う癒しのリトリートです。波の音を聞きながらのヨガ、サンセット瞑想、そして伝統的な琉球料理を楽しみます。透明度の高い海でのシュノーケリング、島の自然を感じるトレッキング、そして地元の文化体験を通じて、心身ともに深いリラクゼーションを得られるプログラムです。', 'A healing retreat on Okinawa beautiful beaches. Enjoy yoga while listening to waves, sunset meditation, and traditional Ryukyu cuisine. Through snorkeling in crystal-clear waters, trekking to feel island nature, and local cultural experiences, this program provides deep relaxation for both mind and body.', '["ビーチリゾート宿泊（4泊）","琉球料理","ビーチヨガ・瞑想指導","シュノーケリング","島内トレッキング","三線体験","マリンアクティビティ"]', '["Beach resort accommodation (4 nights)","Ryukyu cuisine","Beach yoga & meditation instruction","Snorkeling","Island trekking","Sanshin experience","Marine activities"]', '[{"time":"6:00","activity":"サンライズビーチヨガ"},{"time":"7:30","activity":"朝食"},{"time":"9:00","activity":"シュノーケリング"},{"time":"11:30","activity":"瞑想指導"},{"time":"12:30","activity":"昼食"},{"time":"14:00","activity":"自由時間"},{"time":"16:00","activity":"島内トレッキング"},{"time":"18:00","activity":"サンセット瞑想"},{"time":"19:00","activity":"夕食"},{"time":"20:30","activity":"三線体験"}]', '[{"time":"6:00","activity":"Sunrise beach yoga"},{"time":"7:30","activity":"Breakfast"},{"time":"9:00","activity":"Snorkeling"},{"time":"11:30","activity":"Meditation instruction"},{"time":"12:30","activity":"Lunch"},{"time":"14:00","activity":"Free time"},{"time":"16:00","activity":"Island trekking"},{"time":"18:00","activity":"Sunset meditation"},{"time":"19:00","activity":"Dinner"},{"time":"20:30","activity":"Sanshin experience"}]', 4),

('bali-ubud', 'バリ島・ウブドヨガリトリート', 'Bali Ubud Yoga Retreat', 'インドネシア・バリ島ウブド', 'Ubud, Bali, Indonesia', 7, 328000, 12, 'international', '/image copy copy copy copy.png', '伝統的なバリニーズヨガと精神性の探求。緑豊かなウブドの森で心を解放。', 'Traditional Balinese yoga and spiritual exploration. Free your mind in Ubud lush forests.', 'バリ島の精神的中心地ウブドで行う、伝統的なヨガリトリートです。ライステラスを望むヨガシャラでの練習、ヒーリングマッサージ、そして地元の寺院での瞑想体験。バリの豊かな精神文化に触れながら、内なる平和と調和を見つけるプログラムです。', 'A traditional yoga retreat in Ubud, Bali spiritual center. Practice in yoga shala overlooking rice terraces, healing massage, and meditation experience at local temples. Find inner peace and harmony while experiencing Bali rich spiritual culture.', '["リゾート宿泊（6泊）","オーガニック料理","伝統ヨガ指導","バリニーズマッサージ","寺院瞑想","料理教室","文化体験"]', '["Resort accommodation (6 nights)","Organic cuisine","Traditional yoga instruction","Balinese massage","Temple meditation","Cooking class","Cultural experience"]', '[{"time":"6:00","activity":"朝のヨガ"},{"time":"8:00","activity":"朝食"},{"time":"9:30","activity":"瞑想指導"},{"time":"11:00","activity":"自由時間"},{"time":"12:30","activity":"昼食"},{"time":"14:00","activity":"文化体験"},{"time":"16:30","activity":"夕方のヨガ"},{"time":"18:30","activity":"夕食"},{"time":"20:00","activity":"瞑想"},{"time":"21:00","activity":"自由時間"}]', '[{"time":"6:00","activity":"Morning yoga"},{"time":"8:00","activity":"Breakfast"},{"time":"9:30","activity":"Meditation instruction"},{"time":"11:00","activity":"Free time"},{"time":"12:30","activity":"Lunch"},{"time":"14:00","activity":"Cultural experience"},{"time":"16:30","activity":"Evening yoga"},{"time":"18:30","activity":"Dinner"},{"time":"20:00","activity":"Meditation"},{"time":"21:00","activity":"Free time"}]', 7),

('india-rishikesh', 'インド・リシケシュヨガリトリート', 'India Rishikesh Yoga Retreat', 'インド・リシケシュ', 'Rishikesh, India', 10, 298000, 15, 'international', '/image copy copy copy copy copy.png', 'ヨガの聖地での本格的な修行体験。ガンジス川のほとりで心身を浄化。', 'Authentic yoga practice at yoga holy land. Purify mind and body by Ganges River.', 'ヨガの発祥地、インドのリシケシュで行う本格的なヨガリトリートです。伝統的なアシュラムでの滞在、早朝のガンジス川での瞑想、本格的なハタヨガとプラナヤマの指導。ヨガの哲学を学び、精神性を深める10日間の変容的な体験です。', 'An authentic yoga retreat in Rishikesh, India, birthplace of yoga. Stay at traditional ashram, early morning meditation by Ganges River, authentic Hatha Yoga and Pranayama instruction. A transformative 10-day experience to learn yoga philosophy and deepen spirituality.', '["アシュラム宿泊（9泊）","ベジタリアン料理","伝統ヨガ指導","瞑想指導","ヨガ哲学講義","ガンジス川での儀式","アーユルヴェーダコンサルテーション"]', '["Ashram accommodation (9 nights)","Vegetarian cuisine","Traditional yoga instruction","Meditation instruction","Yoga philosophy lecture","Ganges River ceremony","Ayurveda consultation"]', '[{"time":"5:30","activity":"朝の瞑想"},{"time":"7:00","activity":"ヨガ練習"},{"time":"9:00","activity":"朝食"},{"time":"10:30","activity":"ヨガ哲学講義"},{"time":"12:30","activity":"昼食"},{"time":"14:00","activity":"自由時間"},{"time":"16:00","activity":"夕方のヨガ"},{"time":"18:00","activity":"ガンジス川での儀式"},{"time":"19:00","activity":"夕食"},{"time":"20:00","activity":"瞑想"}]', '[{"time":"5:30","activity":"Morning meditation"},{"time":"7:00","activity":"Yoga practice"},{"time":"9:00","activity":"Breakfast"},{"time":"10:30","activity":"Yoga philosophy lecture"},{"time":"12:30","activity":"Lunch"},{"time":"14:00","activity":"Free time"},{"time":"16:00","activity":"Evening yoga"},{"time":"18:00","activity":"Ganges River ceremony"},{"time":"19:00","activity":"Dinner"},{"time":"20:00","activity":"Meditation"}]', 8),

('thailand-koh-samui', 'タイ・サムイ島デトックスヨガリトリート', 'Thailand Koh Samui Detox Yoga Retreat', 'タイ・サムイ島', 'Koh Samui, Thailand', 7, 268000, 10, 'international', '/image.png', 'トロピカルパラダイスでの心身のデトックス。タイ式マッサージとヨガの融合。', 'Mind and body detox in tropical paradise. Fusion of Thai massage and yoga.', 'タイのサムイ島で行うデトックスとヨガのリトリートです。ビーチでのヨガ、伝統的なタイマッサージ、デトックスジュース、そしてヘルシーなタイ料理。心身をリセットし、新たなエネルギーで満たされる7日間のウェルネスプログラムです。', 'A detox and yoga retreat on Koh Samui, Thailand. Beach yoga, traditional Thai massage, detox juices, and healthy Thai cuisine. A 7-day wellness program to reset your mind and body and fill with new energy.', '["ビーチリゾート宿泊（6泊）","デトックスジュース・ヘルシー料理","ヨガ・瞑想指導","タイマッサージ","プール・ビーチアクセス","料理教室","島内観光"]', '["Beach resort accommodation (6 nights)","Detox juices & healthy cuisine","Yoga & meditation instruction","Thai massage","Pool & beach access","Cooking class","Island tour"]', '[{"time":"6:30","activity":"ビーチヨガ"},{"time":"8:00","activity":"デトックスジュース"},{"time":"9:00","activity":"朝食"},{"time":"10:30","activity":"瞑想指導"},{"time":"12:00","activity":"昼食"},{"time":"14:00","activity":"タイマッサージ"},{"time":"16:00","activity":"自由時間"},{"time":"17:30","activity":"サンセットヨガ"},{"time":"19:00","activity":"夕食"},{"time":"20:30","activity":"瞑想"}]', '[{"time":"6:30","activity":"Beach yoga"},{"time":"8:00","activity":"Detox juice"},{"time":"9:00","activity":"Breakfast"},{"time":"10:30","activity":"Meditation instruction"},{"time":"12:00","activity":"Lunch"},{"time":"14:00","activity":"Thai massage"},{"time":"16:00","activity":"Free time"},{"time":"17:30","activity":"Sunset yoga"},{"time":"19:00","activity":"Dinner"},{"time":"20:30","activity":"Meditation"}]', 9),

('philippines-cebu', 'フィリピン・セブ島ビーチヨガリトリート', 'Philippines Cebu Beach Yoga Retreat', 'フィリピン・セブ島', 'Cebu Island, Philippines', 5, 188000, 12, 'international', '/cebu.jpg', '透明な海と白い砂浜でのヨガリトリート。アイランドホッピングも楽しめる。', 'Yoga retreat on crystal clear waters and white beaches. Island hopping included.', 'フィリピンのセブ島で行うビーチヨガリトリートです。美しいビーチでのヨガ、アイランドホッピング、シュノーケリング、そしてフィリピン料理を楽しみながら、トロピカルな環境で心身をリフレッシュ。手頃な価格で海外リトリートを体験できるプログラムです。', 'A beach yoga retreat on Cebu Island, Philippines. Refresh your mind and body in tropical environment while enjoying beach yoga, island hopping, snorkeling, and Filipino cuisine. An affordable program to experience international retreat.', '["ビーチリゾート宿泊（4泊）","フィリピン料理","ビーチヨガ指導","アイランドホッピング","シュノーケリング","マッサージ","ダイビング（オプション）"]', '["Beach resort accommodation (4 nights)","Filipino cuisine","Beach yoga instruction","Island hopping","Snorkeling","Massage","Diving (optional)"]', '[{"time":"6:00","activity":"サンライズヨガ"},{"time":"7:30","activity":"朝食"},{"time":"9:00","activity":"アイランドホッピング"},{"time":"12:00","activity":"昼食"},{"time":"13:30","activity":"自由時間"},{"time":"16:00","activity":"ビーチヨガ"},{"time":"18:00","activity":"サンセット瞑想"},{"time":"19:00","activity":"夕食"},{"time":"20:30","activity":"自由時間"}]', '[{"time":"6:00","activity":"Sunrise yoga"},{"time":"7:30","activity":"Breakfast"},{"time":"9:00","activity":"Island hopping"},{"time":"12:00","activity":"Lunch"},{"time":"13:30","activity":"Free time"},{"time":"16:00","activity":"Beach yoga"},{"time":"18:00","activity":"Sunset meditation"},{"time":"19:00","activity":"Dinner"},{"time":"20:30","activity":"Free time"}]', 10);

-- Insert blog post data
INSERT INTO blog_posts (id, title_ja, title_en, excerpt_ja, excerpt_en, content_ja, content_en, author, category_ja, category_en, image, published_date) VALUES
('benefits-of-retreat', 'ヨガリトリートの5つの効果', '5 Benefits of Yoga Retreats', 'ヨガリトリートに参加することで得られる心身への効果について解説します。', 'Explore the mental and physical benefits you can gain from participating in a yoga retreat.', 'ヨガリトリートは、日常生活から離れて自分自身と向き合う貴重な機会です。ここでは、リトリートに参加することで得られる5つの主な効果をご紹介します。

1. **深いリラクゼーション**
都市生活のストレスから完全に離れることで、心身ともに深くリラックスできます。自然に囲まれた環境での滞在は、副交感神経を優位にし、真の休息をもたらします。

2. **ヨガの実践の深化**
毎日複数回のヨガセッションを通じて、アーサナ（ポーズ）の理解を深め、自分の体と心の繋がりをより感じられるようになります。

3. **新しい視点の獲得**
日常から離れることで、人生や仕事について客観的に見つめ直す時間が得られます。多くの参加者が、リトリート後に人生の優先順位を見直すきっかけを得ています。

4. **同じ価値観を持つ仲間との出会い**
ウェルネスや精神性に興味を持つ人々との交流は、帰国後も続く貴重な繋がりとなります。

5. **セルフケアの習慣化**
リトリートで学んだヨガや瞑想の実践を日常に取り入れることで、長期的な健康維持に役立ちます。

ヨガリトリートは、単なる休暇ではなく、自己変容のための投資です。心身の健康を取り戻し、新たな自分を発見する旅に出かけてみませんか。', 'Yoga retreats are precious opportunities to step away from daily life and connect with yourself. Here are five main benefits you can gain from participating in a retreat.

1. **Deep Relaxation**
By completely disconnecting from urban life stress, you can deeply relax both mentally and physically. Staying in nature-surrounded environments activates the parasympathetic nervous system, bringing true rest.

2. **Deepening Yoga Practice**
Through multiple daily yoga sessions, you deepen your understanding of asanas (poses) and become more aware of the connection between your body and mind.

3. **Gaining New Perspectives**
Stepping away from daily routines gives you time to objectively reflect on life and work. Many participants find triggers to reassess their life priorities after retreats.

4. **Meeting Like-minded People**
Interactions with people interested in wellness and spirituality become valuable connections that continue after returning home.

5. **Building Self-care Habits**
Incorporating yoga and meditation practices learned at retreats into daily life helps maintain long-term health.

Yoga retreats are not just vacations, but investments in self-transformation. Why not embark on a journey to restore your mental and physical health and discover a new you.', 'Zen Retreat Team', 'ウェルネス', 'Wellness', '/torii.jpg', '2025-09-15'),

('choosing-first-retreat', '初めてのリトリート選びのポイント', 'Tips for Choosing Your First Retreat', '初めてヨガリトリートに参加する方向けの選び方ガイド。', 'A guide for first-time yoga retreat participants on how to choose.', '初めてのヨガリトリートは、どれを選べばいいか迷うものです。ここでは、自分に合ったリトリートを選ぶためのポイントをご紹介します。

**1. 場所を決める**
- **国内リトリート**: 言葉の心配がなく、気軽に参加できます。初めての方におすすめ。
- **海外リトリート**: より非日常的な体験ができ、旅行の楽しみも味わえます。

**2. 期間を選ぶ**
初めての方は、3-5日間の短めのリトリートから始めることをおすすめします。慣れてきたら、7-10日間の長期リトリートにチャレンジしてみましょう。

**3. ヨガのスタイルを確認**
- **ハタヨガ**: 基本的なヨガで、初心者に最適
- **ヴィンヤサヨガ**: 流れるような動きが特徴
- **リストラティブヨガ**: リラクゼーション重視

**4. 宿泊施設のタイプ**
- **寺院・宿坊**: 精神性を重視した体験
- **リゾート**: 快適さとリラクゼーション
- **ロッジ**: 自然との一体感

**5. 含まれるサービスを確認**
食事、ヨガクラスの回数、マッサージなど、何が含まれているかをしっかり確認しましょう。

**6. 予算を考える**
国内リトリートは15万円〜30万円、海外は20万円〜40万円が目安です。

最も大切なのは、自分の直感を信じること。写真や説明を見て、心惹かれるものを選びましょう。', 'Choosing your first yoga retreat can be overwhelming. Here are points to help you select the right retreat for you.

**1. Decide on Location**
- **Domestic Retreats**: No language barriers, easy to participate. Recommended for beginners.
- **International Retreats**: More extraordinary experiences and travel enjoyment.

**2. Choose Duration**
For first-timers, we recommend starting with shorter 3-5 day retreats. Once comfortable, try 7-10 day long-term retreats.

**3. Check Yoga Style**
- **Hatha Yoga**: Basic yoga, ideal for beginners
- **Vinyasa Yoga**: Characterized by flowing movements
- **Restorative Yoga**: Relaxation-focused

**4. Accommodation Type**
- **Temples/Temple Lodgings**: Spirituality-focused experiences
- **Resorts**: Comfort and relaxation
- **Lodges**: Unity with nature

**5. Confirm Included Services**
Thoroughly check what included: meals, number of yoga classes, massages, etc.

**6. Consider Budget**
Domestic retreats typically 150,000-300,000 yen, international 200,000-400,000 yen.

Most important is trusting your intuition. Choose what attracts you when looking at photos and descriptions.', 'Yuki Tanaka', 'ガイド', 'Guide', '/sakura.jpg', '2025-09-20'),

('meditation-basics', '瞑想の始め方：初心者ガイド', 'How to Start Meditation: Beginner Guide', '瞑想を始めたい方のための基本的な方法とコツをご紹介します。', 'Basic methods and tips for those who want to start meditation.', '瞑想は、心を落ち着かせ、内なる平和を見つけるための古代からの実践です。初心者の方でも簡単に始められる方法をご紹介します。

**瞑想の基本**

1. **静かな場所を見つける**
最初は静かで落ち着ける場所を選びましょう。慣れてくれば、どこでも瞑想できるようになります。

2. **快適な姿勢をとる**
椅子に座っても、床に座っても構いません。背筋を伸ばし、リラックスした姿勢を保ちます。

3. **呼吸に意識を向ける**
目を閉じ、自然な呼吸に注意を向けます。吸う息と吐く息を観察しましょう。

4. **心が彷徨ったら、優しく戻す**
考えが浮かんできても、それを批判せず、優しく呼吸に意識を戻します。

**初心者向けの瞑想法**

- **呼吸瞑想**: 呼吸に集中する最もシンプルな方法
- **ボディスキャン**: 体の各部位に意識を向けていく
- **マントラ瞑想**: 特定の言葉やフレーズを繰り返す
- **歩行瞑想**: ゆっくりと歩きながら行う

**継続のコツ**

- 毎日同じ時間に行う
- 最初は5分から始める
- 完璧を求めない
- 習慣として定着させる

瞑想は練習です。上手くいかない日があっても、諦めずに続けることが大切です。リトリートでは、経験豊富な指導者から直接学べる貴重な機会となります。', 'Meditation is an ancient practice for calming the mind and finding inner peace. Here are methods anyone can start easily.

**Meditation Basics**

1. **Find a Quiet Place**
Initially, choose a quiet, calm location. As you become accustomed, you can meditate anywhere.

2. **Take a Comfortable Posture**
Sitting on a chair or floor is fine. Keep your spine straight and maintain a relaxed posture.

3. **Focus on Breathing**
Close your eyes and direct attention to natural breathing. Observe your inhales and exhales.

4. **Gently Return When Mind Wanders**
When thoughts arise, don judge them—gently return attention to breathing.

**Meditation Methods for Beginners**

- **Breath Meditation**: Simplest method focusing on breathing
- **Body Scan**: Directing awareness to each body part
- **Mantra Meditation**: Repeating specific words or phrases
- **Walking Meditation**: Practicing while walking slowly

**Tips for Continuation**

- Practice at the same time daily
- Start with 5 minutes
- Don seek perfection
- Establish as a habit

Meditation is practice. Even on difficult days, continuing without giving up is important. Retreats offer precious opportunities to learn directly from experienced instructors.', 'Kenji Suzuki', 'マインドフルネス', 'Mindfulness', '/hida.jpg', '2025-09-25');
