import { RepoUrl } from "./repoUrl";

it("should create repoUrl", () => {
  const url = new RepoUrl("http://test.com/api");
  url.addParams("a", "1");
  url.addParams("b", ["2", "3"]);
  expect(url.toString()).toBe("http://test.com/api?a=1&b=2&b=3");
});
