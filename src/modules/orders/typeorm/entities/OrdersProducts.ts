import Product from "modules/products/typeorm/entities/product"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Order from "./Order"

@Entity('orders_products')
class OrdersProducts {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column('decimal')
    price: number

    @Column('int')
    quantity: number

    @ManyToOne(() => Product, product => product.orders_products)
    @JoinColumn({ name: "product_id" })
    product: Product


    @Column()
    product_id: string

    @Column()
    order_id: string

    @ManyToOne(() => Order, order => order.orders_products)
    @JoinColumn({ name: "order_id" })
    order: Order

    @CreateDateColumn()
    created_at?: Date
    @UpdateDateColumn()
    updated_at?: Date
}

export default OrdersProducts