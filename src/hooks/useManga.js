import {useEffect,useState} from 'react';
import dex from '../api/dex';

export default () =>{
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    const searchApi = async (term) =>{
        try{
            const response = await dex.get('./search',{
                params:{
                    limit: 100,
                    title: term,
                }
            })
            setResults(response.data);
            setErrorMessage('');
        }catch(err){
            setErrorMessage('Something went wrong, Check your connection');
        }
    }
    useEffect(() => {
        searchApi('black clover');
    }, [])
    return [searchApi,results,errorMessage];
}
