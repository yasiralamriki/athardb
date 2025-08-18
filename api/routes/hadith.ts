// Imports
import express from 'express';
import collections from '../utils/collections.ts'
import hadith from '../utils/hadith.ts';

// Express router
const router = express.Router();

// Routes at /hadith
// GET
router.get('/', (req, res) => {
  if (req.query.collection) {
    if (req.query.hadith) {
      try {
        const foundHadith = hadith.Find(req.query.collection, req.query.hadith);

        if (foundHadith !== false) {
          res.status(200).json({
            hadith: foundHadith
          })
        } else {
          res.status(404).json({
            error: 'Hadith not found in the specified collection.'
          });
        }
      } catch (error) {
        res.status(500).json({
          error: 'Error processing request',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    } else {
      try {
        const collection = collections.Find(req.query.collection);

        if (collection !== false) {
          res.status(200).json({
            message: 'Please specify a hadith ID, format: /hadith?collection=collectionId&hadith=hadithId'
          });
        } else {
          res.status(404).json({
            error: 'Collection not found.'
          });
        }
      } catch (error) {
        res.status(500).json({
          error: 'Error processing request',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  } else {
    res.status(400).json({
      error: 'Invalid parameters, please provide a collection. Parameters: /hadith?collection=collectionId'
    });
  }
});

// Export router
export default router;
