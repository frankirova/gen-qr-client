
import { useState } from 'react';
import './App.css'

function App() {
  const [qr, setQr] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const source = qr
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQr('');
    setLink(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getQr();
  };

  const getQr = async () => {
    try {
      const encodedLink = encodeURIComponent(link);
      const response = await fetch(`http://localhost:8000/api/qr/${encodedLink}`);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.src = url;
      setQr(url)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container'>
      <div className="qr-code">
        {(qr != '') ? <img src={qr} alt="qr-code" />
          : <img src='//placehold.it/240x240' alt="qr-code" />}
      </div>
      <section className="text-primary">
        <h1>Obtene tu codigo QR</h1>
      </section>
      <section className="text-secondary">
        <p>
          Carga el link que deseas convertir en qr, una vez generado descargalo y listo {';)'}
        </p>
      </section>
      <form onSubmit={handleSubmit}>
        <label>Agrega tu link</label>
        <input onChange={handleChange} name='link' />
        {
          (qr != '') ? <button><a download='true' href={source}>Descargar QR</a></button>
            : <button type='submit'>Obtener QR</button>
        }
      </form>
    </div>
  )
}

export default App