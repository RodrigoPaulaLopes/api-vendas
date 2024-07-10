import Customer from "modules/customers/typeorm/entities/Customers"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import OrdersProducts from "./OrdersProducts"

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id?: string
    
    @ManyToOne(() => Customer)
    @JoinColumn({name: "customer_id"})
    customer: Customer

    @OneToMany(() => OrdersProducts, orders_products => orders_products.order)
    orders_products: OrdersProducts[]


    @CreateDateColumn()
    created_at?: Date
    @UpdateDateColumn()
    updated_at?: Date
}

export default Order