export interface IItem {
    id: string
    contractId: number
    description: string
    value: number
    time: string
    isImported: boolean
    createdAt: string
    updatedAt: string
    isDeleted: boolean
}

export interface IContract {
    sum: number
    items: Item[]
}
