import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

const hashKey = 'JKHIUBklnfoiHnoihouBKhoinlknpeap7897NI98HHF98FSDF8';

@Injectable()
export class AuthOneService {
	supabase: SupabaseClient;
	driverAuth: {
		email: string;
		password: string;
	};
	clientAuth: {
		email: string;
		password: string;
	};

	constructor(private configService: ConfigService) {
		const baseUrl = this.configService.get<string>('SUPABASE_URL');
		const apiKey = this.configService.get<string>('SUPABASE_KEY');
		this.supabase = createClient(baseUrl, apiKey);
		this.driverAuth = {
			email: this.configService.get<string>('SINGLE_DRIVER_PWD'),
			password: this.configService.get<string>('SINGLE_DRIVER_PWD')
		};
		this.clientAuth = {
			email: this.configService.get<string>('SINGER_CLIENT_EMAIL'),
			password: this.configService.get<string>('SINGLE_CLIENT_PWD')
		};
	}

	async signInDriver(payload: { key: string; code: string }) {
		const { data, error } = await this.checkLoginRecordExists(payload.key, payload.code);
		if (error) {
			return { error };
		}
		if (data) {
			return await this.signIn(this.driverAuth.email, this.driverAuth.password);
		}
		return await this.signIn(payload.key, payload.code);
	}

	async signInClient(payload: { key: string; code: string }) {
		const { data, error } = await this.checkLoginRecordExists(payload.key, payload.code);
		if (error) {
			return { error };
		}
		if (data) {
			return await this.signIn(this.clientAuth.email, this.clientAuth.password);
		}
		return await this.signIn(payload.key, payload.code);
	}

	async signIn(email: string, password: string) {
		const auth = await this.supabase.auth.signInWithPassword({ email, password });
		if (auth.data.session) {
			return {
				data: { ...auth.data.session },
				error: null
			};
		}
		return {
			error: auth.error
		};
	}


	async checkLoginRecordExists(key: string, code: string) {
		const hash = createHmac('sha256', hashKey);
		hash.update(code);
		const value = hash.digest('hex');

		return await this.supabase.from('customauths').select().eq('id', key).eq('otpcode', value);
	}
}
