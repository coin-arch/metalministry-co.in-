const fs = require('fs');
const path = require('path');

// Mock specific mappings and logic from image-mapper.ts locally for analysis
// (Copying the logic I just wrote to verify it 'offline')
const FALLBACK_IMAGE = '/images/slider-hd-1.png';

// Copying the essential logic from image-mapper.ts for simulation
function getImageForProduct(slug) {
    if (!slug) return FALLBACK_IMAGE;
    const s = slug.toLowerCase();

    // Fasteners
    if (s.includes('bolt')) return '/images/bolts-manufacturer.jpg';
    if (s.includes('nut')) return '/images/nuts-manufacturer.jpg';
    if (s.includes('screw')) return '/images/screws-manufacturer.jpg';
    if (s.includes('washer')) return '/images/washers-manufacturer.jpg';
    if (s.includes('coated')) return '/images/ptee-coated-fasteners-manufacturer.jpg';
    if (s.includes('fastener') || s.includes('stud')) return '/images/stainless-steel-fasteners-manufacturer.jpg';

    // Angle/Channel
    if (s.includes('angle') || s.includes('channel')) return '/images/angle-channel-manufacturer.jpg';

    // Flanges
    if (s.includes('blind')) {
        if (s.includes('spectacle')) return '/images/spectacle-blind-flanges-manufacturer.jpg';
        return '/images/blind-flanges-manufacturer.jpg';
    }
    if (s.includes('slip')) return '/images/slip-on-flanges-manufacturer.jpg';
    if (s.includes('weld neck') || s.includes('weld-neck') || s.includes('wnrf')) return '/images/weld-neck-flanges-manufacturer.jpg';
    if (s.includes('socket') && s.includes('flange')) return '/images/socket-weld-flanges-manufacturer.jpg'; // specific check
    if (s.includes('threaded') && s.includes('flange')) return '/images/threaded-flanges-manufacturer.jpg';
    if (s.includes('lap')) return '/images/lap-joint-flanges-manufacturer.jpg';
    if (s.includes('orifice')) return '/images/orifice-flanges-manufacturer.jpg';
    if (s.includes('flange')) return '/images/flanges-manufacturer.jpg';

    // Fittings
    if (s.includes('butt')) return '/images/buttweld-fittings-manufacturer.jpg';
    if (s.includes('socket')) return '/images/socketweld-fittings-manufacturer.jpg';
    if ((s.includes('threaded') || s.includes('screwed')) && !s.includes('flange')) return '/images/threaded-forged-fittings-manufacturer.jpg';
    if (s.includes('hydraulic')) return '/images/hydraulic-fittings-manufacturer.jpg';
    if (s.includes('fitting') || s.includes('elbow') || s.includes('tee') || s.includes('reducer') || s.includes('stub') || s.includes('coupling') || s.includes('nipple') || s.includes('union') || s.includes('plug') || s.includes('bushing')) {
        return '/images/pipe-fittings-manufacturer.jpg';
    }

    // Tubes
    if (s.includes('tube') || s.includes('tubing')) return '/images/tubes-manufacturer.jpg';
    // Pipes
    if (s.includes('pipe')) return '/images/pipes-manufacturer.jpg';
    // Wire
    if (s.includes('wire')) return '/images/wire-manufacturer.jpg';
    // Coils
    if (s.includes('coil')) return '/images/coils-manufacturer.jpg';
    // Strips
    if (s.includes('strip')) return '/images/strips-manufacturer.jpg';

    // Bars
    if (s.includes('hex')) return '/images/hex-bars-manufacturer.jpg';
    if (s.includes('flat')) return '/images/flat-bars-manufacturer.jpg';
    if (s.includes('square')) return '/images/square-bars-manufacturer.jpg';
    if (s.includes('threaded')) return '/images/threaded-bars-manufacturer.jpg';
    if (s.includes('bright')) return '/images/bright-bars-manufacturer.jpg';
    if (s.includes('polished')) return '/images/polished-bars-manufacturer.jpg';
    if (s.includes('angle') || s.includes('rect')) return '/images/rectangular-bars-manufacturer.jpg';
    if (s.includes('bar') || s.includes('rod')) return '/images/round-bars-manufacturer.jpg';

    // Anchors
    if (s.includes('anchor')) return '/images/refactory-y-anchors-manufacturer.jpg';

    // Sheet/Plate Fallback logic
    if (s.includes('sheet') || s.includes('plate') || s.includes('shim')) return 'GENERIC_SHEET';

    return 'NO_MATCH';
}

const NAV_PATH = './src/lib/nav-data.json';
const navData = JSON.parse(fs.readFileSync(NAV_PATH, 'utf8'));

let allItems = [];
navData.forEach(cat => allItems.push(...cat.items));

// 1. Check for Duplicates
let seenSlugs = new Set();
let duplicates = [];
// Also check for fuzzy title duplicates
let seenTitles = {};

allItems.forEach(item => {
    // Slug dupe
    if (seenSlugs.has(item.href)) {
        duplicates.push({ type: 'Exact Slug', item });
    } else {
        seenSlugs.add(item.href);
    }

    // Title dupe (normalized)
    let normTitle = item.label.toLowerCase().trim().replace(/stockist/g, '').replace(/manufacturer/g, '').replace(/exporter/g, '').trim();
    if (seenTitles[normTitle]) {
        duplicates.push({ type: 'Similar Title', current: item.label, existing: seenTitles[normTitle].label });
    } else {
        seenTitles[normTitle] = item;
    }
});

// 2. Check Image Stats
let imageStats = {};
allItems.forEach(item => {
    let slug = item.href.replace('/products/', '');
    let img = getImageForProduct(slug);
    imageStats[img] = (imageStats[img] || 0) + 1;
});

console.log('\n--- DUPLICATE ANALYSIS ---');
console.log(`Total Items: ${allItems.length}`);
console.log(`Potential Duplicates Found: ${duplicates.length}`);
if (duplicates.length > 0) {
    console.log('Sample Duplicates:');
    duplicates.slice(0, 10).forEach(d => console.log(` - ${d.type}: ${d.item ? d.item.label : d.current}`));
}

console.log('\n--- TOP 10 REPEATED IMAGES ---');
let sortedStats = Object.entries(imageStats).sort((a, b) => b[1] - a[1]);
sortedStats.slice(0, 10).forEach(([img, count]) => {
    console.log(`${count}: ${img}`);
});

console.log('\n--- BREAKDOWN: Threaded Fittings (Largest Group) ---');
// Analyze keywords within the largest group to find splitting opportunities
let threadedGroup = allItems.filter(i => {
    let s = i.href.replace('/products/', '').toLowerCase();
    return (s.includes('threaded') || s.includes('screwed')) && !s.includes('flange');
});
let subStats = {};
threadedGroup.forEach(i => {
    let s = i.href.replace('/products/', '').toLowerCase();
    let key = 'other';
    if (s.includes('elbow')) key = 'elbow';
    else if (s.includes('tee')) key = 'tee';
    else if (s.includes('union')) key = 'union';
    else if (s.includes('coupling')) key = 'coupling';
    else if (s.includes('plug')) key = 'plug';
    else if (s.includes('bushing')) key = 'bushing';
    else if (s.includes('nipple')) key = 'nipple';
    subStats[key] = (subStats[key] || 0) + 1;
});
console.log(subStats);
