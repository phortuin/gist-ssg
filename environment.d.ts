// Type definition for process.env
// https://stackoverflow.com/a/53981706/554821

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_USERNAME: string;
    }
  }
}

export {}
