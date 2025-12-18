import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('customers')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  firstName: string | null; 

  @Column({ nullable: true, type: 'varchar' })
  lastName: string | null; 

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ 
    nullable: true,
    type: 'varchar', 
    length: 255 
  })
  password: string | null; 

  @Column({ 
    nullable: true, 
    type: 'varchar' 
  })
  companyName: string | null; 
  
 @Column({ 
    nullable: true, 
    type: 'varchar',
    length: 50
  })
  phoneNumber: string | null; 

  @Column({ 
    nullable: true, 
    type: 'varchar', 
    length: 500 
  })
  resetPasswordToken: string | null;

  @Column({ 
    nullable: true, 
    type: 'timestamp with time zone' 
  })
  resetPasswordExpires: Date | null; 

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}