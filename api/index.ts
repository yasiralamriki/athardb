// Imports
import express from 'express';
import hadith from './routes/hadith.ts';

// Express app
const app = express();

app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Available routes:',
    routes: [
      '/hadith'
    ]
  })
);

// Routes from /routes/*
app.use('/hadith', hadith);

// Listen on port 3000
app.listen(3000, () => console.log('Server ready on port 3000.'));

// Export app
export default app;
