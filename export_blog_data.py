import csv
import json

# Blog posts data from database
blog_posts = [
    {
        "id": "zen-yoga-art-traditional-meditation",
        "title_ja": "禅とヨガの芸術：現代の魂のための日本伝統瞑想法",
        "title_en": "The Art of Zen and Yoga: Traditional Japanese Meditation Practices for Modern Souls",
        "excerpt_ja": "現代の混沌とした世界において、真の内なる平和と精神的明晰さを求める人々にとって、日本の禅瞑想とヨガの融合は究極の解決策を提供します。",
        "excerpt_en": "In today's chaotic world, for those seeking true inner peace and mental clarity, the fusion of Japanese Zen meditation and yoga offers the ultimate solution.",
        "category_ja": "ウェルネス",
        "category_en": "Wellness",
        "author": "Zen Retreat ASIA",
        "created_at": "2025-10-05 14:34:41.465098+00",
        "updated_at": "2025-10-05 14:34:41.465098+00"
    },
    {
        "id": "discover-magic-yoga-retreats-japan",
        "title_ja": "日本のヨガリトリートの魅力：古代の叡智と現代ウェルネスが出会う場所",
        "title_en": "The Magic of Yoga Retreats in Japan: Where Ancient Wisdom Meets Modern Wellness",
        "excerpt_ja": "現代社会のストレスから解放され、心身の調和を取り戻したいと願う人々にとって、日本は世界でも類を見ない特別なヨガリトリートの体験を提供します。",
        "excerpt_en": "For those seeking to escape the stress of modern life and restore harmony of body and mind, Japan offers an unparalleled and extraordinary yoga retreat experience.",
        "category_ja": "ヨガ",
        "category_en": "Yoga",
        "author": "Zen Retreat ASIA",
        "created_at": "2025-10-05 14:34:41.465098+00",
        "updated_at": "2025-10-05 14:34:41.465098+00"
    },
    {
        "id": "sacred-mountains-spiritual-destinations",
        "title_ja": "聖なる山々と静寂の寺院：日本最もスピリチュアルな場所でのヨガリトリート",
        "title_en": "Sacred Mountains and Silent Temples: Yoga Retreats in Japan's Most Spiritual Destinations",
        "excerpt_ja": "古来より神々が宿るとされる日本の霊峰や神聖な寺社は、現代においても深い精神性と癒しの力を保持しています。これらの聖地でのヨガリトリート体験は、単なる観光や運動を超越し、参加者の魂に深遠な変容をもたらします。",
        "excerpt_en": "Japan's sacred mountains and temples, believed to be dwelling places of deities since ancient times, retain profound spirituality and healing power even in the modern era.",
        "category_ja": "スピリチュアル",
        "category_en": "Spiritual",
        "author": "Zen Retreat ASIA",
        "created_at": "2025-10-05 14:34:41.465098+00",
        "updated_at": "2025-10-05 14:34:41.465098+00"
    }
]

# Export metadata only (without full content)
with open('blog_posts_metadata.csv', 'w', newline='', encoding='utf-8') as f:
    fieldnames = ['id', 'title_ja', 'title_en', 'excerpt_ja', 'excerpt_en', 'category_ja', 'category_en', 'author', 'created_at', 'updated_at']
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(blog_posts)

print("Metadata CSV exported: blog_posts_metadata.csv")

# Export full data as JSON for easier handling of long content
with open('blog_posts_full_export.json', 'w', encoding='utf-8') as f:
    json.dump({"note": "Full content available in database. Use SQL query to retrieve.", "metadata": blog_posts}, f, ensure_ascii=False, indent=2)

print("JSON export created: blog_posts_full_export.json")
print("\nTo get full content with Japanese and English text, use this SQL query:")
print("SELECT * FROM blog_posts ORDER BY created_at;")
