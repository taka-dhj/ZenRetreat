import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  retreat: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const { name, email, retreat, message }: ContactFormData = await req.json();

    const retreatLabels: { [key: string]: string } = {
      'kyoto': '京都・智積院寺院ヨガリトリート',
      'yamanashi': '山梨・森林セラピー＆ヨガリトリート',
      'hokkaido': '北海道・温泉＆雪見ヨガリトリート',
      'okinawa': '沖縄・ビーチヨガ＆島時間リトリート',
      'cebu-beach': 'セブ島・ビーチヨガ＆瞑想リトリート',
      'cebu-mountain': 'セブ島・マウンテンリトリート＆スパ',
      'other': 'その他・相談したい',
      '': '指定なし'
    };

    const retreatLabel = retreatLabels[retreat] || retreat;

    const emailHtml = `
      <h2>新しいお問い合わせ</h2>
      <p><strong>お名前:</strong> ${name}</p>
      <p><strong>メールアドレス:</strong> ${email}</p>
      <p><strong>リトリート:</strong> ${retreatLabel}</p>
      <p><strong>メッセージ:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Discovery Hidden Japan <noreply@discoveryhiddenjapan.com>",
        to: "tkaa@discoveryhiddenjapan.com",
        subject: `【お問い合わせ】${name}様より`,
        html: emailHtml,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Resend API error: ${error}`);
    }

    const data = await res.json();

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});