import { MigrationInterface, QueryRunner } from 'typeorm'

// Ciração da tabela users usando query SQL
export class createTableUsers1668795787249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE users (id UUID PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, accountId UUID, FOREIGN KEY (accountId) REFERENCES accounts(id))',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users')
  }
}
