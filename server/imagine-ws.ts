import { Midjourney } from "../src";
import "dotenv/config";

export async function imagineScenario(
  serverId: string,
  channelId: string,
  salaiToken: string,
  huggingFaceToken: string,
  scenario: string
) {
  if (!salaiToken) {
    throw new Error('SalaiToken is not provided');
  }
  const client = new Midjourney({
    ServerId: serverId,
    ChannelId: channelId,
    SalaiToken: salaiToken,
    HuggingFaceToken: huggingFaceToken,
    Ws: true,
  });

  await client.Connect();

  const Imagine = await client.Imagine(scenario, (uri: string, progress: string) => {
    console.log("Imagine.loading", uri, "progress", progress);
  });

  

  if (!Imagine) {
    return;
  }

  const Upscale = await client.Upscale({
    index: 2,
    msgId: <string>Imagine.id,
    hash: <string>Imagine.hash,
    flags: Imagine.flags,
    loading: (uri: string, progress: string) => {
      console.log("Upscale.loading", uri, "progress", progress);
    },
  });

  

  //return uri from Upscale
  if (Upscale){
    const uri = Upscale.uri;
    console.log({ uri });
    return uri;
  }
 


  client.Close();
}

