import { track } from '@vercel/analytics';

type PortfolioEvent =
  | 'ai_assistant_fallback'
  | 'ai_assistant_open'
  | 'ai_assistant_submit'
  | 'ai_assistant_success'
  | 'contact_form_submit'
  | 'contact_modal_open'
  | 'project_demo_open'
  | 'project_github_open'
  | 'resume_download';

type EventProperties = Record<string, string | number | boolean>;

export function trackPortfolioEvent(
  eventName: PortfolioEvent,
  properties?: EventProperties,
) {
  track(eventName, properties);
}
