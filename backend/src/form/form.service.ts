import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity'; 

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) 
    private formRepository: Repository<Form>,
  ) {}

  async create(data: Partial<Form>): Promise<Form> {
    const newEntry = this.formRepository.create(data); 
    return this.formRepository.save(newEntry); 
  }
}