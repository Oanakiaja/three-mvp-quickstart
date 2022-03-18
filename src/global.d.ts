class StatsJS {
  constructor();
  showPanel(n: number): void;
  begin(): void;
  end(): void;
}

declare module 'stats.js' {
  const Stats: typeof StatsJS
  export default Stats 
}