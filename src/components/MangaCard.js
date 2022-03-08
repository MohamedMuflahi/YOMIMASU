import React,{useState,useEffect} from "react"; 
import {Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native'
import dex from "../api/dex";
function MangaCard({title,id,navigation,item}){
    const [image, setimage] = useState(`https://media1.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif?cid=ecf05e475bm09toekai6792479uc5e1z7q08wg0sgttcrna7&rid=giphy.gif&ct=g`);
    const [author, setauthor] = useState(`Author`);
    function handlePress(){
        navigation.navigate('Detail',{
        title,
        image,
        author,
        status: item.attributes.status,
        desc: item.attributes.description.en,
        id,
    })
}
const getAuthor = async (id) =>{
    try{
        const response = await dex.get(`./author/${id}`,{
        })
        
        setauthor(response.data.data.attributes.name)
        
    }catch(err){
       
    }
}
    const getCover = async (id) =>{
        //let manga = [id];
        try{
            const response = await dex.get('./cover',{
                params:{
                    manga: [id],
                }
            })
            setimage( `https://uploads.mangadex.org/covers/${id}/${response.data.data[0].attributes.fileName}`)
        }catch(err){
            
        }
    }
    useEffect(() => {
        getCover(id);
        getAuthor(item.relationships[0].id);
    }, [])
    
    return (
        <>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Image style={styles.image} source={{ uri: image}}/> 
            </TouchableOpacity>
        </>
    );
}
const styles= StyleSheet.create({
    button:{
        paddingBottom:10,
        marginLeft: 15,
    },
    image:{
        width: 150,
        height: 250,
        borderRadius: 10,
        marginBottom: 5,
    },
})
export default MangaCard