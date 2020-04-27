
# Trabalho Prático 2 - Virtualização de Redes
Universidade do Minho

### Autores:
- A80056 – Leonardo Neri
- PG39254 – Igor Virgílio Araújo
- PG39255 – Matheus dos Santos Gonçalves


## Utilização
### criação de diretório
Inicialmente, deve-se clonar esse repositório para a máquina de testes. Para tal basta executar o comando:
``` bash
git clone https://github.com/leonerii/nv_tp2/
``` 

### Criação de conteiners e ambiente de teste
Para utilizar esse projeto, depois de já possuir os ficheiros do repositório na máquina de testes é necessário criar o ambiente Docker. Para isso execute o comando em um terminal que possua tais arquivos deste repositório dentro do diretório _**/nv_tps**_:
``` bash
docker-compose up -d
``` 
#### _Possíveis Problemas_
_No docker-compose foram expostas as portas HTTP e HTTPS, tanto para o host quanto para o conteiner, no formato **porta_host:porta:conteiner**, porém caso estas portas já estejam sendo utilizadas no host, será necessário alterá-las ou finalizar o(s) processo(s) que utilizam tais portas._


Em seguida será necessário adicionar uma entrada na resolução de nomes local do host de teste para que o domínio que foi utilizado para aceder a interface Web do ambiente possa ser utilizado. Considerando que esteja em um ambiente Linux, edite o ficheiro _**/etc/hosts**_, adicionando a seguinte linha:
``` bash
127.0.0.1     www.virtualizacao.com
``` 
Desta forma quando digitar _www.virtualizacao.com_ em um browser, tal endereço será mapeado para seu localhost com a respetiva porta, 443 para HTTPS e 80 para HTTP. 

### Teste do ambiente
#### Interface Web
Feito os procedimentos acima, pode-se aceder ao domínio _www.virtualizacao.com_ em um broser de sua preferência.
A seguir será apresentada uma página de autenticação. Para aceder pode-se utilizar os seguintes utilizadores que possuem suas respetivas permissões:
- _login:_ leonardo.neri
- _Senha:_ leo123
- _Role:_ Full
<br/><br/>
- _login:_ igor.virgilio
- _Senha:_ igor123
- _Role:_ Limitado
<br/><br/>
- _login:_ matheus.goncalvez
- _Senha:_ matheus123
- _Role:_ Limitado

Resumidamente os utilizadores igor.virgilio e matheus.goncalvez terão permissão de listar arquivo de todos os directórios e baixar somente o arquivo _favicon.ico_ do directório principal, enquanto o utilizador leonardo.neri possui permissão completa.

#### Cliente FTP
Ainda é possível incluir ficheiros no servidor FTP que possui volume compartilhado com o servidor HTTP, desta forma é possível incluir um ficheiro no servidor, e este estará disponível através da interface Web. 
Para aceder ao servidor utilize os seguintes dados:
- _host:_ 0.0.0.0
- _port:_ 2101
- _user:_ admin
- _passord:_ admin


## Conclusão
Com a proposta do trabalho prático, tivemos a oportunidade em desenvolver nossas habilidades trabalhando em ambientes com microservices, assunto no qual atualmente é muito utilizado em organizações pelo mundo todo.\
Em tal projeto, conseguimos aplicar regras de segurança no serviço de autenticação, aplicando perfis para ter acesso ou permissões nos diretórios da arquitetura. Foi um projeto muito desafiador, onde tivemos a oportunidade em desenvolver tais habilidades e nos aprofundar no mundo de virtualização com a ferramenta Docker.


