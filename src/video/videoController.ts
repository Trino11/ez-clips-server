import { Router } from 'express';

const router = Router();

// router.get('/', (req, res) => {
//   // #swagger.tags = ["Videos"]
//   // #swagger.description = "Videos route"

//   /* #swagger.responses[200] = {
//     description: 'Video route',
//     schema: {
//       message: 'TODO'
//     }
//   }
//   #swagger.responses[500] = {
//     description: 'Internal server error',
//     schema: {
//       message: 'Internal server error'
//     }
//   } */
//   res.status(200).json({
//     message: 'Video route',
//   });
// });

router.get('/feed', (req, res) => {
  // #swagger.tags = ["Videos"]
  // #swagger.description = "Video feed route"
  /* #swagger.parameters['x-auth-token'] = {
    in: 'header',
    description: 'Authorization token, required for user specific routes',
    required: false,
    type: 'string',
    example: 'Bearer <token>'
  } */
  /* #swagger.parameters['type'] = {
    in: 'query',
    description: 'Type of feed to get',
    required: false,
    schema: {
      '@enum': ['feed', 'subscriptions', 'friends', 'recents', 'trending', 'top']
    },
    example: 'feed'
  } */

  /* #swagger.responses[200] = {
    description: 'List of videos in the selected feed',
    content: {
      'application/json': {
        schema: {
          $ref: '#/definitions/VideosList'
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Bad request',
    schema: {
      message: 'Bad request'
    }
  }
  #swagger.responses[401] = {
    description: 'Unauthorized, a valid token is required for this type of feed',
    schema: {
      message: 'Unauthorized'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */
  res.status(200).json({
    message: 'Video feed route',
  });
});

router.get('/search', (req, res) => {
  // #swagger.tags = ["Videos"]
  // #swagger.description = "Video search route"
  /* #swagger.parameters['search'] = {
    in: 'query',
    description: 'Search term to find videos',
    required: true,
    type: 'string',
    example: 'funny cats'
  } */

  /* #swagger.responses[200] = {
    description: 'List of videos matching the search term',
    content: {
      'application/json': {
        schema: {
          $ref: '#/definitions/VideosList'
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Bad request',
    schema: {
      message: 'Bad request'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */
  res.status(200).json({
    message: 'Video search route',
  });
});

router.get('/autocomplete', (req, res) => {
  // #swagger.tags = ["Videos"]
  // #swagger.description = "Video autocomplete route"
  /* #swagger.parameters['search'] = {
    in: 'query',
    description: 'Search term to autocomplete',
    required: true,
    type: 'string',
    example: 'funn'
  } */

  /* #swagger.responses[200] = {
    description: 'List of autocomplete suggestions',
    schema: [
      'funny cats',
      'funny cat videos',
    ]
  }
  #swagger.responses[400] = {
    description: 'Bad request',
    schema: {
      message: 'Bad request'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */
  res.status(200).json({
    message: 'Video autocomplete route',
  });
});

router.get('/related/:videoId', (req, res) => {
  // #swagger.tags = ["Videos"]
  // #swagger.description = "Video related route"
  /* #swagger.parameters['x-auth-token'] = {
    in: 'header',
    description: 'Authorization token, required for not public videos',
    required: false,
    type: 'string',
    example: 'Bearer <token>'
  } */
  /* #swagger.parameters['videoId'] = {
    in: 'path',
    description: 'ID of the video to get related videos for',
    required: true,
    type: 'string',
    example: '1234567890'
  } */

  /* #swagger.responses[200] = {
    description: 'List of related videos',
    content: {
      'application/json': {
        schema: {
          $ref: '#/definitions/VideosList'
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Bad request',
    schema: {
      message: 'Bad request'
    }
  }
  #swagger.responses[401] = {
    description: 'Unauthorized, a valid token is required for not public videos',
    schema: {
      message: 'Unauthorized'
    }
  }
  #swagger.responses[403] = {
    description: 'Forbidden, the video is not public and no token was provided',
    schema: {
      message: 'Forbidden'
    }
  }
  #swagger.responses[404] = {
    description: 'Not found, the video was not found',
    schema: {
      message: 'Not found'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */
  res.status(200).json({
    message: 'Video related route',
  });
});

router.get('/watch/:videoId', (req, res) => {
  // #swagger.tags = ["Videos"]
  // #swagger.description = "Video download route"
  /* #swagger.parameters['x-auth-token'] = {
    in: 'header',
    description: 'Authorization token, required for not public videos',
    required: false,
    type: 'string',
    example: 'Bearer <token>'
  } */
  /* #swagger.parameters['videoId'] = {
    in: 'path',
    description: 'ID of the video to watch',
    required: true,
    type: 'string',
    example: '1234567890'
  } */
  /* #swagger.parameters['range'] = {
    in: 'header',
    description: 'Range of bytes to download, for partial video download',
    required: false,
    type: 'string',
    example: 'bytes=0-100'
  } */

  /* #swagger.responses[200] = {
    description: 'Video file download',
    content: {
      'video/mp4': {
        schema: {
          type: 'file',
          format: 'binary'
        }
      }
    }
  }
  #swagger.responses[206] = {
    description: 'Partial video file download',
    content: {
      'video/mp4': {
        schema: {
          type: 'file',
          format: 'binary'
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Bad request',
    schema: {
      message: 'Bad request'
    }
  }
  #swagger.responses[401] = {
    description: 'Unauthorized, a valid token is required for not public videos',
    schema: {
      message: 'Unauthorized'
    }
  }
  #swagger.responses[403] = {
    description: 'Forbidden, the video is not public and no token was provided',
    schema: {
      message: 'Forbidden'
    }
  }
  #swagger.responses[404] = {
    description: 'Not found, the video was not found',
    schema: {
      message: 'Not found'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */
  res.status(200).json({
    message: 'Video watch route',
  });
});

export default router;
