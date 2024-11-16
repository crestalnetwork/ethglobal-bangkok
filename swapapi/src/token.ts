import fs from "fs";
import axios from "axios";

export const getTokenList = async function (network: string) {
    const url = "https://api.1inch.dev/token/v1.2/" + network;

    const config = {
        headers: {
            "Authorization": "Bearer d9IBNKjwa3NfVp5bU0toolWLbeQfFGK8"
        },
        params: {},
        paramsSerializer: {
            indexes: null
        }
    };

    try {
        const response = await axios.get(url, config);
        response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getTokenByName = async function (network: string, tokenName: string) {
    const url = "https://api.1inch.dev/token/v1.2/" + network + "/search";

    console.log(url);
    const config = {
        headers: {
            "Authorization": "Bearer d9IBNKjwa3NfVp5bU0toolWLbeQfFGK8"
        },
        params: {
            "query": tokenName,
            "ignore_listed": "false",
            "only_positive_rating": "true"
        },
        paramsSerializer: {
            indexes: null
        }
    };

    try {
        const response = await axios.get(url, config);
        // const arr = response.data.map(item => Object.values(item));
        var address = "";
        response.data.forEach(item => {
            if (tokenName === item["symbol"]) {

                item["providers"].forEach(provider => {
                    // TODO: check if there is possible input to the query string instead of double loop.
                    if (provider === "1inch") {
                        address = item["address"];
                        return;
                    }
                });
                return;
            }
        });
        if (address == "") {
            console.log("ccccccc")
            throw new Error('token not found on the network:' + network + " token:" + tokenName);
        }
        return address
    } catch (error) {
        console.error(error);
    }
}

export const getTokensPrice = async function (network: string) {
    const url = "https://api.1inch.dev/price/v1.1/" + network;

    const config = {
        headers: {
            "Authorization": "Bearer d9IBNKjwa3NfVp5bU0toolWLbeQfFGK8"
        },
        params: {
            "currency": "USD"
        },
        paramsSerializer: {
            indexes: null
        }
    };


    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
