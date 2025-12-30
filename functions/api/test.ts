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

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const hasApiKey = !!context.env.RESEND_API_KEY;
  const apiKeyPreview = hasApiKey 
    ? `${context.env.RESEND_API_KEY.substring(0, 7)}...${context.env.RESEND_API_KEY.substring(context.env.RESEND_API_KEY.length - 4)}`
    : 'NOT SET';

  const info = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      hasResendApiKey: hasApiKey,
      apiKeyPreview: apiKeyPreview,
    },
    message: hasApiKey 
      ? 'Environment is configured correctly' 
      : 'RESEND_API_KEY is not set. Please configure it in Cloudflare Pages dashboard.',
  };

  return new Response(
    JSON.stringify(info, null, 2),
    {
      status: hasApiKey ? 200 : 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    }
  );
};


