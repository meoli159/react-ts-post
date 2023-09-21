import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";

const envFilePath = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFilePath });
console.log(`Loaded environment from: ${envFilePath}`);

function getDataSourceOptions(): DataSourceOptions {
  switch (process.env.NODE_ENV) {
    case "development":
      console.log("Dev case is running");
      return {
        type: "sqlite",
        database: "./development.sqlite", // Specify a different SQLite database file for development
        synchronize: true, // Auto-create tables in development (you can set this to false)
        entities: ["src/entities/*.entity.ts"],
        migrations: ["src/migration/*.ts"],
        subscribers: [],
      };
    case "test":
      return {
        type: "sqlite",
        database: "./test.sqlite", // Specify a different SQLite database file for testing
        synchronize: true, // Auto-create tables in testing (you can set this to false)
        entities: ["src/entities/*.entity.ts"],
        migrations: ["src/migration/*.ts"],
        subscribers: [],
      };
    case "production":
      return {
        type: "postgres",
        host: process.env.TYPEORM_HOST || "localhost",
        port: parseInt(process.env.TYPEORM_PORT || "5432"),
        username: process.env.TYPEORM_USERNAME || "postgres",
        password: process.env.TYPEORM_PASSWORD || "",
        database: process.env.TYPEORM_DATABASE || "postgres",
        synchronize: false, // Set false for production
        entities: ["dist/entities/*.entity.js"],
        migrations: ["dist/migration/*.js"],
        subscribers: [],
      };
    default:
      throw new Error(`Invalid NODE_ENV: ${process.env.NODE_ENV}`);
  }
}

// const dataSourceOptions: DataSourceOptions = {
//   type: "postgres",
//   host: process.env.TYPEORM_HOST || "localhost",
//   port: parseInt(process.env.TYPEORM_PORT || "5432"),
//   username: process.env.TYPEORM_USERNAME,
//   password: process.env.TYPEORM_PASSWORD,
//   database: process.env.TYPEORM_DATABASE,
//   synchronize: false, //Set false for prod
//   entities: ["src/entities/*.entity{.js,.ts}"],
//   migrations: ["src/migration/*{.js,.ts}"],
//   subscribers: [],
// };

// const AppDataSource = new DataSource(dataSourceOptions);
// export default AppDataSource;

const AppDataSource = new DataSource(getDataSourceOptions());

export default AppDataSource;
