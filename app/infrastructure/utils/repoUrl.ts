export class RepoUrl {
  url: URL;

  constructor(url: string) {
    this.url = new URL(url);
  }

  addParams(key: string, value: string | string[]) {
    if (typeof value === "string") {
      this.url.searchParams.set(key, value);
    } else {
      value.forEach((params) => this.url.searchParams.append(key, params));
    }
  }

  toURL() {
    return this.url;
  }

  toString() {
    return this.url.toString();
  }
}
