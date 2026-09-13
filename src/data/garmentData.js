// Adaptive Apparel Catalog & Garment Data for AdaptiveStyle AI (Track 5: Fashion for People)
// Team: KalVibers (M. Venkata Durga Lakshmi, M. Lakshmi Pavani, Godasu Sai Vardhan, Y. Divya Sri)

export const SAMPLE_GARMENTS = [
  {
    id: 'sample-oxford-1',
    name: 'Adaptive Magnetic Oxford Shirt',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp woven cotton oxford shirt retrofitted with concealed magnetic button-placket for 1-second single-handed dressing.',
    features: ['Magnetic Snaps', 'Tagless Inner Collar', 'Flat-Felled Soft Seams', 'Easy-Dress Sleeves'],
    detectionTags: [
      { id: 'dt1', label: 'Magnetic Closure Zone Detected', x: 50, y: 45, confidence: 0.98, type: 'dexterity' },
      { id: 'dt2', label: 'Tagless Neck', x: 50, y: 15, confidence: 0.96, type: 'sensory' },
      { id: 'dt3', label: 'Side Seam Zipper', x: 75, y: 55, confidence: 0.94, type: 'dexterity' },
      { id: 'dt4', label: 'Flat Low-Friction Seams', x: 28, y: 60, confidence: 0.92, type: 'sensory' }
    ],
    fitDetails: {
      seatedScore: 94,
      standingScore: 90,
      seatedNotes: 'Extended back-hem prevents skin exposure when leaning forward. Zero chest pulling.',
      seatedOverlays: [
        { label: 'Zero Lap Bunching', position: 'bottom', highlight: 'Shorter front rise prevents fabric fold buildup' },
        { label: 'Extended Back Hem (+3 in)', position: 'back', highlight: 'Maintains coverage over wheelchair backrest' },
        { label: 'Gusseted Underarm', position: 'chest', highlight: 'Prevents seam restriction during propulsion' }
      ]
    },
    basePrice: 48,
    matchProfile: {
      dexterity: ['Fine Motor Difficulty', 'Reduced Hand Strength', 'Single-Hand Operation Only', 'Tremors'],
      closures: ['Magnetic Snaps'],
      sensory: ['Tagless Inner Collar', 'Flat-Felled Soft Seams', 'Wide Neck Opening'],
      mobility: ['Wheelchair / Seated Posture', 'Crutches / Walker', 'Bed-bound / Limited Range']
    }
  },
  {
    id: 'sample-chinos-2',
    name: 'Seated Ergonomic Chinos',
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    description: 'Custom seated-pattern trousers with high rear rise, hook-and-loop faux fly, and frictionless flat seat.',
    features: ['Elastic Waistband', 'Easy-Pull Side Zippers', 'Flat-Felled Soft Seams', 'Pocketless Rear'],
    detectionTags: [
      { id: 'dt5', label: 'Easy-Pull Side Seam Zips', x: 25, y: 55, confidence: 0.97, type: 'dexterity' },
      { id: 'dt6', label: 'High Rear Rise Contour', x: 50, y: 22, confidence: 0.95, type: 'mobility' },
      { id: 'dt7', label: 'Pressure-Relief Pocketless Seat', x: 50, y: 70, confidence: 0.99, type: 'sensory' },
      { id: 'dt8', label: 'Elasticized Comfort Waistband', x: 50, y: 15, confidence: 0.93, type: 'mobility' }
    ],
    fitDetails: {
      seatedScore: 98,
      standingScore: 84,
      seatedNotes: 'Engineered specifically for wheelchair users with high back waistband and zero pocket pressure points.',
      seatedOverlays: [
        { label: 'High Rear Rise Cut (+4 in)', position: 'back', highlight: 'No gap below lumbar spine in seated position' },
        { label: 'Smooth Pocketless Seat', position: 'bottom', highlight: 'Eliminates skin pressure sore risks from thick seams' },
        { label: 'Long Ankle Inseam', position: 'legs', highlight: 'Does not ride up over shins when knees are bent at 90°' }
      ]
    },
    basePrice: 56,
    matchProfile: {
      dexterity: ['Reduced Hand Strength', 'Fine Motor Difficulty'],
      closures: ['Easy-Pull Side Zippers', 'Elastic Waistband', 'Heavy-Duty Velcro'],
      sensory: ['Flat-Felled Soft Seams', 'Tagless Inner Collar'],
      mobility: ['Wheelchair / Seated Posture', 'Bed-bound / Limited Range']
    }
  },
  {
    id: 'sample-hoodie-3',
    name: 'Sensory Comfort Side-Zip Hoodie',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-soft fleece hoodie with full side-seam breakaway zippers allowing effortless dressing from wheelchair or bed.',
    features: ['Easy-Pull Side Zippers', 'Tagless Inner Collar', 'Wide Neck Opening', 'Non-Restrictive Armholes'],
    detectionTags: [
      { id: 'dt9', label: 'Full Side Breakaway Zipper', x: 80, y: 60, confidence: 0.99, type: 'mobility' },
      { id: 'dt10', label: 'Oversized Ring-Pull Tab', x: 78, y: 35, confidence: 0.95, type: 'dexterity' },
      { id: 'dt11', label: '100% Tagless Microfleece', x: 50, y: 20, confidence: 0.98, type: 'sensory' },
      { id: 'dt12', label: 'Deep Raglan Non-Binding Arms', x: 30, y: 40, confidence: 0.92, type: 'mobility' }
    ],
    fitDetails: {
      seatedScore: 96,
      standingScore: 92,
      seatedNotes: 'Side zippers unfasten up to armpits so carers or individuals can put it on without shoulder hyper-extension.',
      seatedOverlays: [
        { label: 'Dual Lateral Openings', position: 'chest', highlight: 'Sides detach fully for zero-lift seated dressing' },
        { label: 'Soft Ribbed Hem', position: 'bottom', highlight: 'No elastic dig into the abdomen' },
        { label: 'Raglan Free-Motion Sleeves', position: 'arms', highlight: 'Eliminates shoulder seams that rub against wheelchair cushions' }
      ]
    },
    basePrice: 64,
    matchProfile: {
      dexterity: ['Fine Motor Difficulty', 'Reduced Hand Strength', 'Single-Hand Operation Only', 'Tremors'],
      closures: ['Easy-Pull Side Zippers', 'Hook-and-Loop'],
      sensory: ['Tagless Inner Collar', 'Flat-Felled Soft Seams', 'Wide Neck Opening', 'Non-Restrictive Armholes'],
      mobility: ['Wheelchair / Seated Posture', 'Bed-bound / Limited Range', 'Crutches / Walker']
    }
  },
  {
    id: 'sample-dress-4',
    name: 'Front-Wrap Magnetic Utility Dress',
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    description: 'Elegant wrap garment with interior magnetic snap grid and soft elasticized waist tailored for seated comfort.',
    features: ['Magnetic Snaps', 'Elastic Waistband', 'Wide Neck Opening', 'Tagless Inner Collar'],
    detectionTags: [
      { id: 'dt13', label: 'Magnetic Waist Fasteners', x: 45, y: 50, confidence: 0.97, type: 'dexterity' },
      { id: 'dt14', label: 'Overlap Wrap Anti-Gap Panel', x: 55, y: 65, confidence: 0.94, type: 'mobility' },
      { id: 'dt15', label: 'Seamless Hypoallergenic Neck', x: 50, y: 20, confidence: 0.96, type: 'sensory' }
    ],
    fitDetails: {
      seatedScore: 95,
      standingScore: 94,
      seatedNotes: 'Overlap front drape protects modesty while seated with no gap risk and soft breathable bamboo cotton.',
      seatedOverlays: [
        { label: 'Modesty Lap Overlap', position: 'bottom', highlight: 'Generous fabric crossover stays securely in place seated' },
        { label: 'Hidden Magnetic Grid', position: 'chest', highlight: 'Aligns automatically with gentle pressure' }
      ]
    },
    basePrice: 72,
    matchProfile: {
      dexterity: ['Fine Motor Difficulty', 'Single-Hand Operation Only'],
      closures: ['Magnetic Snaps', 'Elastic Waistband'],
      sensory: ['Tagless Inner Collar', 'Wide Neck Opening'],
      mobility: ['Wheelchair / Seated Posture', 'Crutches / Walker']
    }
  }
]

