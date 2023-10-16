import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

type Projeto = {
  id: number;
  name: string;
};

const App = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [nomeUsuario, setNomeUsuario] = useState<string>('');

  const handleRequest = async () => {
    const response = await fetch(`https://api.github.com/users/${nomeUsuario}/repos`);
    const data = await response.json();
    
    setProjetos(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Busca API GitHub</Text>
      <TextInput style={styles.input}
        placeholder="Nome do usuário"
        onChangeText={(nome) => setNomeUsuario(nome)}
      />
      <TouchableOpacity
        onPress={() => setNomeUsuario('')}
      />
      <TouchableOpacity style={styles.atualizar} onPress={handleRequest}>
        <Text>
          Atualizar
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {projetos.map((projeto) => (
          <Text style={styles.projetos} key={projeto.id}>{projeto.name}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 30,
    marginTop: 140,
  },
  input: {
    padding: 6,
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    width: '60%'
  },
  atualizar: {
    marginVertical: 10
  },
  projetos: {
    padding: 6,
    backgroundColor: '#f9f9f9',
    margin: 4
  }
});
