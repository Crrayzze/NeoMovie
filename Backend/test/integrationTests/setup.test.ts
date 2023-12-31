import { before, after } from "mocha";

import server from "infrastructure/app";
import { TestSetupUtils } from "../utils/setup.utils";

before(async () => {
	await server.ready();
	await TestSetupUtils.testInitSPI();
});

after(async () => {
	// await server.close();
});
