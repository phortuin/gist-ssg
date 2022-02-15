import got from 'got'
import { components } from "@octokit/openapi-types";

type Gist = components["schemas"]["base-gist"]

type GistMeta = {
    id: string,
    url: string,
    description: string,
    files: GistFile[],
}

type GistFile = {
    filename: string,
    url: string,
    language: string,
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

const getGists = async (username: string) : Promise<GistMeta[]> => {
    const options = {
        baseUrl: 'https://api.github.com/users',
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        },
    }
    try {
        const res = await got(`${username}/gists`, options)
        const gists = JSON.parse(res.body)
        mapper(gists)
            .map((gist) => {
                return gist.files.map((file) => {
                    return getRawFile(file)
                })
            })
        return mapper(gists)
    } catch(error) {
        return Promise.reject()
    }
}


async function getRawFile(file: GistFile) : Promise<string> {
    let content // moet dit niet een string zijn? Maar dan krijg ik 'Promise<string> is not assignable to string' of zo
    try {
        content = await got(file.url)
    } catch(error) {
        console.error(error)
    }
    console.log(content.body)
    return content
}

export default getGists
