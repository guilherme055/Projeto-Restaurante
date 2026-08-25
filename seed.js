

const API_BASE = 'http://localhost:3000/api';

const usuarios = [
  { nome: 'João da Silva', email: 'joao@email.com', senha: '123' },
  { nome: 'Maria Souza', email: 'maria@email.com', senha: '123' },
  { nome: 'Carlos Eduardo', email: 'carlos@email.com', senha: '123' },
];

const pratos = [
  { nome: 'Hamburguer Especial', descricao: 'Pão brioche, blend 180g, queijo cheddar, bacon e cebola caramelizada', preco: 35.50, img: 'imgs/burger.jpg' },
  { nome: 'Batata Frita Rústica', descricao: 'Porção de 400g de batata rústica com alecrim e alho', preco: 22.00, img: 'imgs/batata.jpg' },
  { nome: 'Milkshake de Morango', descricao: 'Milkshake cremoso com pedaços de morango fresco e chantilly', preco: 18.00, img: 'imgs/milkshake.jpg' },
];

async function seedDatabase() {
  console.log('Iniciando script de seed...\n');

  try {
    // 1. Adicionando Usuários
    console.log('--- Adicionando Usuários ---');
    for (const usuario of usuarios) {
      const res = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ Usuário ${usuario.nome} criado com sucesso!`);
      } else {
        console.log(`❌ Erro ao criar usuário ${usuario.nome}: ${data.error}`);
      }
    }

    console.log('\n--- Adicionando Pratos ---');
    // 2. Adicionando Pratos
    for (const prato of pratos) {
      const res = await fetch(`${API_BASE}/pratos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prato)
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ Prato ${prato.nome} criado com sucesso!`);
      } else {
        console.log(`❌ Erro ao criar prato ${prato.nome}: ${data.error}`);
      }
    }

    console.log('\nSeed finalizado! Vamobora! 🚀');

  } catch (error) {
    console.error('\nErro ao executar seed. O servidor (npm run dev) está rodando na porta 3000?');
    console.error(error.message);
  }
}

seedDatabase();
