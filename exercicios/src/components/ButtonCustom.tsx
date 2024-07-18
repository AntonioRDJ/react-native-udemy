import { Button } from "react-native"

export const ButtonCustom = () => {

  function handleOnPress() {
    console.warn("Exec!");
  } 

  return (
    <>
      <Button title="Executar #01!" onPress={handleOnPress} />
      <Button title="Executar #02!" onPress={() => { console.warn("Exec #02!") }} />
    </>
  )
}