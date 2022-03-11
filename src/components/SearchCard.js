import React,{useState,useEffect} from "react"; 
import {Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native'
function SearchCard({title,id,navigation,item,user}){
  console.log(id);
  console.log(author);
  
  const [image, setimage] = useState(
    `https://media1.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif?cid=ecf05e475bm09toekai6792479uc5e1z7q08wg0sgttcrna7&rid=giphy.gif&ct=g`
  );
  const [author, setauthor] = useState(`Author`);
  function handlePress() {
    navigation.navigate("Detail", {
      title,
      image,
      author,
      status: item.attributes.status,
      desc: item.attributes.description.en,
      id,
      user,
    });
  }
  const getAuthor = async (id) => {
    try {
      fetch(`https://api.mangadex.org/author/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setauthor(data.data.attributes.name);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const getCover = async (id) => {
    try {
      fetch(`https://api.mangadex.org/cover?manga[]=${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setimage(
            `https://uploads.mangadex.org/covers/${id}/${data.data[0].attributes.fileName}`
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getCover(id);
    getAuthor(item.relationships[0].id);
  }, []);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.view}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.status}></Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
const styles= StyleSheet.create({
    view:{
      paddingLeft: 20,
      marginVertical: 20,
    },
    button:{
        paddingBottom:10,
        marginLeft: 15,
        flexDirection: "row"
    },
    image:{
        width: 100,
        height: 150,
        borderRadius: 10,
        marginVertical:20,
    },
    title:{
      fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 22,
    paddingBottom: 20,
    },
    author:{
      fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 20,
    },
    desc:{

    },
    status:{
      fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 15,
    paddingBottom: 20,
    },
})
export default SearchCard