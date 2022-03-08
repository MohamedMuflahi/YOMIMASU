import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';

function ChapterCard({vol,ch,title, handlePress,id}){
    return (
        <TouchableOpacity style={styles.view} onPress={()=>handlePress(id)}>
        <View>
            <Text>{title} </Text>
            <View style={styles.viewRow}>
            {vol? <Text> Vol.{vol} </Text> : null}
            <Text> Ch.{ch}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    viewRow:{
        flexDirection: 'row',
    },view:{
        height: 50,
        width: 500,
        borderRadius: 10,
    },
})
export default ChapterCard;
