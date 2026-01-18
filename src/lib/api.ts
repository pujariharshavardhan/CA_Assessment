// Blog API layer for TanStack Query
// Connects to JSON Server at http://localhost:3001 in production

export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
  author?: string;
  readTime?: string;
}

// New mock data with different topics
const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "The Art of Slow Travel",
    category: ["TRAVEL", "LIFESTYLE"],
    description: "Discovering the beauty of taking your time and immersing yourself in local cultures instead of rushing through destinations.",
    date: "2026-01-15T10:30:00.000Z",
    coverImage: "https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "In our fast-paced world, we often approach travel the same way we approach our daily lives—rushing from one attraction to another, checking items off a list, and barely stopping to breathe.\n\nSlow travel offers a different philosophy. It's about staying longer in fewer places, connecting with locals, and truly experiencing a destination rather than just passing through it.\n\nPrinciples of slow travel:\n\n1. Stay Longer - Spend weeks instead of days in each location\n2. Live Like a Local - Shop at local markets, eat where locals eat\n3. Skip the Tourist Traps - Discover hidden gems through local recommendations\n4. Embrace Uncertainty - Let go of rigid itineraries\n5. Connect Deeply - Learn basic phrases, make local friends\n\nThe rewards are immeasurable—genuine connections, unexpected discoveries, and memories that last a lifetime. When you slow down, you start to see the world differently.",
    author: "Elena Martinez",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mastering Fermentation at Home",
    category: ["FOOD", "HEALTH"],
    description: "A beginner's guide to creating your own fermented foods—from kimchi to kombucha—in your kitchen.",
    date: "2026-01-14T08:15:00.000Z",
    coverImage: "https://images.pexels.com/photos/5765844/pexels-photo-5765844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Fermentation is one of humanity's oldest food preservation techniques, and it's making a massive comeback in modern kitchens. Beyond preservation, fermented foods offer incredible health benefits and complex flavors you simply can't achieve any other way.\n\nThe science is simple: beneficial bacteria break down sugars and starches, creating probiotics, enzymes, and new flavors in the process.\n\nEssential fermented foods to try:\n\n1. Sauerkraut - Fermented cabbage, a gateway ferment\n2. Kimchi - Korean fermented vegetables with heat and umami\n3. Kombucha - Fermented tea with natural effervescence\n4. Kefir - Tangy fermented milk rich in probiotics\n5. Miso - Fermented soybean paste for depth of flavor\n6. Sourdough - The original fermented bread\n\nThe key to success is patience, cleanliness, and trusting the process. Start with sauerkraut—just cabbage and salt—and build your confidence from there.",
    author: "James Chen",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "The Psychology of Color in Design",
    category: ["TECH", "LIFESTYLE"],
    description: "Understanding how color choices influence user behavior, emotions, and brand perception in digital products.",
    date: "2026-01-13T14:00:00.000Z",
    coverImage: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Color is far more than decoration—it's a powerful communication tool that can make or break a user's experience. Understanding color psychology is essential for any designer or product creator.\n\nResearch shows that color can increase brand recognition by up to 80% and influence purchasing decisions by 85%. But the relationship between color and emotion is nuanced and culturally influenced.\n\nKey color associations in Western design:\n\n1. Blue - Trust, stability, professionalism (hence its use in finance and tech)\n2. Red - Urgency, excitement, passion (great for CTAs and sales)\n3. Green - Growth, health, nature (perfect for eco and wellness brands)\n4. Yellow - Optimism, warmth, caution (use sparingly—it can cause eye strain)\n5. Purple - Luxury, creativity, wisdom (favored by premium brands)\n6. Orange - Energy, friendliness, confidence (effective for action buttons)\n\nRemember: context matters. A color's meaning shifts based on its application, surrounding colors, and target audience. Test with real users, not assumptions.",
    author: "Sophie Williams",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Building Wealth Through Index Funds",
    category: ["FINANCE"],
    description: "Why passive investing outperforms active management and how to build a simple, effective investment portfolio.",
    date: "2026-01-12T09:45:00.000Z",
    coverImage: "https://images.pexels.com/photos/7567482/pexels-photo-7567482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "The data is clear: over any 15-year period, approximately 90% of actively managed funds underperform their benchmark index. Yet investors continue to pay high fees for active management that statistically delivers worse results.\n\nIndex investing offers a simpler, cheaper, and historically more effective approach to building wealth.\n\nThe case for index funds:\n\n1. Lower Fees - Expense ratios of 0.03% vs 1%+ for active funds\n2. Diversification - Instant exposure to hundreds or thousands of companies\n3. Tax Efficiency - Less trading means fewer taxable events\n4. Simplicity - Set it and forget it approach\n5. Time-Tested - Proven track record over decades\n\nA simple three-fund portfolio:\n\n1. Total US Stock Market Index (60-70%)\n2. International Stock Index (20-30%)\n3. Bond Index (10-20%)\n\nRebalance annually, increase bond allocation as you age, and most importantly—stay the course during market downturns. Time in the market beats timing the market.",
    author: "Michael Brooks",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "The Science of Sleep Optimization",
    category: ["HEALTH"],
    description: "Evidence-based strategies to improve your sleep quality and wake up feeling genuinely refreshed.",
    date: "2026-01-11T16:20:00.000Z",
    coverImage: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Sleep is the foundation of everything—cognitive function, emotional regulation, physical health, and longevity. Yet it's often the first thing we sacrifice when life gets busy.\n\nNeuroscience research has revealed exactly what happens during sleep and why each stage matters. Armed with this knowledge, we can optimize our sleep environment and habits.\n\nEvidence-based sleep optimization:\n\n1. Consistent Schedule - Same wake time daily, even weekends\n2. Temperature - Keep bedroom cool (65-68°F / 18-20°C)\n3. Light Exposure - Bright morning light, dim evening light\n4. Screen Curfew - No screens 1-2 hours before bed\n5. Caffeine Cutoff - No caffeine after 2pm\n6. Alcohol Awareness - It disrupts REM sleep despite feeling sedating\n7. Exercise Timing - Finish vigorous exercise 3+ hours before bed\n\nThe sleep environment matters too: blackout curtains, white noise if needed, a comfortable mattress, and a room used only for sleep and intimacy.\n\nPrioritize sleep like you prioritize nutrition and exercise—it's equally important.",
    author: "Dr. Sarah Kim",
    readTime: "6 min read"
  },
  {
    id: 6,
    title: "Minimalist Home Design Principles",
    category: ["LIFESTYLE"],
    description: "Creating spaces that breathe—how to embrace minimalism without sacrificing warmth and personality.",
    date: "2026-01-10T11:00:00.000Z",
    coverImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Minimalism isn't about living with nothing—it's about living with intention. A well-designed minimalist space feels calm and spacious while still being warm, functional, and distinctly yours.\n\nThe goal is to remove the excess so what remains can truly shine.\n\nCore principles of minimalist design:\n\n1. Quality Over Quantity - Invest in fewer, better pieces\n2. Negative Space - Let rooms breathe; not every surface needs something on it\n3. Hidden Storage - Reduce visual clutter with smart storage solutions\n4. Natural Materials - Wood, stone, linen—textures that age beautifully\n5. Intentional Color - A limited palette creates cohesion\n6. Meaningful Objects - Display only what you truly love\n\nPractical steps to get started:\n\n1. Audit each room—what do you actually use and love?\n2. Remove duplicates and 'just in case' items\n3. Create homes for everything that remains\n4. Introduce texture through textiles and natural materials\n5. Let natural light be your primary design element\n\nMinimalism is a journey, not a destination. Start small and let the peace of less guide you.",
    author: "Anna Johansson",
    readTime: "5 min read"
  }
];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const fetchBlogs = async (): Promise<Blog[]> => {
  await delay(600);
  return mockBlogs;
};

export const fetchBlogById = async (id: number): Promise<Blog> => {
  await delay(400);
  const blog = mockBlogs.find(b => b.id === id);
  if (!blog) {
    throw new Error(`Blog with id ${id} not found`);
  }
  return blog;
};

export const createBlog = async (blogData: Omit<Blog, 'id'>): Promise<Blog> => {
  await delay(600);
  const newBlog: Blog = {
    ...blogData,
    id: Math.max(...mockBlogs.map(b => b.id)) + 1,
  };
  mockBlogs.unshift(newBlog);
  return newBlog;
};
