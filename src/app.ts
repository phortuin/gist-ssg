#!/usr/bin/env node

import dotenv from 'dotenv-safe'
import getGists from './lib/get-gists'

dotenv.config()

async function build(username: string) : Promise<any> {
  const gists = await getGists(username)
  return gists
}

function run() : void {
  build(process.env.GITHUB_USERNAME)
    .then(console.log)
}

run()