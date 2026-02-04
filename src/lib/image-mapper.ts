
export const FALLBACK_IMAGE = '/images/slider-hd-1.png';

const SPECIFIC_MAPPINGS: Record<string, string> = {
    // Homepage "Category" Slugs -> Mapped to available Generic Images
    'stainless-steel-304-sheet-plates-manufacturer-exporter': 'sheet-plates-manufacturer.jpg',
    'stainless-steel-304-coils-manufacturer-exporter': 'coils-manufacturer.jpg',
    'stainless-steel-17-4ph-flange-manufacturer-exporter': 'flanges-manufacturer.jpg',
    'aluminium-alloy-2024-sheet-plates-manufacturer-exporter': 'aluminium-alloy-2024-sheet-plates-manufacturer-exporter.jpg',
    'duplex-s31803-s32205-sheet-plates-manufacturer-exporter': 'sheet-plates-manufacturer.jpg',
    'alloy-20-sheet-plates-manufacturer-exporter': 'sheet-plates-manufacturer.jpg',
    'stainless-steel-17-4ph-blind-flange-manufacturer-exporter': 'blind-flanges-manufacturer.jpg',
    'super-duplex-s32750-s32760-sheet-plates-manufacturer-exporter': 'sheet-plates-manufacturer.jpg',

    // Additional verified mappings from nav data
    'stainless-steel-310-310s-sheet-plates-manufacturer-exporter': 'sheet-plates.jpg',
    'stainless-steel-316-316l-sheet-plates-manufacturer-exporter': 'sheet-plates.jpg',
    'stainless-steel-317-sheet-plates-manufacturer-exporter': 'sheet-plates-manufacturer.jpg',
    'stainless-steel-347-sheet-plates-manufacturer-exporter': 'sheet-plates.jpg',
    'stainless-steel-410-sheet-plates-manufacturer-exporter': 'sheet-plates-manufacturer.jpg',
    'aisi-430-sheet-plates-manufacturer-exporter': 'sheet-plates.jpg',
    'stainless-steel-904l-sheet-plates-manufacturer-exporter': 'sheet-plates-manufacturer.jpg',
    'carbon-steel-astm-a515-gr-60-plates-manufacturer-exporter': 'sheet-plates.jpg',

    // Legacy Mappings kept for reference/fallback
    // Specific Fixes for 15-5PH and Super Duplex (from User feedback)
    // Removed broken legacy mappings
    'super-duplex-steel-s32750-s32760-sheet-plates-manufacturer-exporter': 'sheet-plates-manufacturer.jpg',
};

