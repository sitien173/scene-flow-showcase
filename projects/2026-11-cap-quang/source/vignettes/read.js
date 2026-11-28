import { opticalScene } from "../parts/optical-scenes.js";

export async function build(kit) {
  return opticalScene(kit, "read");
}
