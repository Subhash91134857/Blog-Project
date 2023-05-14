//  API_NOTIFICATION_MESSAGE

export const API_NOTIFICATION_MESSAGE = {
    loading: {
        tittle: 'Loading....',
        message: 'Data is being loaded, Please wait'
    },
    success: {
        tittle: 'Success',
        message: 'Data successfully loaded'
    },
    responseFailure: {
        title: 'Error',
        msg: 'An error occured while fetchig from the server'
    },
    requestFailure: {
        title: 'Error',
        msg: 'An error occured while parsing request data'
    },
    networkError: {
        title: 'Error',
        msg: 'Unable to connect with the server, please check internet connectivity or try again'
    }

}


export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: '/upload', method: 'POST' },
    createPost: { url: '/create', method: 'POST' },
    getAllPosts: { url: '/posts', method: "GET", params: true },
    getPostById:{url:'post',method:'GET',query:true},
    updatePost: { url: 'update', method: 'PUT', query: true },
    deletePost: { url: 'delete', method: 'DELETE', query: true },
    newcomment: { url: '/comment/new', method: 'POST' },
    getAllComm: { url: 'comments', method: 'GET', query: true },
    deleteComment:{url:'comment/delete',method:'DELETE',query:true},
}