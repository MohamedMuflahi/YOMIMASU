import React,{useState,useEffect} from 'react'; 
import {View, Text, StyleSheet,FlatList,Image,ScrollView} from 'react-native';

import GenreList from '../components/GenreList';
import SearchBar from '../components/SearchBar';
import SearchCard from '../components/SearchCard';
function LoggedHome({navigation,route}){
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setisSearching] = useState(false);
    const {user} = route.params;
    console.log(results)
    const searchApi = async (term)=>
    {
      try
      {
     fetch(
          `https://api.mangadex.org/manga?title=${term}&limit=10&contentRating[]=safe`, 
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
  useEffect(() => {
    
  }, [])
  
    return (
      <ScrollView>
        <SearchBar
          term={searchTerm}
          onTermChange={setSearchTerm}
          onTermSubmit={() => {
            setisSearching(true);
            searchApi(searchTerm);
          }}
        />
          {errorMessage? <Text>{errorMessage}</Text>: null}
        {isSearching? <Text style={{fontSize: 18, fontWeight: 'bold'}}>
        Search Results:
        </Text>: <>
        <GenreList genreId={'ace04997-f6bd-436e-b261-779182193d3d'}navigation={navigation} genre={"Isekai"}></GenreList>
        <GenreList genreId={'391b0423-d847-456f-aff0-8b0cfc03066b'}navigation={navigation} genre={"Adventure"}></GenreList>
        <GenreList genreId={'87cc87cd-a395-47af-b27a-93258283bbc6'}navigation={navigation} genre={"Action"}></GenreList>
        <GenreList genreId={'b9af3a63-f058-46de-a9a0-e0c13906197a'}navigation={navigation} genre={"Fantasy"}></GenreList>
        <GenreList genreId={'ee968100-4191-4968-93d3-f82d72be7e46'}navigation={navigation} genre={"Horror"}></GenreList>
        <GenreList genreId={'cdad7e68-1419-41dd-bdce-27753074a640'}navigation={navigation} genre={"Mystery"}></GenreList>
        </>}
        
        {results.map(e=>{
           //title,id,navigation,item
           return <SearchCard key={e.id} title={e.attributes.title.en} id={e.id} navigation={navigation} item={e} user={user}></SearchCard>
         })}
        
      </ScrollView>
    );
}  
export default LoggedHome;