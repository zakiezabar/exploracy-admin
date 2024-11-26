import { randomBytes } from 'crypto';

const apiKey: string = randomBytes(32).toString('hex');
console.log('Your new API Key:', apiKey);