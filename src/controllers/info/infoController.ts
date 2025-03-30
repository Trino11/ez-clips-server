import { Request, Response } from 'express';

const getInfo = async (req: Request, res: Response) => {
  res.send('Hello World from infoController');
};

export { getInfo };
