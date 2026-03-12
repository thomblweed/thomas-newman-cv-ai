export interface Role {
  type: string;
  company: string;
  client?: string;
  title: string;
  period_start: string;
  period_end?: string;
  duration_months: number;
  employment_type: string;
  end_reason?: string;
  industry?: string;
  ownership?: string;
  tags?: Array<string>;
  seniority?: string;
  responsibilities_count?: number;
  achievements_count?: number;
  promotion?: string;
  tech_stack?: Array<string>;
  content: string;
}
