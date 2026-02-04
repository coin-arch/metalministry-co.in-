const fs = require('fs');
const path = require('path');

const NAV_PATH = './src/lib/nav-data.json';

function removeDupes() {
    let navData = JSON.parse(fs.readFileSync(NAV_PATH, 'utf8'));
    let totalRemoved = 0;

    navData.forEach(category => {
        let uniqueItems = [];
        let seenTitles = new Set();
        let seenSlugs = new Set();

        category.items.forEach(item => {
            // Normalize: "Stainless Steel 304 Sheet" == "Stainless Steel 304 Sheets"
            let normTitle = item.label.toLowerCase()
                .replace(/sheets/g, 'sheet').replace(/plates/g, 'plate')
                .replace(/bars/g, 'bar').replace(/rods/g, 'bar')
                .replace(/stockist/g, '').replace(/manufacturer/g, '').replace(/exporter/g, '')
                .replace(/supplier/g, '').trim();

            if (seenSlugs.has(item.href)) {
                console.log(`Removing Exact Duplicate Slug: ${item.label}`);
                totalRemoved++;
                return;
            }
            if (seenTitles.has(normTitle)) {
                console.log(`Removing Duplicate Title: ${item.label} (matches existing)`);
                totalRemoved++;
                return;
            }

            seenSlugs.add(item.href);
            seenTitles.add(normTitle);
            uniqueItems.push(item);
        });

        category.items = uniqueItems;
    });

    fs.writeFileSync(NAV_PATH, JSON.stringify(navData, null, 2));
    console.log(`\nTotal Duplicates Removed: ${totalRemoved}`);
}

removeDupes();
