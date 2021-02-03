import axios from "axios";
import {
    FETCH_ALL_MEDIAS_REQUEST, FETCH_ALL_MEDIAS_SUCCESS, FETCH_ALL_MEDIAS_FAILURE,
    SEARCH_SUCCESS, SEARCH_REQUEST, FETCH_MEDIA_SUCCESS, FETCH_MEDIA_SUCCESS2, FETCH_MEDIA_SUCCESS3, FETCH_MEDIA_FAILURE, FETCH_MEDIA_REQUEST,
    SEARCH_FAILURE, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, CLEAR_WISHLIST
} from "./actionTypes";

const fetchAllMediasRequest = () => ({
    type: FETCH_ALL_MEDIAS_REQUEST
})

const fetchAllMediasSuccess = (payload) => ({
    type: FETCH_ALL_MEDIAS_SUCCESS,
    payload
})

const fetchAllMediasFailure = (error) => ({
    type: FETCH_ALL_MEDIAS_FAILURE,
    payload: error
})

const fetchMediaRequest = () => ({
    type: FETCH_MEDIA_REQUEST

})


const fetchMediaSuccess = (payload) => ({
    type: FETCH_MEDIA_SUCCESS,
    payload
})

const fetchMediaSuccess2 = (payload) => ({
    type: FETCH_MEDIA_SUCCESS2,
    payload
})
const fetchMediaSuccess3 = (payload) => ({
    type: FETCH_MEDIA_SUCCESS3,
    payload
})

const fetchMediaFailure = (error) => ({
    type: FETCH_MEDIA_FAILURE,
    payload: error
})

export const AddtoWishList = (product) => ({
    type: ADD_TO_WISHLIST,
    payload: product
})

export const RemovefromWishList = (UID) => ({
    type: REMOVE_FROM_WISHLIST,
    payload: UID
})

export const clearWishList = () => ({
    type: CLEAR_WISHLIST
})



export const fetchAllMedias = () => dispatch => {
    dispatch(fetchAllMediasRequest())
    const config = {
        method: 'get',
        url: `http://localhost:8001/api/medias`
    }
    return axios(config)
        .then((res) => {
            console.log(res.data)
            dispatch(fetchAllMediasSuccess(res.data))
            return true
        }).catch((err) => {
            console.log(err)
            dispatch(fetchAllMediasFailure(err))
        });
}

export const fetchMedia = (id) => dispatch => {
    dispatch(fetchMediaRequest())
    console.log("req", id)
    const config = {
        method: 'get',
        url: `http://localhost:8001/api/medias/media/${id}`
    }
    return axios(config)
        .then((res) => {
            console.log(res.data)
            dispatch(fetchMediaSuccess(res.data))
            axios({
                method: 'get',
                url: `https://api.themoviedb.org/3/movie/${res.data.id}/credits?api_key=3da864401bca9475486c35cc206b3e2a&language=en-US`
            }).then((resp) => {
                console.log(resp.data)
                dispatch(fetchMediaSuccess2(resp.data))
            })
            return true
        }).catch((err) => {
            console.log(err)
            dispatch(fetchMediaFailure(err))
        });
}

// export const searchReq = (payload) => (dispatch) => {
//     console.log("Initiating Search")
//     const config = {
//         method: 'get',
//         url: `https://pentagon-shine.herokuapp.com/jobs?q=${payload.query}`,
//     };

//     return axios(config).then((res) => {
//         console.log("result", res)
//         dispatch(fetchAllJobsSuccess(res.data))
//     })
// }
