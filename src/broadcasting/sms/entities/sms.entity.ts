import * as moment from 'moment';

export class SMS {
  id?: string;
  created_by?: string;
  created_at?: Date; 
  phone: string;
  message: string;
}
