import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { UserInfo } from './entities/idm.entity';

@Injectable()
export class IdmService {
  supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const baseUrl = this.configService.get<string>('SUPABASE_URL');
    const apiKey = this.configService.get<string>('SUPABASE_KEY');
    this.supabase = createClient(baseUrl, apiKey);
  }

  async createUser(payload: UserInfo) {
    const result = await this.checkExistingEmail(payload.email);
    if (result.error) {
      return result;
    }

    const code = Buffer.from(payload.email, 'base64').toString('binary');
    const { data, error } = await this.supabase.auth.admin.createUser({
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
      user_metadata: {
        code: 'OWE-KEY',
        token: code,
        name: payload.name,
        role: payload.role,
        phone: payload.phone,
        email: payload.email,
        created_by: payload.created_by,
        permissions: payload.permissions,
        avatar: payload.avatar,
        driverPay: payload.driverPay ?? 0,
      },
    });

    if (data.user) {
      await this.supabase.auth.admin.inviteUserByEmail(data.user.email);
    }
    return {
      data: data.user,
      error: error?.message,
    };
  }

  async checkExistingEmail(email: string) {
    const { data, error } = await this.supabase
      .from('userInfos')
      .select('*')
      .ilike('email', email.trim())
      .limit(1);

    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    return {
      data: null,
      error: data.length
        ? `This user email "${email}" is already taken.`
        : null,
    };
  }

  async update(id: string, payload: Partial<UserInfo>) {
    if (payload.email) {
      const code = Buffer.from(payload.email, 'base64').toString('binary');
      const { data: user, error } = await this.supabase.auth.admin.updateUserById(
        id,
        {
          email: payload.email,
          phone: payload.phone,
          user_metadata: {
            code: 'OWE-KEY',
            token: code,
            name: payload.name,
            role: payload.role,
            phone: payload.phone,
          },
        },
      );
      if (error) {
        return {
          data: user,
          error,
        };
      }
    }
    const res = await this.supabase
      .from('userInfos')
      .update(payload)
      .match({ id }).select('*');
    return {
      data: res.data,
      error: res.error,
    };
  }

  async remove(id: string) {
    const res = await this.supabase
      .from('userInfos')
      .delete()
      .match({ id });
    if (res.error) {
      return {
        data: res.data,
        error: res.error,
      };
    }
    const { data: user, error } = await this.supabase.auth.admin.deleteUser(id);
    return {
      data: user,
      error,
    };
  }
}
