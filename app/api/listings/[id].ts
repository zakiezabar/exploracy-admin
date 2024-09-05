// Import necessary types from Next.js
import type { NextApiRequest, NextApiResponse } from 'next';
// Import the Prisma client instance
import { PrismaClient } from '@prisma/client';

// Create an instance of the Prisma client
const prisma = new PrismaClient();

// Define the API route handler function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get the listing ID from the request query parameters
  const { id } = req.query;

  if (req.method === 'PUT') {
    // Destructure the fields to be updated from the request body
    const { title, description, price, imageSrc, category, guestCount, locationValue } = req.body;

    // Validate required fields
    if (!title || !description || !price || !imageSrc || !category || !guestCount || !locationValue) {
      res.status(400).json({ error: 'Title, description, price, imageSrc, category, guestCount, and locationValue are required' });
      return;
    }

    try {
      // Update the listing in the database
      const updatedListing = await prisma.listing.update({
        where: { id: String(id) },
        data: {
          title,
          description,
          price,
          imageSrc,
          category,
          guestCount,
          locationValue,
        },
      });
      // Respond with the updated listing and a 200 status code
      res.status(200).json(updatedListing);
    } catch (error) {
      console.error(error);
      // Respond with a 500 status code if an error occurs
      res.status(500).json({ error: 'Unable to update listing' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Delete the listing from the database
      const deletedListing = await prisma.listing.delete({
        where: { id: String(id) },
      });
      // Respond with the deleted listing and a 200 status code
      res.status(200).json(deletedListing);
    } catch (error) {
      console.error(error);
      // Respond with a 500 status code if an error occurs
      res.status(500).json({ error: 'Unable to delete listing' });
    }
  } else {
    // Respond with a 405 status code if the request method is not allowed
    res.status(405).json({ error: 'Method not allowed' });
  }
};

// Export the handler as the default export
export default handler;
