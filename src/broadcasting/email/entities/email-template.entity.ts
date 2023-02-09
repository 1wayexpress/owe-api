
export class EmailTemplateConfig {
  email: string;
  subject?: string;
  templateId: string;
  templateData: { [key: string]: any };
  replyTo?: string;
}
