import path from "node:path";
import { fileURLToPath } from "node:url";
import { CanIEmailMapsBuilder } from "./can-i-email-maps-builder";
import { fetchCanIEmailData } from "./fetch-can-i-email-data";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MAPS_DIR = path.resolve(__dirname, "./__generated_maps__");

async function run() {
  const builder = new CanIEmailMapsBuilder();
  const data = await fetchCanIEmailData();

  await builder.processItems(data).supplementMissingProperties().saveTo(MAPS_DIR);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
