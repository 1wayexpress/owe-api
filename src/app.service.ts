import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const baseUrl = this.configService.get<string>('SUPABASE_URL');
    const apiKey = this.configService.get<string>('SUPABASE_KEY');
    this.supabase = createClient(baseUrl, apiKey);
  }

  getData(): { message: string } {
    return { message: 'Welcome to OWE api!' };
  }

  getConfigs() {
    const baseUrl = this.configService.get<string>('SUPABASE_URL');
    const apiKey = this.configService.get<string>('SUPABASE_KEY');
    return {
      baseUrl,
      apiKey
    };
  }
}