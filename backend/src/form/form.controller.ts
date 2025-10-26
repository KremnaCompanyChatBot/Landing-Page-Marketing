import { Controller, Post, Body } from '@nestjs/common';
import { FormService } from './form.service'; // FormService'i dahil et

@Controller('api/form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  async handleFormSubmit(@Body() body: any) {
    try {
     await this.formService.create(body);
      return {
        success: true,
        message: 'Form data was successfully received and saved!',
      };
    } catch (error) {
        console.error('Save Error:', error);
        return {
            message: 'An error occurred during data recording.',
            error: error.message,
        };
    }
  }
}