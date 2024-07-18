import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

// import Primeiro from './components/Primeiro';
// import CompPadrao, { Comp2, Comp3 } from './components/Multi';
// import MinMax from './components/MinMax';
// import { Random } from './components/Random';
// import { Title } from './components/Title';
// import { ButtonCustom } from './components/ButtonCustom';
// import { Counter } from './components/Counter';
// import { Father } from './components/direct/Father';
// import { FatherIndirect } from './components/indirect/Father';
// import { CounterV2 } from './components/counter/CounterV2';
// import { Differ } from './components/Differ';
// import { OddEven } from './components/OddEven';
// import { Family } from './components/relation/Family';
// import { Member } from './components/relation/Member';
// import { UserLogged } from './components/UserLogged';
// import { ListProducts } from './components/products/ListProducts';
// import { ListProductsV2 } from './components/products/ListProductsV2';
// import { InputName } from './components/InputName';
import { Square } from './components/layout/Square';
import { FlexboxV1 } from './components/layout/FlexboxV1';
import { FlexboxV3 } from './components/layout/FlexboxV3';
import { Mega } from './components/mega/Mega';

const App = () => {
  return (
    <SafeAreaView style={style.App}>
      
      <Mega qtdNumbers={7}/>
      
      {/*  
      <FlexboxV3 />
      
      <FlexboxV1 />
      
      <InputName />
      
      <ListProductsV2 />

      <ListProducts />

      <UserLogged user={{name: "Roberto", email: "jao@email.com"}} />
      
      <Family>
        <Member name='Ana' lastName='Carla' />
        <Member name='Augusto' lastName='Carlos' />
      </Family>

      <Family>
        <Member name='Roberto' lastName='Carlos' />
        <Member name='Carlos' lastName='Silva' />
      </Family>
      
      
      <OddEven num={3} />
      
      <Differ />

      <CounterV2 />

      <FatherIndirect />

      <Father />

      <Counter />
      <Counter init={100} step={9} />

      <ButtonCustom />

      <Title primary="Primario text" secondary="Secundario text" />

      <Random min={-100} max={100} />
      <Random min={0} max={10} />

      <MinMax min={3} max={20} />
      <MinMax min="1" max="94" />

      <CompPadrao />
      <Comp2 />
      <Comp3 />

      <Primeiro /> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  App: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});

export default App;
