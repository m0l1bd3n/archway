import './setup';

import { SHARED_CONSTANTS } from '@shared/constants';

mp.events.add({
  packagesLoaded: () => console.log('Серверная часть успешно инициализирован'),
  playerJoin: (player: PlayerMp) => console.log(`${player.name} присоединился к серверу!`)
});

console.log(SHARED_CONSTANTS.HELLO_WORLD);