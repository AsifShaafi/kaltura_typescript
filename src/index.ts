import { startKalturaSession } from "./util/kalturaService";

import * as env from 'dotenv';

const run = async () => {
  console.log("This project is for testing the Kaltura TypeScript library");

  env.config();

  const adminSecret = process.env.adminSecret;
  const userSecret = process.env.userSecret;
  const partnerId = process.env.partnerId;

  if (!adminSecret || !userSecret || !partnerId) {
    console.log(
      "Please check your Kaltura credentials in .env file and try again"
    );
    return;
  }

  const sessionStarted = await startKalturaSession(
    adminSecret,
    userSecret,
    Number(partnerId)
  );

  if (sessionStarted) {
    console.log("Successfully got the kaltura session");
  } else {
    console.log("Failed to get the kaltura session token");
  }
};

run();
