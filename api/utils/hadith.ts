import path from 'path';
import fs from 'fs';
import collections from "./collections.ts";

interface Hadith {
    id: string | number;
    name: string;
    [key: string]: any;
}

interface HadithData {
    ahadith: Hadith[];
    [key: string]: any;
}

function Find(collection: string, hadith: string | number): Hadith | false | Error {
    try {
        const foundCollection = collections.Find(collection);

        if (foundCollection !== false) {
            try {
                // Read and parse collections.json
                const hadithPath: string = path.join(process.cwd(), foundCollection.path);
                const hadithData: HadithData = JSON.parse(fs.readFileSync(hadithPath, 'utf8'));
                const ahadith: Hadith[] = hadithData.ahadith;

                const hadithId: string = typeof hadith === 'string' ? hadith : '';

                // Check if collection exists by ID or name
                const foundHadith: Hadith | undefined = ahadith.find((hadith: Hadith) =>
                    hadith.id.toString() === hadithId || hadith.name === hadithId
                );

                if (foundHadith) {
                    return foundHadith;
                } else {
                    return false;
                }
            } catch (error) {
                return error as Error;
            }
        } else {
            return false;
        }
    } catch (error) {
        return error as Error;
    }
}

export default {
    Find
}