import { init as server }  from './server';
import { init as mongodb } from './mongodb';

// initialize MongoDB and Express server with GraphQl
server();
mongodb();