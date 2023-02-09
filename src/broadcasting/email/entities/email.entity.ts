import * as moment from 'moment';

export class Email {
  id?: string;
  created_by?: string;
  created_at?: Date; 
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  messageContent: string;
}
