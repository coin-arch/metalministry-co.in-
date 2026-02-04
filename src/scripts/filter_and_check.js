const fs = require('fs');
const path = require('path');

const NAV_PATH = './src/lib/nav-data-fixed.json';
const IMAGES_DIR = './public/images';

function filterAndCheck() {
    let navData = JSON.parse(fs.readFileSync(NAV_PATH, 'utf8'));

    // 1. Filter out known bad mappings
    // Remove "Stainless Steel 202" items (checking label)
    navData = navData.map(cat => ({
        ...cat,
        items: cat.items.filter(item => !item.label.includes('Stainless Steel 202'))
    })).filter(cat => cat.items.length > 0);

    // 2. Check image coverage
    const missingImages = [];
    const usedSlugs = new Set();

    navData.forEach(cat => {
        cat.items.forEach(item => {
            const slug = item.href.replace('/products/', '');
            usedSlugs.add(slug);

            // Check for explicit file match
            // In the app, image-mapper handles 'img/' prefixes etc, but default is slug.jpg
            // We'll check if slug.jpg exists or if a generic fallback exists 
            // This is a rough check. Ideally we mirror image-mapper logic.

            const exactPath = path.join(IMAGES_DIR, `${slug}.jpg`);
            if (!fs.existsSync(exactPath)) {
                missingImages.push(slug);
            }
        });
    });

    // Write filtered nav data back
    fs.writeFileSync(NAV_PATH, JSON.stringify(navData, null, 2));
    console.log('Filtered Nav Data written.');

    console.log('\n--- Slugs without exact image match (Need checking in image-mapper.ts) ---');
    [...new Set(missingImages)].forEach(slug => console.log(slug));
}

filterAndCheck();
