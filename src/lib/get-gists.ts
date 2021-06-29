import got from 'got'

type Gist = {
    files: GistFile[]
}

type GistFile = {
    name: String
}

/**
 * 
 * @param gists 
 * @returns 
 */
function mapper(gists: any) : Gist[] {
    return gists.map((gist: any) => {
        return {
            file: {
                name: gist.filename
            }
        }
    })
}

const listGists = async (username: String) : Promise<any> => {
    const options = {
        baseUrl: 'https://api.github.com/users',
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        },
    } as const
    const res = await got(`${username}/gists`, options)
    return res.body
}

export default listGists
