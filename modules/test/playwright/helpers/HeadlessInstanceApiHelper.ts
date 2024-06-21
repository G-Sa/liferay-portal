import { ApiHelpers } from "./ApiHelpers";

type TInstance = {
    admin: {
        emailAddress: string;
        familyName: string;
        givenName: string;
    };
    domain: string;
    virtualHost: string;
    portalInstanceId: string;
}


export class HeadlessInstanceApiHelper {
    readonly apiHelpers: ApiHelpers;
	readonly basePath: string;


    constructor(apiHelpers: ApiHelpers) {
		this.apiHelpers = apiHelpers;
		this.basePath = 'headless-portal-instances/v1.0';
	}

    async createInstance(instance: TInstance): Promise<Instance> {
        return this.apiHelpers.post(
            `${this.apiHelpers.baseUrl}${this.basePath}/portal-instances`,
            {data: instance}
        );
    }

    async deleteInstance(portalInstanceId: string) {
        return this.apiHelpers.delete(
            `${this.apiHelpers.baseUrl}${this.basePath}/portal-instances/${portalInstanceId}`
        );
    }

}