export const CATALOG_ITEMS = [
  {
    id: 'cat-1',
    name: 'Pro-Adaptive Magnetic Oxford Shirt',
    category: 'High Dexterity (Magnetic)',
    filterTag: 'magnetic',
    price: 48.00,
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: 'Classic boardroom oxford with hidden neodymium magnetic snap front and magnetic cuffs for rapid self-dressing.',
    mechanisms: ['Concealed Magnetic Snaps', 'Tagless Collar', 'Flat Seams', 'Wide Underarm Gussets'],
    accessibilityScore: 96,
    highlight: 'Replaces 8 tiny buttons with click-together concealed magnets',
    fitSimulator: {
      seatedScore: 95,
      standingScore: 91,
      standingDrape: 'Standard vertical drape, classic semi-tailored silhouette.',
      seatedHighlights: [
        'Zero lap-bunching: Front length calibrated 2.5 inches shorter to avoid thigh crumpling.',
        'Extended back length (+3 inches) ensures shirt stays tucked without exposing lower back.',
        'Ergonomically relaxed armholes eliminate armpit chafing while operating mobility wheels.'
      ]
    }
  },
  {
    id: 'cat-2',
    name: 'Seated-Cut Wheelchair Chino Pants',
    category: 'Seated Wheelchair Cut',
    filterTag: 'seated',
    price: 56.00,
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered specifically for seated biomechanics. High back rise, zero back pockets to protect skin tissue, and easy-pull zippers.',
    mechanisms: ['High Rear Rise', 'Dual Side-Leg Zips', 'Pocketless Rear Seat', 'Elasticized Waist'],
    accessibilityScore: 98,
    highlight: 'High-waist back prevents lower-spine gap exposure; smooth seat avoids pressure sores',
    fitSimulator: {
      seatedScore: 99,
      standingScore: 82,
      standingDrape: 'Slightly higher back rise when upright, relaxed taper down leg.',
      seatedHighlights: [
        'Zero lap-bunching: Flattened pelvic contour removes excess cloth bunching at hip crease.',
        'High 4-inch back rise protects spinal lumbar region from contact with wheelchair chassis.',
        'Pressure-relief smooth seat: 100% stitchless rear eliminates friction against skin tissue.'
      ]
    }
  },
  {
    id: 'cat-3',
    name: 'Sensory Cloud Zip-Breakaway Hoodie',
    category: 'Sensory-Friendly',
    filterTag: 'sensory',
    price: 64.00,
    rating: 5.0,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Hypoallergenic organic cotton hoodie with dual side-seam breakaway zippers, zero irritating tags, and external flat-lock stitching.',
    mechanisms: ['Full Breakaway Zips', '100% Tagless Microfleece', 'Flat-Felled Soft Seams', 'Oversized Ring Pulls'],
    accessibilityScore: 94,
    highlight: 'Unzips completely along both flanks for zero-lift dressing from chair or bed',
    fitSimulator: {
      seatedScore: 96,
      standingScore: 93,
      standingDrape: 'Relaxed athletic comfort fit with clean side profiles.',
      seatedHighlights: [
        'Full side-to-underarm breakaway zippers allow dressing without lifting arms overhead.',
        'Smooth tagless inner neck prevents hypersensitive cutaneous friction.',
        'Non-bunching front pocket repositioned higher for unobstructed lap access.'
      ]
    }
  },
  {
    id: 'cat-4',
    name: 'Front-Magnetic Wrap Dress with Soft Belt',
    category: 'High Dexterity (Magnetic)',
    filterTag: 'magnetic',
    price: 72.00,
    rating: 4.9,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    description: 'Flowing breathable modal wrap dress featuring magnetic touch-and-close overlap placket for graceful, independent one-handed dressing.',
    mechanisms: ['Magnetic Snap Matrix', 'Elasticated Comfort Waist', 'Tagless Collar', 'Wide Flared Skirt'],
    accessibilityScore: 92,
    highlight: 'Magnetic matrix automatically snaps into alignment with gentle press',
    fitSimulator: {
      seatedScore: 94,
      standingScore: 95,
      standingDrape: 'Flattering A-line silhouette with gentle wrap drape.',
      seatedHighlights: [
        'Generous wrap overlap ensures complete privacy and zero thigh slippage when seated.',
        'Soft stretchy waistband prevents tightness when sitting down for extended periods.',
        'Magnetic closure aligns naturally with zero fine motor coordination needed.'
      ]
    }
  },
  {
    id: 'cat-5',
    name: 'Dual-Zip Seated Cargo Pants',
    category: 'Seated Wheelchair Cut',
    filterTag: 'seated',
    price: 62.00,
    rating: 4.7,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
    description: 'Durable stretch cargo trousers with full-length two-way lateral zippers, seated-cut articulation, and front-accessible thigh pockets.',
    mechanisms: ['Two-Way Ankle-to-Hip Zips', 'Front-Facing Cargo Pockets', 'Reinforced Pull Loops', 'Hook-and-Loop Waist'],
    accessibilityScore: 97,
    highlight: 'Two-way full lateral zippers permit catheter check or braces access without undressing',
    fitSimulator: {
      seatedScore: 98,
      standingScore: 85,
      standingDrape: 'Tactical modern cargo cut with articulated knees.',
      seatedHighlights: [
        'Front-facing thigh pockets are fully accessible while seated in wheelchairs or scooters.',
        'Two-way zippers can open from bottom for leg braces or from top for easy transfers.',
        'Extended rear back-rise prevents drafts and undergarment exposure.'
      ]
    }
  },
  {
    id: 'cat-6',
    name: 'Sensory-Friendly Bamboo Loungewear Set',
    category: 'Sensory-Friendly',
    filterTag: 'sensory',
    price: 54.00,
    rating: 4.9,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-gentle viscose bamboo lounge set crafted with 100% external flat-lock stitching, thermal regulating weave, and tag-free design.',
    mechanisms: ['External Flat-Lock Seams', 'Zero Interior Tags', 'Ultra-Wide Neck Opening', 'Elastic Waistband'],
    accessibilityScore: 95,
    highlight: 'Designed specifically for sensory hypersensitivity and neurodivergent comfort',
    fitSimulator: {
      seatedScore: 95,
      standingScore: 94,
      standingDrape: 'Soft cloud-like drape, cozy and relaxed fit.',
      seatedHighlights: [
        'Zero interior labels or hard seams touching sensory sensitive nerve endings.',
        'Wide head opening requires no force or tight friction over hair and ears.',
        'Wide elastic waistband distributes pressure evenly without digestive constriction.'
      ]
    }
  }
]

