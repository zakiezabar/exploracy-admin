import React from 'react';
import { getTimeOfDay } from '@/lib/utils';

const WelcomeMessage = () => {
  return <h1 className="text-2xl">{getTimeOfDay()}, </h1>;
};

export default WelcomeMessage;
