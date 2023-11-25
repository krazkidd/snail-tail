import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'net.xericode.snail-tail',
  appName: 'Snail Tail',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
