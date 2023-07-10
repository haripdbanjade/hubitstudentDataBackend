import {Entity,Column,CreateDateColumn,PrimaryGeneratedColumn, OneToMany} from 'typeorm'
// import { StudentInfo } from './Brand'

@Entity()
export class Skills{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    title:string

    @Column()
    type:string

    // @OneToMany(()=>StudentInfo,(product)=>product.student_category,{
        
    // })
    // student_type:StudentInfo[]

    @CreateDateColumn()
    createdAt:Date


}