import React,{useState,useEffect} from "react";
import {View, Text, StyleSheet,FlatList,Image,ScrollView} from 'react-native';
import MangaCard from "./MangaCard";
function GenreList({navigation,genreId,user,genre}){
    const [results, setResults] = useState([]);

    
const searchApi = async ()=>
    {
      try
      {
     fetch(
          `https://api.mangadex.org/manga?includedTags[]=${genreId}&limit=15&contentRating[]=safe`, 
          {
            headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
        }).then(response =>  response.json())
        .then((data) => {
          const shuffledArray = data.data.sort((a, b) => 0.5 - Math.random());
          setResults(shuffledArray);
                 
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
      
    // const searchApi = async () =>{
    //     try{
    //         const response = await dex.get('./manga',{
    //             params:{
    //                 limit: 15,
    //                 includedTags: [genreId],
    //             }
    //         })
    //         setResults(response.data.data);
    //         setErrorMessage('');
    //         console.log('Fetched');
    
    //     }catch(err){
    //       console.log(err);
    //         setErrorMessage('Something went wrong, Check your connection');
    //     }
    // }
    useEffect(() => {
        searchApi('')
      }, [])

    return (
      <>
      <Text style={styles.text}>{genre}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <MangaCard
              key={item.id}
              title={item.attributes.title.en}
              id={item.id}
              navigation={navigation}
              item={item}
              user={user}
            ></MangaCard>
          );
        }}
      />
      </>

    );
}
const styles = StyleSheet.create({
  text:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
  },
});
export default GenreList;