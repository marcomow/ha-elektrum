import { extractAll } from './utils.ts';

interface Session {
  get: (url: string, options: any) => Promise<Response>;
  post: (url: string, options: any) => Promise<Response>;
  cookies: {
    get: (name: string) => string | undefined;
  };
}

export async function getAuthToken(session: Session): Promise<string | undefined> {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0',
  };

  const r1 = await session.get('https://www.elektrum.lv/lv/autorizacija', { headers, redirect: 'follow' });
  const lvProduction = session.cookies.get('lv_production');

  if (r1.status === 200) {
    const text = await r1.text();
    const tokens = extractAll(text, 'data-token="', '"', 0, false);
    return tokens[1];
  } else {
    console.log('Something went wrong!', r1.status);
    return undefined;
  }
}

export async function authenticate(username: string, password: string, token: string, session: Session): Promise<boolean> {
  const loginParams = { email: username, password: password, captcha: "" };
  const headers = {
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9,lv;q=0.8',
    'Access-Control-Request-Headers': 'authorization,content-type',
    'Access-Control-Request-Method': 'POST',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Host': 'id.elektrum.lv',
    'Origin': 'https://www.elektrum.lv',
    'Pragma': 'no-cache',
    'Referer': 'https://www.elektrum.lv/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0',
    'Authorization': 'Bearer ' + token
  };

  const r3 = await session.post('https://id.elektrum.lv/api/v1/authentication/credentials/authenticate', {
    body: JSON.stringify(loginParams),
    headers: headers
  });

  return r3.status === 200;
}
