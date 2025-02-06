import { bundle } from "@adminjs/bundler";
import { adminJs } from "@/admin/config/setup";

(async () => {
    await bundle({
        componentLoader: adminJs.componentLoader,
        destinationDir: "public",
    });
})();