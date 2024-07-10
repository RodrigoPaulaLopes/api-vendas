import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddIdCustomerToOrders1718470028264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'customer_id',
                type: 'uuid',
                isNullable: true,

            })
        )

        await queryRunner.createForeignKey('orders', {
            name: 'OrdersCustomer',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers',
            onDelete: 'SET NULL',
            clone: function (): TableForeignKey {
                throw new Error("Function not implemented.");
            }
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersCustomer')
        await queryRunner.dropColumn('orders', 'customer_id')
    }

}
