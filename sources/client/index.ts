import { SHARED_CONSTANTS } from '@shared/constants';
import './helpers/browser';

mp.events.add('playerReady', () => {
  mp.console.logInfo(`${mp.players.local.name} is ready!`);
  mp.console.logInfo(SHARED_CONSTANTS.HELLO_WORLD);

  mp.players.local.customProperty = 1;
  mp.console.logInfo(`customProperty: ${mp.players.local.customProperty}`);

  mp.players.local.customMethod = () => {
    mp.console.logInfo(`customMethod called.`);
  };

  mp.players.local.customMethod();
});

mp.events.add('auth:submit', (username: string) => {
  mp.console.logInfo(`CEF запрос авторизации: ${username}`);
  mp.events.callRemote('server:auth', username);
});

mp.events.add('client:authResult', (json: string) => {
  const result = JSON.parse(json);
  mp.console.logInfo(`Auth result: ${result.success ? 'OK' : 'FAIL'} / ${result.username}`);
});
