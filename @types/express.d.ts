declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };

    upload: {
      id: string;
    };
  }
}
