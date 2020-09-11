import { KalturaClient } from "kaltura-typescript-client";
import { KalturaSessionType } from "kaltura-typescript-client/api/types/KalturaSessionType";
import { SessionStartAction } from "kaltura-typescript-client/api/types/SessionStartAction";

global.XMLHttpRequest = require("xhr2");

const config = {
  clientTag: "Kaltura_typescript_testing",
  endpointUrl: "http://www.kaltura.com",
};
const client = new KalturaClient(config);

export const startKalturaSession = async (
  adminSecret: string,
  userSecret: string,
  partnerId: number
): Promise<boolean> => {
  try {
    const session = await client.request(
      new SessionStartAction({
        partnerId,
        secret: adminSecret,
        userId: userSecret,
        type: KalturaSessionType.admin,
      })
    );

    if (!session) {
      console.log("Failed to start kaltura session");

      return false;
    }

    client.setDefaultRequestOptions({ ks: session });

    console.log(`Kaltura session:\n${session}`);

    return true;
  } catch (error) {
    console.log(`Kaltura session error: \n ${error}`);
    return false;
  }
};
