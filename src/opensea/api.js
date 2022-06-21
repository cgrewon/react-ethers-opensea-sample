
import axios from "axios";

const OS_HOST = `https://api.opensea.io/api/v1/`;

const Options = {
    headers:{
        'x-api-key':process.env.REACT_APP_OS_KEY
    }
}

const OSApi = {

    getAssetsOfOwner: async(owner, offset=0, limit=20, order_direction='asc')=>{
        let url = `${OS_HOST}assets?order_direction=${order_direction}&offset=${offset}&limit=${limit}&owner=${owner}`
       
        const res = await axios.get(url, Options)
        console.log({
            'res.status:':res.status,
            'res.data:': res.data
        })
    return res
    },
    getSingleAsset: async(tokenId, tokenAddr)=>{
        let url = `${OS_HOST}asset/${tokenAddr}/${tokenId}/`
       
        const res = await axios.get(url, Options)
        console.log({
            'res.status:':res.status,
            'res.data:': res.data
        })
        return res
    },
    getAssetsAtContract: async(tokenAddr, offset=0, limit=20, order_direction='asc')=>{
        let url = `${OS_HOST}assets?order_direction=${order_direction}&offset=${offset}&limit=${limit}&asset_contract_address=${tokenAddr}`
        const res = await axios.get(url, Options)
        console.log({
            'res.status:':res.status,
            'res.data:': res.data
        })
        return res
    },
    getCollectionsOfOwner: async(owner, offset=0, limit=300)=>{
        let url = `${OS_HOST}collections?offset=${offset}&limit=${limit}&asset_owner=${owner}`
        const res = await axios.get(url, Options)
        console.log({
            'res.status:':res.status,
            'res.data:': res.data
        })
        return res
    },
   


}


export default OSApi