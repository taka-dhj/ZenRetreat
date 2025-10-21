interface ContactFormData {
  name: string;
  email: string;
  retreat: string;
  message: string;
}

interface Env {
  RESEND_API_KEY: string;
}

type PagesFunction<Env = unknown> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

// Handle OPTIONS request for CORS
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Check if RESEND_API_KEY is available
    if (!context.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Server configuration error: RESEND_API_KEY not set'
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { name, email, retreat, message }: ContactFormData = await context.request.json();

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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 1px;
          }
          .content {
            padding: 40px 30px;
          }
          .info-row {
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid #e5e7eb;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #6b7280;
            margin-bottom: 8px;
            font-weight: 600;
          }
          .value {
            font-size: 16px;
            color: #1f2937;
          }
          .message-box {
            background-color: #f9fafb;
            border-left: 4px solid #10b981;
            padding: 16px;
            margin-top: 8px;
            border-radius: 4px;
          }
          .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
          }
          .footer a {
            color: #10b981;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ZEN RETREAT</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">新しいお問い合わせ</p>
          </div>

          <div class="content">
            <div class="info-row">
              <div class="label">お名前</div>
              <div class="value">${name}</div>
            </div>

            <div class="info-row">
              <div class="label">メールアドレス</div>
              <div class="value"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></div>
            </div>

            <div class="info-row">
              <div class="label">リトリート</div>
              <div class="value">${retreatLabel}</div>
            </div>

            <div class="info-row">
              <div class="label">メッセージ</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>

          <div class="footer">
            <p>このメールは ZEN RETREAT のお問い合わせフォームから送信されました。</p>
            <p><a href="https://zen-retreat-asia.com">zen-retreat-asia.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 1px;
          }
          .content {
            padding: 40px 30px;
          }
          .message {
            font-size: 16px;
            color: #1f2937;
            margin-bottom: 24px;
          }
          .info-box {
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
          }
          .info-box h3 {
            margin: 0 0 12px 0;
            color: #166534;
            font-size: 16px;
          }
          .info-box p {
            margin: 8px 0;
            color: #166534;
          }
          .cta-button {
            display: inline-block;
            background-color: #10b981;
            color: #ffffff;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 24px 0;
          }
          .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
          }
          .footer a {
            color: #10b981;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ZEN RETREAT</h1>
          </div>

          <div class="content">
            <p class="message">
              ${name} 様
            </p>

            <p class="message">
              この度は ZEN RETREAT へお問い合わせいただき、誠にありがとうございます。
            </p>

            <p class="message">
              以下の内容でお問い合わせを承りました。<br>
              2営業日以内に担当者よりご連絡させていただきますので、今しばらくお待ちください。
            </p>

            <div class="info-box">
              <h3>📩 お問い合わせ内容</h3>
              <p><strong>リトリート:</strong> ${retreatLabel}</p>
              <p><strong>メッセージ:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>

            <p class="message">
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>

            <center>
              <a href="https://zen-retreat-asia.com" class="cta-button">
                ウェブサイトを見る
              </a>
            </center>
          </div>

          <div class="footer">
            <p><strong>ZEN RETREAT</strong></p>
            <p>Email: <a href="mailto:info@zen-retreat-asia.com">info@zen-retreat-asia.com</a></p>
            <p><a href="https://zen-retreat-asia.com">zen-retreat-asia.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const adminEmailPayload = {
      from: 'ZEN RETREAT <info@zen-retreat-asia.com>',
      to: 'info@zen-retreat-asia.com',
      subject: `【お問い合わせ】${name}様より`,
      html: emailHtml,
      reply_to: email,
    };

    console.log('Sending admin email to Resend API...');
    
    const adminEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(adminEmailPayload),
    });

    const adminResponseText = await adminEmailRes.text();
    console.log('Resend API response status:', adminEmailRes.status);
    console.log('Resend API response:', adminResponseText);

    if (!adminEmailRes.ok) {
      let errorMessage = `Resend API error (${adminEmailRes.status}): ${adminResponseText}`;
      try {
        const errorJson = JSON.parse(adminResponseText);
        if (errorJson.message) {
          errorMessage = `Resend API: ${errorJson.message}`;
        }
      } catch (e) {
        // Response is not JSON
      }
      throw new Error(errorMessage);
    }

    let adminData;
    try {
      adminData = JSON.parse(adminResponseText);
    } catch (e) {
      console.error('Failed to parse admin email response:', adminResponseText);
      throw new Error('Invalid response from Resend API');
    }

    console.log('Sending customer confirmation email...');
    
    const customerEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ZEN RETREAT <info@zen-retreat-asia.com>',
        to: email,
        subject: '【ZEN RETREAT】お問い合わせありがとうございます',
        html: customerEmailHtml,
      }),
    });

    const customerResponseText = await customerEmailRes.text();
    console.log('Customer email response status:', customerEmailRes.status);
    
    if (!customerEmailRes.ok) {
      console.warn('Failed to send customer confirmation email:', customerResponseText);
      // Don't fail the whole request if customer email fails
    }

    console.log('Email sent successfully');
    
    return new Response(
      JSON.stringify({ success: true, data: adminData }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in contact form handler:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : String(error)
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
