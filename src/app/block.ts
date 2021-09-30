export interface blockInterface {
    Index: number,
    Timestamp: string,
    PrevHash: string,
    Hash: string,
    AllData: dataInterface,
    IsGenesis: boolean

}


export interface dataInterface {
    OrderID: string,
    Isuuer: string,
    Seller: string,
    Buyer: string,
    Amount: number,
    Price: number
}

export class Order {
    OrderID!: number
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
    Address!: string
    PasswordHash!: string
    EnergyBalance!: number
    CurrencyBalance!: number 
    CompletedTransaction!: number  
}
export class DeleteQuery{
    Database!:     string
	Collection!:   string
	Query!:        string
	Condition!:   any
	DeletionType!: number
}
export class UpdateBalanceQuery{
	Email!:   string
	Asset!:   string
	Balance!: number
}