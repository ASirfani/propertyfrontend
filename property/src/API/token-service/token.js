const getToken = () => {
    const tokenStorage = localStorage.getItem('token');
    if (!tokenStorage) return null;
    try {
        const { token, type } = JSON.parse(tokenStorage);
        return `${type} ${token}`
    } catch (error) {
        return null
    }
}

const setToken = (token) => {
    localStorage.getItem('token',token);
}

const cleanToken = () => {
    localStorage.removeItem('token')
}


export {setToken,getToken,cleanToken};