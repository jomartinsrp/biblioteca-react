import './Home.css';
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { useState } from 'react';
import { Button, InputGroup, FormControl, Table, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from "uuid";

function Home() {

  const [nomeCliente, setNomeCliente] = useState("");
  const [clientes, setClientes] = useState([]);
  let clienteEdicao = null;


  const [reserva, setReserva] = useState([]);
  const [nomeReserva, setNomeReserva] = useState("");
  const [livroReserva, setLivroReserva] = useState("");

  function cadastrarReserva() {
    let reservaNovo = {
      id: uuidv4(),
      nome: nomeReserva,
      livro: livroReserva,
      valor: 7,
    }
    reserva.push(reservaNovo)
    setReserva([...reserva])
    limparFormulario();
  }


  function cadastrarCliente() {
    if (nomeCliente == "") {
      alert("O nome do cliente não foi preenchido")
      return false
      limparFormulario();
    }

    let cliente = {
      id: uuidv4(),
      nome: nomeCliente,
    }
    clientes.push(cliente)
    setClientes([...clientes])
    limparFormulario();
  }


  function excluirCliente(id) {
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].id == id) {
        clientes.splice(i, 1)
        break;
      }
    }

    let novoArrayClientes = [...clientes];
    setClientes(novoArrayClientes)

  }

  function buscarCliente(id) {
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].id === id) {
        return {
          cliente: clientes[i],
          index: i
        };
      }
    }
  }

  function buscarReserva(id) {
    for (let i = 0; i < reserva.length; i++) {
      if (reserva[i].id === id) {
        return {
          cliente: reserva[i],
          index: i
        };
      }
    }
  }

  function editarCliente(id) {
    const busca = buscarCliente(id)
    setNomeCliente(busca.cliente.nome)
    clienteEdicao = busca.cliente;
  }

  function limparFormulario() {
    setNomeCliente("");
    setNomeLivro("");
  }

  const [nomeLivro, setNomeLivro] = useState("");
  const [codLivro, setCodLivro] = useState("");
  const [livros, setLivros] = useState([]);
  const [selecionarCliente, setSelecionarCliente] = useState("");

  function cadastrarLivros() {
    if (nomeLivro == "") {
      alert("O título do livro não foi preenchido")
      return false
      limparFormulario();
    }

    let livro = {
      id: uuidv4(),
      nome: nomeLivro,
    }
    livros.push(livro)
    setLivros([...livros])
    limparFormulario();
  }

  function excluirLivro(id) {
    for (let i = 0; i < livros.length; i++) {
      if (livros[i].id == id) {
        livros.splice(i, 1)
        break;
      }
    }

    let novoArrayLivros = [...livros];
    setLivros(novoArrayLivros)

  }

  function excluirReserva(id) {
    for (let i = 0; i < reserva.length; i++) {
      if (reserva[i].id == id) {
        reserva.splice(i, 1)
        break;
      }
    }

    let novoArrayReserva = [...reserva];
    setReserva(novoArrayReserva);

  }

  function buscarNomeLivro(id) {
    let resultado = "Não encontrado"
    livros.forEach((c) => {
      if (c.id == id) {
        resultado = c.nome
      }
    })
    return resultado;
  }

  let [today, setToday] = useState();

  function getCurrentDate(separator = '-') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
  }

  return (
    <div>
      <div className="cabecalho">
        <img src="https://jmartinsdigital.com.br/wp-content/uploads/2022/04/jmlogob.png"
          width="100px"
          title="J Martins Veículos"></img>
      </div>
      <div className="main">
        <div className="box-menu">
          <h3>Cadastros</h3>
          <Container>
            <Row>
              <Col>
                <div className="topo-box-menu2">
                  <span>Cadastro de clientes:</span>
                  <div className="inputs-clientes">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">Nome</InputGroup.Text>
                      <FormControl
                        placeholder='Digite o nome do cliente'
                        value={nomeCliente}
                        onChange={(e) => { setNomeCliente(e.target.value) }}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                      <Button variant="primary" onClick={cadastrarCliente}>Salvar</Button>
                    </InputGroup>
                  </div>
                </div>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Nome do Cliente</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((j) => {
                      return (<tr>
                        <td>
                          {j.nome}
                        </td>
                        <td>
                          <Button variant="light" onClick={() => { excluirCliente(j.id) }}><FcCancel /></Button>
                        </td>

                      </tr>
                      )
                    })}

                  </tbody>
                </Table>

              </Col>
              <Col>
                <div className="topo-box-menu2">
                  <span>Cadastro de livros:</span>
                  <div className="inputs-livros">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">Título</InputGroup.Text>
                      <FormControl
                        placeholder='Digite o título do livro'
                        value={nomeLivro}
                        onChange={(e) => { setNomeLivro(e.target.value) }}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                      <Button variant="primary" onClick={cadastrarLivros}>Salvar</Button>
                    </InputGroup>
                  </div>
                </div>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {livros.map((l) => {
                      return (<tr>
                        <td>
                          {l.nome}
                        </td>
                        <td>
                          <Button variant="light" onClick={() => { excluirLivro(l.id) }}><FcCancel /></Button>
                        </td>

                      </tr>
                      )
                    })}

                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>

        </div>
        <div className="box-menu2">
          <h3>Aluguel</h3>
          <span>Gerenciar aluguéis</span>
          <div className="reserva">
            <Container>
              <Row>
                <Col>
                  <div className="fazer-reserva">
                    <span>Novo aluguel:</span>
                    <div className="select-reserva">
                      <Form.Select
                        value={nomeReserva}

                        onChange={(e) => { setNomeReserva(e.target.value) }}>
                        <option>Selecione um cliente</option>
                        {clientes.map((c) => {
                          return (
                            <option value={c.nome}>{c.nome}</option>
                          )
                        })}
                      </Form.Select>
                      <Form.Select
                        className='escolher-livro'
                        value={livroReserva}
                        onChange={(e) => { setLivroReserva(e.target.value) }}>
                        <option>Escolha o livro</option>
                        {livros.map((c) => {
                          return (
                            <option value={c.nome}>{c.nome}</option>
                          )
                        })}
                      </Form.Select>
                      <Button className="button-reservar" variant="primary" onClick={cadastrarReserva}>Alugar</Button>
                    </div>
                  </div>
                  <div className="fazer-reserva2">
                    <span>Gerenciador</span>
                    <Table className='tabela-reservas' striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Cliente</th>
                          <th>Livro</th>
                          <th>Data</th>
                          <th>Valor</th>
                          <th>Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reserva.map((r) => {
                          return (<tr>
                            <td>
                              {r.nome}
                            </td>
                            <td>
                              {r.livro}
                            </td>
                            <td>
                              {getCurrentDate()}
                            </td>
                            <td>
                              {r.valor + " reais"}
                            </td>
                            <td>
                              <Button className='cancelar-reserva' variant="light" onClick={() => { excluirReserva(r.id) }}><FcCancel /></Button>
                              <Button variant="light" onClick={() => { excluirReserva(r.id) }}><FcCheckmark /></Button>
                            </td>

                          </tr>
                          )
                        })}

                      </tbody>
                    </Table>
                  </div>
                  {console.log(reserva)}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div >
    </div >
  );
}

export default Home;
