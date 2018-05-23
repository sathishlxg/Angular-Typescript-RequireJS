export class User {
    status: number;
    firstName: string;
    lastName: string;
    startDate: string;
    department: string;
    requestStatus: string;
    actions: number;
    address: Address;
    identities: Identity[];
    orgAssociations: OrgAssociations[];

    constructor() {
        this.address = new Address();
        this.identities = [];
        this.orgAssociations = [];
    }
}

export class Address {
    id: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    zipExtension: string;
    countryCode: string;
}

export class OrgAssociations {
    organizationCode: string;
    organization: Organization;
    constructor() {
        this.organization = new Organization();
    }
}

export class Organization {
    code: string;
    name: string;
    buySellInd: boolean;
}

export class Identity {
    value: string;
    type: string;
    countryCode: string;
}