export const AVAILABLE_ALTERATIONS = [
  {
    id: 'alt-magnetic-snaps',
    title: 'Convert front buttons to hidden magnetic snaps',
    description: 'Replaces tiny fiddly buttonholes with concealed neodymium magnetic closures that snap shut automatically.',
    targetNeed: 'Fine Motor Difficulty',
    category: 'dexterity',
    price: 15.00,
    turnaroundHours: 48,
    recommendedFor: ['Fine Motor Difficulty', 'Tremors', 'Single-Hand Operation Only']
  },
  {
    id: 'alt-side-zippers',
    title: 'Add side-seam zipper for easy seated access',
    description: 'Installs full-length or half-length two-way soft zippers with oversized ring pull along outer garment seam.',
    targetNeed: 'Wheelchair / Seated Posture',
    category: 'mobility',
    price: 18.00,
    turnaroundHours: 48,
    recommendedFor: ['Wheelchair / Seated Posture', 'Bed-bound / Limited Range', 'Reduced Hand Strength']
  },
  {
    id: 'alt-tagless-seams',
    title: 'Remove neck tags and flatten inner seams',
    description: 'Surgically unpicks coarse woven brand tags and binds exposed seam allowances with ultrasoft silk-cotton tape.',
    targetNeed: 'Tagless Inner Collar',
    category: 'sensory',
    price: 10.00,
    turnaroundHours: 24,
    recommendedFor: ['Tagless Inner Collar', 'Flat-Felled Soft Seams']
  },
  {
    id: 'alt-pull-loops',
    title: 'Add internal pull-up loops & reinforced tabs',
    description: 'Stitches heavy-duty yet concealed grosgrain ribbon loops inside waistbands or cuffs for easy hook/finger leverage.',
    targetNeed: 'Reduced Hand Strength',
    category: 'dexterity',
    price: 12.00,
    turnaroundHours: 36,
    recommendedFor: ['Reduced Hand Strength', 'Fine Motor Difficulty']
  },
  {
    id: 'alt-back-rise',
    title: 'Extend rear rise & back length (+3 inches)',
    description: 'Inserts color-matched ergonomic wedge gusset into lower back to prevent gap exposure when seated in wheelchair.',
    targetNeed: 'Wheelchair / Seated Posture',
    category: 'mobility',
    price: 20.00,
    turnaroundHours: 48,
    recommendedFor: ['Wheelchair / Seated Posture']
  }
]

