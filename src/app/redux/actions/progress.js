export const START_PROGRESS = 'START_PROGRESS';
export const END_PROGRESS = 'END_PROGRESS';

/**
 * Imperatively start global progress.
 */
export const startProgress = () => ({
  type: START_PROGRESS,
});

/**
 * Imperatively stop global progress.
 */
export const endProgress = () => ({
  type: END_PROGRESS,
});
