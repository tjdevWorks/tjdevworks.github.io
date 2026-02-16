type AnalyticsPlaceholderProps = {
  enabled?: boolean;
};

export function AnalyticsPlaceholder({ enabled = false }: AnalyticsPlaceholderProps) {
  if (!enabled) {
    return null;
  }

  return null;
}
