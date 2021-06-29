#!/usr/bin/env node

import getGists from './lib/get-gists'

async function build(username: string) : Promise<void> {
  await getGists(process.env.GITHUB_USERNAME)
}
