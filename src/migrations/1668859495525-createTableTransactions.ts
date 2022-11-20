import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createTableTransactions1668859495525
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'debited_account_id',
            type: 'uuid',
          },
          {
            name: 'credited_account_id',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'numeric',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'FKDebitedAccount',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['debited_account_id'],
            onDelete: 'SET NULL',
          },
          {
            name: 'FKCreditedAccount',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['credited_account_id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions')
  }
}
