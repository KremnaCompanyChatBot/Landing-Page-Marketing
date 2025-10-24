import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/analytics') 
export class AnalyticsController {

  @Get('records') 
  getRecords() {
    return [
      {
        event_name: 'cta_click',
        page_url: '/landing',
        event_label: 'Sign Up Button',
        count: 52,
        created_at: '2025-10-22T10:00:00Z',
      },
      {
        event_name: 'form_submit',
        page_url: '/landing',
        event_label: 'Register Form',
        count: 18,
        created_at: '2025-10-22T11:00:00Z',
      },
      {
        event_name: 'page_view',
        page_url: '/landing',
        event_label: 'Homepage View',
        count: 150,
        created_at: '2025-10-22T09:00:00Z',
      },
    ];
  }
}