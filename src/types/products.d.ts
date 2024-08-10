export interface Products {
    id: string
    code: string
    name: string
    description: string
    kind: string
    classification: string
    product_category: {
        id: string
        code: string
        name: string
        description: string
    }
    product_family: {
        id: string
        code: string
        name: string
        description: string
    }
    measurement_unit: {
        id: string
        code: string
        name: string
        description: string
    }
    product_controller: {
        stock_management: boolean
        minimun_stock: number
        maximun_stock: number
    }
    product_locations: Array<{
        location: {
            id: string
            code: string
            name: string
            description: string
        }
        product_stocks: Array<{
            period: string
            available_stock: number
            reserved_stock: number
            total_stock: number
            consumed_stock: number
        }>
    }>
    barcodes: Array<string>
    state: string
}