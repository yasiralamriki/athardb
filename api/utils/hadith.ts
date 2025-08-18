import path from 'path';
import fs from 'fs';
import collections from "./collections.ts";

function Find(collection, hadith) {
    try {
        const foundCollection = collections.Find(collection);

        if (foundCollection !== false) {
            try {
                // Read and parse collections.json
                const hadithPath = path.join(process.cwd(), foundCollection.path);
                const hadithData = JSON.parse(fs.readFileSync(hadithPath, 'utf8'));
                const ahadith = hadithData.ahadith;

                const hadithId = typeof hadith === 'string' ? hadith : '';

                // Check if collection exists by ID or name
                const foundHadith = ahadith.find((hadith: any) =>
                    hadith.id.toString() === hadithId || hadith.name === hadithId
                );

                if (foundHadith) {
                    return foundHadith;
                } else {
                    return false;
                }
            } catch (error) {
                return error;
            }
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