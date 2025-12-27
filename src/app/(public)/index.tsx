import { useOAuth } from "@clerk/clerk-expo"
import * as Linking from "expo-linking"
import * as WebBrowser from "expo-web-browser"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"


import { Button } from "@/components/button"


WebBrowser.maybeCompleteAuthSession()

export default function SignIn(){
    const [isLoading, setIsLoading] = useState(false)
    const googleOAuth = useOAuth({ strategy: "oauth_google"})


    async function onGoogleSign() {
        try {
            setIsLoading(true)

            const redirectUrl = Linking.createURL("/")
            const oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl})
            
            if (oAuthFlow.authSessionResult?.type === "success"){
                if (oAuthFlow.setActive){
                    await oAuthFlow.setActive({session: oAuthFlow.createdSessionId })
                }
            } else {
                
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }


    useEffect(() => {
        WebBrowser.warmUpAsync()

        return () => {
            WebBrowser.coolDownAsync()
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrar</Text>
            <Button 
              title="Entrar com Google" 
              icon="logo-google"
              onPress={onGoogleSign}
              isLoading={isLoading}
            >
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        justifyContent: "center",
        gap: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
})