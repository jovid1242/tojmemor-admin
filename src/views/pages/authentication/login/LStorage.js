const lStorage = {
    RegisterStorage: (state) => {
        let regUserData = JSON.stringify({
            id: state.data.id,
            img: state.data.img,
            email: state.data.email,
            name: state.data.name,
            username: state.data.username,
            status: state.data.status,
            role: 'state.data.role',
            token: state.data.access_token,
        })
        localStorage.setItem('user', regUserData)
    },
    LoginStorage: (state) => {
        let logUserData = JSON.stringify({
            activated: state.data.user.activated,
            name: state.data.user.name,
            status: state.data.user.status,
            image: state.data.user.image,
            token: state.data.accessToken,
        })
        localStorage.setItem('user', logUserData)
    },
}

export default lStorage
