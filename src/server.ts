import { app } from "./app";
import { sequelize } from "./database";

const PORT = parseInt(process.env.PORT || "3000");

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log(`DB connection successfull.`);
  });

  console.log(`Server started successfuly at port ${PORT}.`);
});
