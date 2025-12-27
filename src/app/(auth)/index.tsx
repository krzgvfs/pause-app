import { Button } from "@/components/button";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
    const { user } = useUser()
    const { signOut } = useAuth()

    return (
        <View style={styles.container}>
            <Image source={{uri: user?.imageUrl}} style={{width: 100, height: 100, borderRadius: 20}}></Image>
            <Text style={styles.text}>{user?.fullName}</Text>
            <Button icon="exit" title="Sair" onPress={() => signOut()}></Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
})