import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserProfileTable1696594344536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'profile',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                    },
                    {
                        name: 'phone',
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
                    // {
                    //     name: 'accountId',
                    //     type: 'int',
                    // },
                ],
            })
        );

        // await queryRunner.createForeignKey('profile',
        //     new TableForeignKey({
        //         name: 'profileFK',
        //         columnNames: ['accountId'],
        //         referencedColumnNames: ['id'],
        //         referencedTableName: 'account',
        //         onDelete: 'CASCADE',
        //     }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropForeignKey('profile', 'profileFK');

        await queryRunner.dropTable('profile');
    }


}
