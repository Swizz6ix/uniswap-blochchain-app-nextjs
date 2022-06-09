import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'zmm1mqr8',
    dataset: 'production',
    apiVersion: 'v1',
    token: 'sk4M1n9k2ailAm1AjSCbbdRXDocf1x5nJK0yHG0dd0yLoGOqEZKp0swV5AfbR4pNf7JouaEP1WcZM69v7CVcp1kaLXytRhQCdSvn579XTeeBzDq7My8cPaEV26KXA7r7gKjJfXhowueP7rTOyY6WYlIe9uCYSDtbqJySzXdm8XfqUPagZprY',
    useCdn: 'false'
})