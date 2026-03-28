import path from 'path';
import { config } from 'dotenv';

config({
  quiet: true,
  path: path.resolve('.env')
});
