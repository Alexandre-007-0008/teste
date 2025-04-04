import { useState } from "react";

// Definir a interface para o Produto
interface Produto {
  _id: string;
  name: string;
  description: string;
  valor: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Produto[]>([]); // Especificar que `results` é um array de `Produto`

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);

    if (q.length > 2) {  // Evita buscas com menos de 3 caracteres
      const res = await fetch(`/api/search?q=${q}`);
      const data = await res.json();
      setResults(data);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-container p-4 border rounded-lg shadow-lg">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar produtos..."
        className="w-full p-2 border rounded"
      />
      {results.length > 0 && (
        <ul className="mt-2 bg-white border rounded">
          {results.map((produto) => (
            <li key={produto._id} className="p-2 border-b">
              {produto.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
