import got from 'got'
import { components } from "@octokit/openapi-types/packages/openapi-types/types";

type Gist = components["schemas"]["base-gist"]

type GistMeta = {
    id: String,
    url: String,
    description: String,
    files: GistFiles[],
}

type GistFiles = {
    filename: String,
    url: String,
    language: String,
}

/**
 *
 * @param gists
 * @returns
 */
function mapper(gists: Gist[]) : GistMeta[] {
    return gists.map((gist) => {
        return {
            id: gist.id,
            url: gist.url,
            description: gist.description,
            files: Object.values(gist.files).map((file) => ({
                filename: file.filename,
                url: file.raw_url,
                language: file.language,
            }))
        }
    })
}

const getGists = async (username: String) : Promise<GistMeta[]> => {
    const options = {
        baseUrl: 'https://api.github.com/users',
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        },
    }
    const res = await got(`${username}/gists`, options)
    const gists: Gist[] = JSON.parse(res.body)
    return mapper(gists)
}

export default getGists
