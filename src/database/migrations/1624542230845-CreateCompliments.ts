import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompliments1624542230845 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'compliments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'user_sender',
            type: 'uuid',
          },
          {
            name: 'user_receiver',
            type: 'uuid',
          },
          {
            name: 'tag_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamps',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamps',
            default: 'now()',
          }
        ],
        foreignKeys: [
          {
            name: 'FKUserSenderCompliments',
            columnNames: ['user_sender'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKUserRevicerCompliments',
            columnNames: ['user_receiver'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKTagCompliments',
            columnNames: ['tag_id'],
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('compliments');
  }
}
