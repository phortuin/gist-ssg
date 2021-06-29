import got from 'got'

const GIST_API_BASE_URL = 'https://api.github.com/users'
const GIST_API_HEADERS = {
    'Accept': 'application/vnd.github.v3+json'
}




const listGists = async (user: String) => {
    const options = {
        baseUrl: GIST_API_BASE_URL,
        headers: GIST_API_HEADERS,
    } as const

    const res = await got('phortuin/gists', options)
    return res
}

export default listGists
