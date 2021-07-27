import { newsRouter } from './router/news'
import { AuthRouter } from './router/authentication'
import { notesRouter } from './router/notes'

const ROUTES = [
    {
        path: '/',
        router: AuthRouter

    },
    {
        path: '/news',
        router: newsRouter

    },
    {
        path: "/notes",
        router: notesRouter
    }



]

export default ROUTES