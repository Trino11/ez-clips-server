import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Ez Clips API',
    description: 'API documentation for Ez Clips',
    version: process.env.npm_package_version,
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication routes',
    },
    {
      name: 'Users',
      description: 'User management routes',
    },
    {
      name: 'Videos',
      description: 'Clip management routes',
    },
    {
      name: 'Categories',
      description: 'Category management routes',
    },
    {
      name: 'Comments',
      description: 'Comment management routes',
    },
  ],
  definitions: {
    Video: {
      id: '1234-5678-9012',
      title: 'My Awesome Video',
      description: 'This is a description of my awesome video.',
      url: 'https://example.com/videos/1234-5678-9012',
      thumbnail: 'https://example.com/thumbnails/1234-5678-9012.jpg',
      visibility: 'public',
      isHiddenFromSearch: false,
      isHiddenFromProfile: false,
      viewsCount: 10234,
      rating: 4.5,
      ratingCount: 120,
      duration: '10:34',
      author: {
        $ref: '#/definitions/User',
      },
      participants: {
        $ref: '#/definitions/UsersList',
      },
      extras: {
        $ref: '#/definitions/UsersList',
      },
      date: '2025-04-08T12:00:00Z',
      tags: ['tutorial', 'programming', 'javascript'],
      category: 'Education',
      hotSpots: [
        {
          time: '00:30',
          description: 'Introduction to the topic',
        },
        {
          time: '05:00',
          description: 'Key concept explanation',
        },
      ],
      commentsCount: 45,
    },
    VideosList: [
      {
        $ref: '#/definitions/Video',
      },
    ],
    User: {
      id: '5678-1234-9012',
      alias: 'user123',
      discordAlias: 'discordUser123',
      birthDate: '2000-01-01',
      rolesIds: ['admin', 'user'],
      roles: {
        $ref: '#/definitions/RolesList',
      },
      isFriend: true,
      isBlocked: false,
      isFollowing: true,
      isFollower: false,
      isOnline: true,
    },
    UsersList: [
      {
        $ref: '#/definitions/User',
      },
    ],
    Role: {
      id: 'admin',
      name: 'Administrator',
      description: 'Has full access to all features and settings.',
      powerLevel: 100,
    },
    RolesList: [
      {
        $ref: '#/definitions/Role',
      },
    ],
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/index.ts']; // Cambia este archivo según el punto de entrada de tu API

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
