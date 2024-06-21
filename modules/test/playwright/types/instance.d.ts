
type Instance = {
    active: boolean;
    admin: {
        emailAddress: string;
        familyName: string;
        givenName: string;
    };
    companyId: string;
    domain: string;
    portalInstanceId: string;
    virtualHost: string;
}