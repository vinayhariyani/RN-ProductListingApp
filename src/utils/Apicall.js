import axios from "axios";

const ApiCall = (url) => {
    return new Promise((res, rej) => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: url,
            };

            axios.request(config)
                .then((response) => {
                    res(response.data);
                })
                .catch((error) => {
                    res("Something Went Wrong")
                });
        } catch (error) {
            res("Something Went Wrong")
        }
    })

}

export default ApiCall;