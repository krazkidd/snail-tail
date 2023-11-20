import { Config } from './config';

import { UserAvatar } from './user-avatar';
import { TailAvatar } from './tail-avatar';

export const DATA_KEY = {
  ERROR_CODE: 'errorCode',
  MESSAGE: 'message',
};

export const AVATARS_USER: Record<string, UserAvatar> = {
  '1f3c3': {
    name: 'Running Person 1',
    icon: '1f3c3',
  },
  '1f3c3-1f3fb': {
    name: 'Running Person 2',
    icon: '1f3c3-1f3fb',
  },
  '1f3c3-1f3fb-200d-2640-fe0f': {
    name: 'Running Person 3',
    icon: '1f3c3-1f3fb-200d-2640-fe0f',
  },
  '1f3c3-1f3fb-200d-2642-fe0f': {
    name: 'Running Person 4',
    icon: '1f3c3-1f3fb-200d-2642-fe0f',
  },
  '1f3c3-1f3fc': {
    name: 'Running Person 5',
    icon: '1f3c3-1f3fc',
  },
  '1f3c3-1f3fc-200d-2640-fe0f': {
    name: 'Running Person 6',
    icon: '1f3c3-1f3fc-200d-2640-fe0f',
  },
  '1f3c3-1f3fc-200d-2642-fe0f': {
    name: 'Running Person 7',
    icon: '1f3c3-1f3fc-200d-2642-fe0f',
  },
  '1f3c3-1f3fd': {
    name: 'Running Person 8',
    icon: '1f3c3-1f3fd',
  },
  '1f3c3-1f3fd-200d-2640-fe0f': {
    name: 'Running Person 9',
    icon: '1f3c3-1f3fd-200d-2640-fe0f',
  },
  '1f3c3-1f3fd-200d-2642-fe0f': {
    name: 'Running Person 10',
    icon: '1f3c3-1f3fd-200d-2642-fe0f',
  },
  '1f3c3-1f3fe': {
    name: 'Running Person 11',
    icon: '1f3c3-1f3fe',
  },
  '1f3c3-1f3fe-200d-2640-fe0f': {
    name: 'Running Person 12',
    icon: '1f3c3-1f3fe-200d-2640-fe0f',
  },
  '1f3c3-1f3fe-200d-2642-fe0f': {
    name: 'Running Person 13',
    icon: '1f3c3-1f3fe-200d-2642-fe0f',
  },
  '1f3c3-1f3ff': {
    name: 'Running Person 14',
    icon: '1f3c3-1f3ff',
  },
  '1f3c3-1f3ff-200d-2640-fe0f': {
    name: 'Running Person 15',
    icon: '1f3c3-1f3ff-200d-2640-fe0f',
  },
  '1f3c3-1f3ff-200d-2642-fe0f': {
    name: 'Running Person 16',
    icon: '1f3c3-1f3ff-200d-2642-fe0f',
  },
  '1f3c3-200d-2640-fe0f': {
    name: 'Running Person 17',
    icon: '1f3c3-200d-2640-fe0f',
  },
  '1f3c3-200d-2642-fe0f': {
    name: 'Running Person 18',
    icon: '1f3c3-200d-2642-fe0f',
  },
};

export const AVATARS_TAIL: Record<string, TailAvatar>  = {
  '1f40c': {
    name: 'Snail',
    icon: '1f40c',
    // Archie (world record)
    velocity_kph: 0.048,
  },
  '1f422': {
    name: 'Tortoise',
    icon: '1f422',
    velocity_kph: 0.643
  },
  '1f406': {
    name: 'Leopard',
    icon: '1f406',
    // max
    //velocity_kph: 58.0,
    velocity_kph: 20.0,
  },
};

export const CONFIG_DEFAULT: Config = {
  userName: 'User',
  userIcon: AVATARS_USER['1f3c3'].icon,
  userStrideLength_m: 1.0,

  tailName: AVATARS_TAIL['1f40c'].name,
  tailIcon: AVATARS_TAIL['1f40c'].icon,

  initialLead_km: 1.0,
};
