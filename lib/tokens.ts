import { v4 as uuidv4 } from 'uuid'; 

import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  // Fetch the user by email to get the userId
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Use userId when creating the password reset token
  
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
      userId: user.id,
    }
  });

  return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  // Fetch the user by email to get the userId
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
      userId: user.id,
    }
  });

  return verificationToken;
};