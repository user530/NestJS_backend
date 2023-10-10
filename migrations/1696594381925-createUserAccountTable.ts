import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUserAccountTable1696594381925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'account',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'salt',
                        type: 'varchar',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'profileId',
                        type: 'int',
                        // isNullable: true,
                    },
                ]
            })
        );

        await queryRunner.createForeignKey('account',
            new TableForeignKey({
                name: 'accountFK',
                columnNames: ['profileId'],
                referencedTableName: 'profile',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('account', 'accountTableFK');

        await queryRunner.dropTable('account');
    }

}
