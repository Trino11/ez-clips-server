import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  // #swagger.tags = ['Info']
  // #swagger.description = 'Info route'

  /* #swagger.responses[200] = {
    description: 'Info route',
    schema: {
      message: 'Info route'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */
  res.status(200).json({
    message: 'Info route',
  });
});

router.get('/health', (req, res) => {
  // #swagger.tags = ['Info']
  // #swagger.description = 'Health check route'

  /* #swagger.responses[200] = {
    description: 'Health check route',
    schema: {
      message: 'Health check'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */
  res.status(200).json({
    message: 'Health check',
  });
});

router.get('/version', (req, res) => {
  // #swagger.tags = ['Info']
  // #swagger.description = 'Version route'

  /* #swagger.responses[200] = {
    description: 'Version route',
    schema: {
      version: '1.0.0'
    }
  }
  #swagger.responses[500] = {
    description: 'Internal server error',
    schema: {
      message: 'Internal server error'
    }
  } */
  res.status(200).json({
    version: process.env.npm_package_version,
  });
});

export default router;
