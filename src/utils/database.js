import Dexie from 'dexie';
import {Painting} from '../model/painting';

const database = new Dexie('PaintingsDB');
database.version(1).stores({
  paintings: '++id,strokes,dataURL',
});

database.on('populate', () => {
  console.log('populate');
  const paintingsFromLS = localStorage.getItem('paintings');
  if (paintingsFromLS) {
    const paintings = JSON.parse(paintingsFromLS || '[]')
        .map((p) => new Painting(p));
    localStorage.setItem('paintings', null);
    database.paintings.bulkAdd(paintings);
  }
});
database.paintings.mapToClass(Painting);

export const databaseInit = () => {
  if (!database.isOpen()) {
    database.open()
        .then((db) => {
          console.log(`DB successfule opened. Version ${db.verno}`);
          return db;
        })
        .catch(function(err) {
          console.error('Failed to open db: ' + (err.stack || err));
        });
  }
};

databaseInit();

export default database;
