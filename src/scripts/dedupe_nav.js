const fs = require('fs');
const path = require('path');

const NAV_PATH = './src/lib/nav-data.json';

function dedupeNav() {
    const navData = JSON.parse(fs.readFileSync(NAV_PATH, 'utf8'));
    const cleanNavData = [];

    navData.forEach(category => {
        const uniqueItems = new Map();

        category.items.forEach(item => {
            if (!uniqueItems.has(item.href)) {
                uniqueItems.set(item.href, item);
            } else {
                // If we already have this link, check if the current label is "better"
                // Heuristic: Prefer "Sheets & Plates" over "Chequered" or "Perforated" 
                // since the destination is the generic sheet page.
                const existingItem = uniqueItems.get(item.href);
                const currentLabel = item.label.toLowerCase();
                const existingLabel = existingItem.label.toLowerCase();

                if (currentLabel.includes('sheets & plates') || currentLabel.includes('sheets and plates')) {
                    uniqueItems.set(item.href, item);
                } else if (!existingLabel.includes('sheets & plates') && !existingLabel.includes('sheets and plates')) {
                    // If neither is "Sheets & Plates", maybe prefer shorter? or just keep first.
                    // Let's just keep the existing one unless it's "Chequered/Perforated" vs "something else"
                }
            }
        });

        // Convert map values back to array
        // Sort explicitly if needed, or keep insertion order (Map preserves insertion order)
        const items = Array.from(uniqueItems.values());

        if (items.length > 0) {
            cleanNavData.push({ ...category, items });
        }
    });

    fs.writeFileSync(NAV_PATH, JSON.stringify(cleanNavData, null, 2));
    console.log('Deduplicated nav data written.');
    console.log('Categories processed:', cleanNavData.length);
}

dedupeNav();
