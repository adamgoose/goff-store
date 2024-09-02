export type FeatureFlag<T> = {
  variations: Record<string, Variation<T>>;
  targeting?: Rule[];
  defaultRule: Rule;
  scheduled?: ScheduledStep<T>[];
  experimentation?: Experimentation;
  metadata?: Record<string, any>;
  trackEvents?: boolean;
  disable?: boolean;
  version?: string;
  converter?: string;
};

export type Variation<T> = T;

export type Rule = {
  name: string;
  query: string;
  variation: string;
  percentage?: Record<string, number>;
  progressiveRollout?: ProgressiveRollout;
  disable?: boolean;
};

export type Experimentation = {
  start: Date;
  end: Date;
};

export type ScheduledStep<T> = FeatureFlag<T> & {
  date: Date;
};

export type ProgressiveRollout = {
  initial?: ProgressiveRolloutStep;
  end?: ProgressiveRolloutStep;
};

export type ProgressiveRolloutStep = {
  variation: string;
  percentage: number;
  date: Date;
};
