import { NextResponse } from 'next/server';

const categories = [
  {
    label: 'Outdoor adventures',
    icon: '/images/icon-Outdoor.png',
    description: 'Hiking, camping, rock or mountain climbing'
  },
  {
    label: 'Water activities',
    icon: '/images/icon-Water wanderer.png',
    description: 'Kayaking, surfing, diving, fishing'
  },
  {
    label: 'Sports and games',
    icon: '/images/icon-Sports.png',
    description: 'Football, basketball, paintball, badminton'
  },
  {
    label: 'Fitness and wellbeing',
    icon: '/images/icon-Fitness.png',
    description: 'Yoga, pilates, meditation, boot camps, gym'
  },
  {
    label: 'Cultural and Educational',
    icon: '/images/icon-Fitness.png',
    description: 'Historical tours, museum, webinar'
  },
];

export async function GET() {
  return NextResponse.json(categories);
}