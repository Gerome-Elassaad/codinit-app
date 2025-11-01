import { memo } from 'react';

interface ThinkingProcessProps {
  children: React.ReactNode;
}

export const ThinkingProcess = memo(({ children }: ThinkingProcessProps) => {
  const parseSteps = (content: React.ReactNode): string[] => {
    if (typeof content !== 'string') {
      return [];
    }

    const lines = content.split('\n').filter((line) => line.trim());
    const steps: string[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();

      const numberedMatch = trimmed.match(/^\d+\.\s*(.+)$/);

      if (numberedMatch) {
        steps.push(numberedMatch[1]);
        return;
      }

      const bulletMatch = trimmed.match(/^[-*]\s*(.+)$/);

      if (bulletMatch) {
        steps.push(bulletMatch[1]);
        return;
      }

      if (trimmed.length > 0) {
        steps.push(trimmed);
      }
    });

    return steps;
  };

  const steps = parseSteps(children);

  if (steps.length === 0) {
    return null;
  }

  return (
    <div className="thinking-process my-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="i-ph:lightbulb-duotone text-xl text-purple-600 dark:text-purple-400" />
        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Reasoning Process</span>
      </div>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 dark:bg-purple-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
              {index + 1}
            </div>
            <div className="flex-1 text-sm text-bolt-elements-textPrimary leading-relaxed pt-0.5">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
