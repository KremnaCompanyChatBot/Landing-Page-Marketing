import { Controller, Post, Body } from '@nestjs/common';
import { FormService } from './form.service'; // FormService'i dahil et

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('submit')
  async handleFormSubmit(@Body() body: any) {
    try {
      const savedEntry = await this.formService.create(body);
      
      console.log('Saved to the database:', savedEntry);

      return {
        message: 'Form data was successfully received and saved!',
        data: savedEntry,
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