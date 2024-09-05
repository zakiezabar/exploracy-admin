export type SelectUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image?: string | null;
  createdAt: Date | string;
  role: string;
  listings: number;
  reservations: number;
  posts: number;
  comments: number;
  badges: string[];
  points: number;
};

export type SelectListing = {
  id: string;
  title: string | null;
  description: string | null;
  imageSrc: string | null;
  createdAt: Date | string;
  category: string;
  questCount: number;
  locationValue: string;
  locationDetails?: string | null;
  highlight?: string | null;
  whatsIncluded?: string | null;
  requirement?: string | null;
  difficulty?: string | null;
  userId: string;
  price: number;
  public: boolean;
  capacityLimit?: number | null;
};