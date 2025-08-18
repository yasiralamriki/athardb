import path from 'path';
import fs from 'fs';

function Find(collection) {
    try {
        // Read and parse collections.json
        const collectionsPath = path.join(process.cwd(), 'api/data/collections.json');
        const collectionsData = JSON.parse(fs.readFileSync(collectionsPath, 'utf8'));
        const collections = collectionsData.collections;

        const collectionId = typeof collection === 'string' ? collection : '';
        
        // Check if collection exists by ID or name
        const foundCollection = collections.find((collection: any) => 
          collection.id.toString() === collectionId || collection.name === collectionId
        );

        if (foundCollection) {
          return foundCollection;
        } else {
          return false;
        }
    } catch (error) {
        return error;
    }
}

export default {
    Find
}