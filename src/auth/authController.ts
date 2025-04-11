import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getUserData } from './authServices';

const router = Router();

router.get('/discord', (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Discord authentication route, redirects to Discord OAuth2'
  /* #swagger.parameters['redirect_uri'] = {
    description: 'Backend redirect URI, must match the one used in Discord app settings',
    required: true,
    type: 'string',
    in: 'query',
    example: 'http://localhost:3000/auth/discord/callback',
  }
  #swagger.parameters['return_to'] = {
    description: 'Frontend redirect URI, where the user will be redirected after authentication',
    required: false,
    type: 'string',
    in: 'query',
    example: 'http://localhost:1420/login/callback',
  } */
  /* #swagger.responses[302] = {
    description: 'Redirects to Discord OAuth2',
  }
  #swagger.responses[400] = {
    description: 'Bad request',
    schema: {
      message: 'Redirect URI is required'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */

  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

  const { redirect_uri, return_to } = req.query;

  if (!redirect_uri) {
    res.status(400).send('Redirect URI is required');
    return;
  }
  const payload = {
    redirect_uri: redirect_uri,
    return_to: return_to,
  };
  const state = encodeURIComponent(JSON.stringify(payload));

  const discordURL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri ?? ''}&state=${state}&response_type=code&scope=identify`;

  res.redirect(discordURL);
});

router.get('/discord/callback', async (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Discord authentication callback route, exchanges discord login code for token and retrieves user data'
  /* #swagger.parameters['code'] = {
    description: 'Discord login code, gotten from /auth/discord',
    required: true,
    type: 'string',
    in: 'query',
    example: '1234567890abcdef',
  }
  #swagger.parameters['state'] = {
    description: 'Encoded state parameter, contains redirect_uri and return_to, at least redirect_uri is required',
    required: true,
    type: 'string',
    in: 'query',
    example: '%7B%22redirect_uri%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback%22%2C%22return_to%22%3A%22http%3A%2F%2Flocalhost%3A1420%2Flogin%2Fcallback%22%7D',
  } */

  /* #swagger.responses[200] = {
    description: 'JWT token for the user',
    schema: {
      jwt: 'xxxxxxxxxx',
    }
  }
  #swagger.responses[302] = {
    description: 'Redirects to the frontend with JWT token',
  }
  #swagger.responses[400] = {
    description: 'Bad request',
    schema: {
      message: 'Code is required'
    }
  }
  #swagger.responses[400] = {
    description: 'Bad request',
    schema: {
      message: 'Redirect URI is required'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */

  if (!req.query.state) {
    res.status(400).send('State is required');
    return;
  }

  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

  const { code } = req.query;
  const { redirect_uri, return_to } = JSON.parse(
    decodeURIComponent(req.query.state as string),
  );
  if (!code) {
    res.status(400).send('Code is required');
    return;
  }

  const tokenURL = 'https://discord.com/api/oauth2/token';
  const params = new URLSearchParams({
    client_id: CLIENT_ID ?? '',
    client_secret: CLIENT_SECRET ?? '',
    grant_type: 'authorization_code',
    code: code as string,
    redirect_uri,
    scope: 'identify',
  });
  console.log('params', params);

  const tokenResponse = await fetch(tokenURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  if (!tokenResponse.ok) {
    res.status(500).send('Error fetching token');
    return;
  }
  const tokenData = await tokenResponse.json();
  const [accessToken, tokenType] = [
    tokenData.access_token,
    tokenData.token_type,
  ];

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
    },
  });
  if (!userResponse.ok) {
    res.status(500).send('Error fetching user data');
    return;
  }
  const userData = await userResponse.json();

  const payload = await getUserData(userData.id);
  const token = jwt.sign(payload, process.env.JWT_SECRET ?? '', {
    expiresIn: '240h',
  });
  const encodedUserData = encodeURIComponent(token);

  if (return_to) {
    const redirectUrl = new URL(return_to);
    redirectUrl.searchParams.set('jwt', encodedUserData);
    res.redirect(redirectUrl.toString());
  } else {
    res.status(200).json({
      jwt: token,
    });
  }
});

export default router;
