import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const updatedReservation = await prisma.reservation.update({
        where: { id: String(id) },
        data: { status: 'accepted' },
      });
      res.status(200).json(updatedReservation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to approve reservation' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
