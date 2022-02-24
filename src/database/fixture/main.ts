import { createConnection } from 'typeorm';
import { UserFixture } from './data/user';
import { Fixture } from './interface';

// 以下のarrayに実行用のfixtureのclassを追加してください
const fixtureLists: Fixture[] = [new UserFixture()];

(async () => {
  const connection = await createConnection();
  try {
    await connection.manager.transaction(async (manager) => {
      for (const fixture of fixtureLists) {
        await fixture.run(manager);
      }
    });
    connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
