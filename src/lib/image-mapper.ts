
export const FALLBACK_IMAGE = '/images/slider-hd-1.png';

const SPECIFIC_MAPPINGS: Record<string, string> = {
    // Homepage "Category" Slugs -> Specific Legacy Grade Images
    'stainless-steel-threaded-forged-fittings-manufacturer': 'stainless-steel-304-threaded-forged-fittings-supplier.jpg',
    'carbon-steel-threaded-forged-fittings-manufacturer': 'carbon-steel-a105-threaded-forged-fittings-supplier.jpg',
    'stainless-steel-socket-weld-fittings-manufacturer': 'stainless-steel-304-socketweld-fittings-supplier.jpg',
    'alloy-steel-threaded-forged-fittings-manufacturer': 'alloy-steel-f11-threaded-forged-fittings-supplier.jpg',
    'duplex-steel-s31803-s32205-threaded-forged-fittings-manufacturer': 'duplex-steel-s31803-s32205-threaded-forged-fittings-supplier.jpg',
    'high-nickel-alloy-threaded-forged-fittings-manufacturer': 'inconel-alloy-625-threaded-forged-fittings-supplier.jpg',
    'nickel-alloy-threaded-forged-fittings-manufacturer': 'nickel-alloy-200-threaded-forged-fittings-supplier.jpg',
    // Fix Typos in filenames (legacy mismatches)
    'inconel-alloy-825-socketweld-fittings-supplier': '/images/products/inconel-alloy-825-sockeweld-fittings-supplier.jpg', // missing 't'
    'stainless-steel-347-socketweld-fittings-supplier': '/images/products/stainless-steel-347-sockeweld-fittings-supplier.jpg', // missing 't'

    // Mappings for missing specific images (Fallbacks)
    'titanium-alloy-grade-2-socketweld-fittings-supplier': '/images/products/titanium-alloy-socketweld-fittings-supplier.jpg',
    'stainless-steel-316-316l-socketweld-fittings-supplier': '/images/products/stainless-steel-304-socketweld-fittings-supplier.jpg', // Fallback to 304
    'hastelloy-socketweld-fittings-supplier': '/images/products/hastelloy-c276-socketweld-fittings-supplier.jpg', // Fallback to C276
    'hastelloy-threaded-forged-fittings-supplier': '/images/products/hastelloy-c276-threaded-forged-fittings-supplier.jpg', // Fallback to C276
    'inconel-alloy-socketweld-fittings-supplier': '/images/products/inconel-alloy-600-socketweld-fittings-supplier.jpg', // Fallback to 600
    'inconel-alloy-threaded-forged-fittings-supplier': '/images/products/inconel-alloy-600-threaded-forged-fittings-supplier.jpg', // Fallback to 600
    'monel-alloy-socketweld-fittings-supplier': '/images/products/monel-alloy-400-socketweld-fittings-supplier.jpg', // Fallback to 400
    'monel-alloy-threaded-forged-fittings-supplier': '/images/products/monel-alloy-400-threaded-forged-fittings-supplier.jpg', // Fallback to 400

    // Correct Mappings for "Stockist" Items (which have -manufacturer slugs)
    'carbon-steel-socket-weld-fittings-manufacturer': '/images/products/carbon-steel-a105-socketweld-fittings-supplier.jpg', // Fallback to A105
    'hastelloy-socket-weld-fittings-manufacturer': '/images/products/hastelloy-c276-socketweld-fittings-supplier.jpg',
    'hastelloy-threaded-forged-fittings-manufacturer': '/images/products/hastelloy-c276-threaded-forged-fittings-supplier.jpg',
    'inconel-alloy-825-socket-weld-fittings-manufacturer': '/images/products/inconel-alloy-825-sockeweld-fittings-supplier.jpg', // typo in file
    'inconel-alloy-socket-weld-fittings-manufacturer': '/images/products/inconel-alloy-600-socketweld-fittings-supplier.jpg',
    'inconel-alloy-threaded-forged-fittings-manufacturer': '/images/products/inconel-alloy-600-threaded-forged-fittings-supplier.jpg',
    'monel-alloy-socket-weld-fittings-manufacturer': '/images/products/monel-alloy-400-socketweld-fittings-supplier.jpg',
    'monel-alloy-threaded-forged-fittings-manufacturer': '/images/products/monel-alloy-400-threaded-forged-fittings-supplier.jpg',

    // Stainless 316/316L/316TI Socket Weld Images are missing -> Fallback to 304
    'stainless-steel-316-socket-weld-fittings-manufacturer': '/images/products/stainless-steel-304-socketweld-fittings-supplier.jpg',
    'stainless-steel-316l-socket-weld-fittings-manufacturer': '/images/products/stainless-steel-304-socketweld-fittings-supplier.jpg',
    'stainless-steel-316ti-socket-weld-fittings-manufacturer': '/images/products/stainless-steel-304-socketweld-fittings-supplier.jpg',

    // Stainless 347 (Typo in file)
    'stainless-steel-347-socket-weld-fittings-manufacturer': '/images/products/stainless-steel-347-sockeweld-fittings-supplier.jpg',

    // Titanium Fallback
    'titanium-alloy-grade-2-socket-weld-fittings-manufacturer': '/images/products/titanium-alloy-socketweld-fittings-supplier.jpg',

    // Generic Nickel Alloy Mappings
    'nickel-alloy-socket-weld-fittings-manufacturer': 'nickel-alloy-200-socketweld-fittings-supplier.jpg',
    'titanium-alloy-threaded-forged-fittings-manufacturer': 'titanium-alloy-grade-2-threaded-forged-fittings-supplier.jpg',
    'cupro-nickel-threaded-forged-fittings-manufacturer': 'cupro-nickel-90-10-threaded-forged-fittings-supplier.jpg'
};

export function getImageForProduct(slug: string): string {
    if (!slug) return FALLBACK_IMAGE;

    // 1. Check explicit mapping first
    if (SPECIFIC_MAPPINGS[slug]) {
        return `/images/products/${SPECIFIC_MAPPINGS[slug]}`;
    }

    // 2. Try variations
    const cleanSlug = slug.toLowerCase();

    // Variation A: exact match
    // Variation B: swap 'manufacturer' with 'supplier'
    // Variation C: swap 'socket-weld' with 'socketweld' AND 'manufacturer' with 'supplier'

    const possibleNames = [
        `${cleanSlug}.jpg`,
        `${cleanSlug.replace('manufacturer', 'supplier')}.jpg`,
        `${cleanSlug.replace('socket-weld', 'socketweld').replace('manufacturer', 'supplier')}.jpg`,
        `${cleanSlug.replace('socket-weld', 'socketweld')}.jpg`
    ];

    // Since we can't check file existence on client/server easily without fs (which isn't available in client components), 
    // we have to rely on the most likely legacy pattern which is 'supplier' + 'socketweld'.
    // However, for the 'best guess' without confirming file existence, we might return the 'supplier' version 
    // as that matches 90% of the legacy file list.

    // For specific known patterns that differ:
    if (cleanSlug.includes('socket-weld')) {
        return `/images/products/${cleanSlug.replace('socket-weld', 'socketweld').replace('manufacturer', 'supplier')}.jpg`;
    }

    return `/images/products/${cleanSlug.replace('manufacturer', 'supplier')}.jpg`;
}
