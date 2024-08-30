import cors from 'cors';

// Initialize the CORS middleware
const corsMiddleware = cors({
  origin: '*', // Change this to your client's origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify the allowed HTTP methods
});

// Helper function to wrap API route handler with CORS middleware
 export  const withCors = (handler) => (req, res) => {
  return new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(handler(req, res));
    });
  });
};