import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pesquisas')
@Unique(["cd_pesquisa"])
export class Pesquisa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cd_pesquisa: string;

  @Column('float')
  nr_nota1: number;

  @Column('float')
  nr_nota2: number;

  @Column('float')
  nr_media: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  dt_criado: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  dt_editado: Date;
}
