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
    const { data: user, error: errorMsg } =
      await this.supabase.auth.api.createUser({
        email: payload.email,
        password: payload.password,
        user_metadata: {
          code: 'OWE-KEY',
          token: code,
          name: payload.name,
          role: payload.role,
        },
      });
    if (!errorMsg) {
      await this.supabase.auth.api.inviteUserByEmail(user.email);
      const res = await this.supabase.from('userInfos').insert([
        {
          id: user.id,
          name: payload.name,
          created_by: payload.created_by,
          phone: payload.phone,
          role: payload.role,
          email: payload.email,
          permissions: payload.permissions,
          avatar: payload.avatar,
          driverPay: payload.driverPay ?? 0,
        },
      ]);
      return {
        data: res.data,
        error: res.error,
      };
    }
    return {
      data: user,
      error: errorMsg,
    };
  }

  async checkExistingEmail(email: string) {
    const { data, error } = await this.supabase
      .from<UserInfo>('userInfos')
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

  async findAll() {
    const res = await this.supabase.from<UserInfo>('userInfos');
    return {
      data: res.data,
      error: res.error,
    };
  }

  async findOne(id: string) {
    const userInfo = await this.supabase
      .from<UserInfo>('userInfos')
      .select()
      .eq('id', id)
      .single();
    return {
      data: userInfo.data,
      error: userInfo.error,
    };
  }

  async update(id: string, payload: Partial<UserInfo>) {
    if (payload.email) {
      const code = Buffer.from(payload.email, 'base64').toString('binary');
      const { data: user, error } = await this.supabase.auth.api.updateUserById(
        id,
        {
          email: payload.email,
          user_metadata: {
            code: 'OWE-KEY',
            token: code,
            name: payload.name,
            role: payload.role,
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
      .from<UserInfo>('userInfos')
      .update(payload)
      .match({ id });
    return {
      data: res.data,
      error: res.error,
    };
  }

  async remove(id: string) {
    const res = await this.supabase
      .from<UserInfo>('userInfos')
      .delete()
      .match({ id });
    if (res.error) {
      return {
        data: res.data,
        error: res.error,
      };
    }
    const { data: user, error } = await this.supabase.auth.api.deleteUser(id);
    return {
      data: user,
      error,
    };
  }
}
