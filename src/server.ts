import { app } from './app';
import { sequelize } from './database';

const PORT = 3000;

app.listen(PORT | 3000, () => {
  sequelize.authenticate().then(() => {
    console.log(`DB connection successfull.`);
  });

  console.log(`Server started successfuly at port ${PORT}.`);
});
