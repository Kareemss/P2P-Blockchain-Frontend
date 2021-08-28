export interface blockInterface {
    Index: number,
    Timestamp: string,
    PrevHash: string,
    Hash: string,
    AllData: dataInterface,
    IsGenesis: boolean

}


export interface dataInterface {
    Isuuer: string,
    Seller: string,
    Buyer: string,
    Amount: number,
    Price: number
}

export class Data {
    Issuer!: string
    Seller!: string
    Buyer!: string
    Amount!: number
    Price!: number
}

export class User{
    FullName!: string
    ID!: string
    PhoneNumber!: number
    Email!: string
    UserName!: string
    SmartMeterNumber!: number
    PasswordHash!: string   
}