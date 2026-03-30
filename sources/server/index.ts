import './setup';

import { SHARED_CONSTANTS } from '@shared/constants';
import { db, getUserByName, initDatabase } from './db';

mp.events.add({
  packagesLoaded: async () => {
    console.log('Серверная часть успешно инициализирована');
    console.log(`HELLO_WORLD: ${SHARED_CONSTANTS.HELLO_WORLD}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV ?? 'development'}`);
    console.log(`DB connection: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

    try {
      await initDatabase();
      const sampleUser = await db
        .selectFrom('users')
        .select(['id', 'name', 'email'])
        .limit(1)
        .executeTakeFirst();

      console.log('Пример запроса к БД:', sampleUser ?? 'нет пользователей');
    } catch (error) {
      console.error('Ошибка базы данных:', error);
    }
  },

  playerJoin: async (player: PlayerMp) => {
    console.log(`${player.name} присоединился к серверу!`);

    const user = await getUserByName(player.name);
    if (user) {
      console.log(`Пользователь найден: ${user.name} / ${user.email}`);
      return;
    }

    await db.insertInto('users').values({
      name: player.name,
      email: `${player.name.toLowerCase()}@example.com`
    }).execute();

    console.log(`Создан новый пользователь ${player.name} в таблице users`);
  }
});

mp.events.add('server:auth', async (player: PlayerMp, username: string) => {
  console.log(`Запрошена авторизация от ${player.name}: ${username}`);

  let user = await getUserByName(username);
  if (!user) {
    await db.insertInto('users').values({
      name: username,
      email: `${username.toLowerCase()}@example.com`
    }).execute();

    user = await getUserByName(username);
    console.log(`Создан пользователь ${username}`);
  }

  console.log(`Авторизация завершена для ${username}`);
  // Если нужно отправить результат обратно клиенту, можно использовать серверное событие клиента.
  // Например: player.call('client:authResult', JSON.stringify({ success: true, username: user?.name }));
});
