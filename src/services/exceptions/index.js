export default (e, message='')=> {
    if(!message) {
        message = 'Oops! Something went wrong'
    }
    let status = e.response.status;
    let allErrors = Object.entries( e.response.data.errors ).map( ( [key, val] ) => `${key} ${val}` )
    return {
        status,
        message: allErrors[0]
    }
}