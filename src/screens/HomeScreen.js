import React,{useState,useEffect} from 'react'; 
import {View, Text, StyleSheet,FlatList,Image,ScrollView} from 'react-native';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import dex from '../api/dex';
import GenreList from '../components/GenreList';
import MangaCard from '../components/MangaCard';
import SearchBar from '../components/SearchBar';
function HomeScreen({navigation}){
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    const searchApi = async (term)=>
    {
      try
      {
     fetch(
          `https://api.mangadex.org/manga?title=${term}&limit=100`, 
          {
            headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
        }).then(response =>  response.json())
        .then((data) => {
          setResults(data.data);
    }).catch((error) =>
    {
      console.error(error);
    });
        }
        catch (e)
        {
          console.error(e);
        }
      }
  //   const searchApi = async (term) =>{
  //     try{
  //         const response = await dex.get('./manga',{
  //             params:{
  //                 limit: 100,
  //                 title: term,
  //             }
  //         })
  //         setResults(response.data.data);
  //         setErrorMessage('');
  //         console.log('Fetched');
  //     }catch(err){
  //         console.log(err);
  //         setErrorMessage('Something went wrong, Check your connection');
  //     }
  // }
  useEffect(() => {
    searchApi('black clover');
  }, [])
  
    return (
      <ScrollView>
        <SearchBar
          term={searchTerm}
          onTermChange={setSearchTerm}
          onTermSubmit={() => {
            searchApi(searchTerm);
          }}
        />
          {errorMessage? <Text>{errorMessage}</Text>: null}
        <GenreList genreId={'ace04997-f6bd-436e-b261-779182193d3d'}navigation={navigation} ></GenreList>
        <GenreList genreId={'391b0423-d847-456f-aff0-8b0cfc03066b'}navigation={navigation} ></GenreList>
        <GenreList genreId={'87cc87cd-a395-47af-b27a-93258283bbc6'}navigation={navigation} ></GenreList>
        <GenreList genreId={'b9af3a63-f058-46de-a9a0-e0c13906197a'}navigation={navigation} ></GenreList>
        <GenreList genreId={'ee968100-4191-4968-93d3-f82d72be7e46'}navigation={navigation} ></GenreList>
        <GenreList genreId={'cdad7e68-1419-41dd-bdce-27753074a640'}navigation={navigation} ></GenreList>
        
         {/* {results.map(e=>{
           //title,id,navigation,item
           return <MangaCard key={e.id} title={e.attributes.title} id={e.id} navigation={navigation} item={e}></MangaCard>
         })} */}
        
      </ScrollView>
    );
}  
export default HomeScreen;