export const LOCAL_TAILORS = [
  {
    id: 'tailor-1',
    name: 'City Adaptive Sewing Hub',
    address: '142 Independence Blvd, Suite 3B',
    distance: '2.4 miles away',
    turnaround: '48-hour delivery',
    rating: 4.9,
    reviews: 87,
    verifiedBadge: 'Master Adaptive Certified',
    specialties: ['Magnetic Snap Retrofits', 'Side Seam Zipper Conversions', 'Wheelchair Rise Adjustments'],
    phone: '(555) 349-2910',
    isOpen: true
  },
  {
    id: 'tailor-2',
    name: 'Sensory-Friendly Stitch Studio',
    address: '88 Harmony Way, District 4',
    distance: '3.8 miles away',
    turnaround: '24-48 hours',
    rating: 5.0,
    reviews: 64,
    verifiedBadge: 'Sensory & Hypoallergenic Specialist',
    specialties: ['Tagless Conversions', 'Flat-Felled Seam Binding', 'Soft Waistband Retrofitting'],
    phone: '(555) 782-9014',
    isOpen: true
  },
  {
    id: 'tailor-3',
    name: 'Metro Mobility Tailoring Co.',
    address: '305 Central Avenue, Floor 1',
    distance: '4.5 miles away',
    turnaround: '48 hours',
    rating: 4.8,
    reviews: 112,
    verifiedBadge: 'Wheelchair Biomechanics Certified',
    specialties: ['Seated Gusset Insertions', 'Catheter Access Ports', 'Breakaway Jacket Alterations'],
    phone: '(555) 431-7789',
    isOpen: true
  }
]
