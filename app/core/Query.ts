export interface Query<P, T> {
  get: (p: P) => Promise<T>;
}