export function getImageForProduct(slug: string): string {
    if (!slug) return FALLBACK_IMAGE;

    // 1. Check explicit mapping first
    if (SPECIFIC_MAPPINGS[slug]) {
        const mapping = SPECIFIC_MAPPINGS[slug];
        if (mapping.startsWith('/')) {
            return mapping;
        }
        return `/images/${mapping}`;
    }

    // 2. Keyword-based Fallbacks (Order matters for specificity)
    const s = slug.toLowerCase();

    // Fasteners
    // Fasteners (Granular)
    if (s.includes('bolt')) return '/images/bolts-manufacturer.jpg';
    if (s.includes('nut')) return '/images/nuts-manufacturer.jpg';
    if (s.includes('screw')) return '/images/screws-manufacturer.jpg';
    if (s.includes('washer')) return '/images/washers-manufacturer.jpg';
    if (s.includes('coated')) return '/images/ptee-coated-fasteners-manufacturer.jpg';

    // Generic Fasteners
    if (s.includes('fastener') || s.includes('stud')) {
        return '/images/stainless-steel-fasteners-manufacturer.jpg';
    }

    // Angle & Channel
    if (s.includes('angle') || s.includes('channel')) {
        return '/images/angle-channel-manufacturer.jpg';
    }

    // Flanges (Specific types first)
    if (s.includes('blind')) {
        if (s.includes('spectacle')) return '/images/spectacle-blind-flanges-manufacturer.jpg';
        return '/images/blind-flanges-manufacturer.jpg';
    }
    if (s.includes('slip')) return '/images/slip-on-flanges-manufacturer.jpg';
    if (s.includes('weld neck') || s.includes('weld-neck') || s.includes('wnrf')) return '/images/weld-neck-flanges-manufacturer.jpg';
    if (s.includes('socket')) return '/images/socket-weld-flanges-manufacturer.jpg';
    if (s.includes('threaded')) return '/images/threaded-flanges-manufacturer.jpg';
    if (s.includes('lap')) return '/images/lap-joint-flanges-manufacturer.jpg';
    if (s.includes('orifice')) return '/images/orifice-flanges-manufacturer.jpg';

    // Generic Flange
    if (s.includes('flange')) {
        return '/images/flanges-manufacturer.jpg';
    }

    // Fittings (Granular)
    if (s.includes('butt')) return '/images/buttweld-fittings-manufacturer.jpg';
    if (s.includes('socket')) return '/images/socketweld-fittings-manufacturer.jpg';
    if (s.includes('threaded') || s.includes('screwed')) return '/images/threaded-forged-fittings-manufacturer.jpg';
    if (s.includes('hydraulic')) return '/images/hydraulic-fittings-manufacturer.jpg';

    // Shape-based Fallbacks (Assume Buttweld for major shapes, Threaded for smalls)
    if (s.includes('elbow') || s.includes('tee') || s.includes('reducer') || s.includes('cap') || s.includes('stub') || s.includes('cross')) {
        return '/images/buttweld-fittings-manufacturer.jpg';
    }
    if (s.includes('coupling') || s.includes('nipple') || s.includes('union') || s.includes('plug') || s.includes('bushing') || s.includes('boss') || s.includes('insert')) {
        return '/images/threaded-forged-fittings-manufacturer.jpg';
    }

    // Generic Fittings (Catch-all)
    if (s.includes('fitting')) {
        return '/images/pipe-fittings-manufacturer.jpg';
    }

    // Tubes (Check before pipe if distinct, or after?)
    if (s.includes('tube') || s.includes('tubing')) {
        return '/images/tubes-manufacturer.jpg';
    }

    // Pipes (Check after fittings/flanges to avoid misclassification)
    if (s.includes('pipe')) {
        return '/images/pipes-manufacturer.jpg';
    }

    // Wire
    if (s.includes('wire')) {
        return '/images/wire-manufacturer.jpg';
    }

    // Coils
    if (s.includes('coil')) {
        return '/images/coils-manufacturer.jpg';
    }

    // Strips
    if (s.includes('strip')) {
        return '/images/strips-manufacturer.jpg';
    }

    // Bars (Granular checks first)
    if (s.includes('hex')) return '/images/hex-bars-manufacturer.jpg';
    if (s.includes('flat')) return '/images/flat-bars-manufacturer.jpg';
    if (s.includes('square')) return '/images/square-bars-manufacturer.jpg';
    if (s.includes('threaded')) return '/images/threaded-bars-manufacturer.jpg';
    if (s.includes('bright')) return '/images/bright-bars-manufacturer.jpg';
    if (s.includes('polished')) return '/images/polished-bars-manufacturer.jpg';
    if (s.includes('rect')) return '/images/rectangular-bars-manufacturer.jpg';
    // Generic Bar/Rod
    if (s.includes('bar') || s.includes('rod')) {
        return '/images/round-bars-manufacturer.jpg';
    }

    // Anchors
    if (s.includes('anchor')) {
        return '/images/refactory-y-anchors-manufacturer.jpg';
    }

    // Default for Sheets/Plates (Most common remaining category)
    if (s.includes('sheet') || s.includes('plate') || s.includes('shim')) {
        return '/images/sheet-plates-manufacturer.jpg';
    }

    // 3. Try exact match as last resort
    return `/images/${s}.jpg`;
}
