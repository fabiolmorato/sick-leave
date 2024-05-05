export function* transition (from: number, to: number, speed: number) {
  let current = from;
  
  while ((from < to && current < to) || (from > to && current > to)) {
    yield current;
    const step = from > to ? Math.min((to - current) * speed, -1) : Math.max((to - current) * speed, 1);
    current += step;
  }

  yield to;
}
