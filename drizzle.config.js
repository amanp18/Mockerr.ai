/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:ucHoBigQm6x2@ep-muddy-firefly-a17yhpnh.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    }
  };