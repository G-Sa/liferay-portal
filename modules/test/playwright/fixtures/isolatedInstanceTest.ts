import { mergeTests } from "@playwright/test";
import { backendPageTest } from "./backendPageTest";
import { ApiHelpers } from "../helpers/ApiHelpers";


const test = mergeTests(backendPageTest);


const isolatedInstanceTest = test.extend<{
    instance: Instance;
}>({
    instance: [
    async ({backendPage}, use) => {
        await backendPage.goto('/');

        const apiHelpers = new ApiHelpers(backendPage);


        let instance: Instance;

        try {
            // Create instance
            instance = await apiHelpers.headlessInstance.createInstance(
                {
                    admin: {
                        emailAddress: 'test@liferay.com',
                        givenName: 'Test',
                        familyName: 'Test',
                    },
                    domain: 'test-virtual-host-1.com',
                    virtualHost: 'test-virtual-host-1.com',
                    portalInstanceId: 'test-virtual-host-1.com'
                }
            );

            await use(instance);
        }
        catch {
            throw new Error(
                `Isolated instance could not be created, the default instance will be used instead`
            );
        }
        finally {
            // Delete the instance
            if (instance?.portalInstanceId) {
                await apiHelpers.headlessInstance.deleteInstance(instance.portalInstanceId);
            }
        }
    },
    {auto: true},
],
});

export {isolatedInstanceTest};