import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getUserData } from './authServices';

const router = Router();

router.get('/discord', (req, res) => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Discord authentication route, redirects to Discord OAuth2'
  /* #swagger.responses[302] = {
    description: 'Redirects to Discord OAuth2',
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */

  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const REDIRECT_URI = `${process.env.PUBLIC_URL}/auth/discord/callback`;

  const discordURL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI ?? '',
  )}&response_type=code&scope=identify`;

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
  } */

  /* #swagger.responses[206] = {
    description: 'Redirects to frontend with JWT token',
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */

  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const REDIRECT_URI = `${process.env.PUBLIC_URL}/auth/discord/callback`;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

  const { code } = req.query;

  const tokenURL = 'https://discord.com/api/oauth2/token';
  const params = new URLSearchParams({
    client_id: CLIENT_ID ?? '',
    client_secret: CLIENT_SECRET ?? '',
    grant_type: 'authorization_code',
    code: code as string,
    redirect_uri: REDIRECT_URI ?? '',
    scope: 'identify',
  });

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

  const redirectURL = `${process.env.FRONTEND_URL}/auth?jwt=${encodedUserData}`;

  // Redirect to the frontend with the JWT token
  res.redirect(redirectURL);
});

export default router;
