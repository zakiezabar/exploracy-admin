// Import necessary types from Next.js
import type { NextApiRequest, NextApiResponse } from 'next';
// Import the Prisma client instance
import { PrismaClient } from '@prisma/client';

// Create an instance of the Prisma client
const prisma = new PrismaClient();

// Define the API route handler function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Destructure required fields from the request body
    const { title, description, userId, price, imageSrc, category, guestCount, locationValue } = req.body;
    // Validate required fields
    if (!title || !description || !userId || !price || !imageSrc || !category || !guestCount || !locationValue) {
      res.status(400).json({ error: 'Title, description, userId, price, imageSrc, category, guestCount, and locationValue are required' });
      return;
    }
    try {
      // Create a new listing in the database
      const newListing = await prisma.listing.create({
        data: {
          title,
          description,
          userId,
          price,
          imageSrc,
          category,
          guestCount,
          locationValue,
          createdAt: new Date(), // Ensure createdAt is set
        },
      });
      // Respond with the created listing and a 201 status code
      res.status(201).json(newListing);
    } catch (error) {
      // console.error(error);
      // Respond with a 500 status code if an error occurs
      res.status(500).json({ error: 'Unable to create listing' });
    }
  } else if (req.method === 'GET') {
    try {
      // Fetch all listings from the database, including the user relation
      const listings = await prisma.listing.findMany({
        include: {
          user: true,
        },
      });
      // Respond with the fetched listings and a 200 status code
      res.status(200).json(listings);
    } catch (error) {
      // console.error(error);
      // Respond with a 500 status code if an error occurs
      res.status(500).json({ error: 'Unable to fetch listings' });
    }
  } else {
    // Respond with a 405 status code if the request method is not allowed
    res.status(405).json({ error: 'Method not allowed' });
  }
};

// Export the handler as the default export
export default handler;
