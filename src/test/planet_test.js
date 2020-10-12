require("dotenv").config();

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

/**
 * Assertion Style
 */
const should = chai.should();

const Planet = require("../models/planet");

/**
 * Bloco de código responsável por realizar os testes da API
 */
describe("Star Wars - Planets", () => {
    let baseURL = `${process.env.HOST}:${process.env.PORT}/api/v1`;
    let planetID;
    const newPlanet = new Planet({
        name: "Gladson",
        climate: "Pleasant",
        ground: "Flat land",
        quantity_movies: 0,
    });

    /**
     * TESTE => Salvar
     * Rota: /planets
     */
    describe("POST /planets", function () {
        this.timeout(5000);
        it("POST: Criar um novo planet - com qualquer nome", (done) => {
            chai.request(baseURL)
                .post("/planets")
                .send(newPlanet)
                .end((err, res) => {
                    /**
                     * Salvando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    planetID = res.body._id;
                    done();
                });
        });
    });

    /**
     * TESTE => Listar
     * Rota: /planets
     */
    describe("GET /planets", function () {
        this.timeout(6000);
        it("GET: Listar os planetas", (done) => {
            chai.request(baseURL)
                .get("/planets")
                .end((error, res) => {
                    /**
                     * Listando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    res.should.be.json;

                    /**
                     * Se o retorno for 200, irá retornar um conjunto de elementos no array contidos na base de dados
                     */
                    res.body.should.be.a("object");

                    done();
                });
        });
    });

    /**
     * TESTE => Listar
     * Rota: /planets
     */
    describe("GET /planets?params=&params=", function () {
        this.timeout(7000);
        it("GET: Listar os planetas com filtros(parâmetros)", (done) => {
            chai.request(baseURL)
                .get(
                    "/planets?name=Gla&climate=&ground=&pageNumber=1&pageSize=5"
                )
                .end((error, res) => {
                    /**
                     * Listando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    res.should.be.json;

                    /**
                     * Se o retorno for 200, irá retornar um conjunto de elementos no array contidos na base de dados
                     */
                    res.body.should.be.a("object");

                    done();
                });
        });
    });

    /**
     * TESTE => Listar por ID
     * Rota: /planets/:id
     */
    describe("GET /planets/:id", function () {
        this.timeout(8000);
        it("GET: Buscar o planeta através do ID", (done) => {
            chai.request(baseURL)
                .get(`/planets/${planetID}`)
                .end((error, res) => {
                    /**
                     * Listando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);

                    /**
                     * Se o retorno for 200, irá retornar um conjunto de elementos no array contidos na base de dados
                     */
                    res.body.should.be.a("object");

                    done();
                });
        });
    });

    /**
     * TESTE => Listar por ID
     * Rota: /planets/:id
     */
    describe("GET(ERROR) /planets/:id", function () {
        this.timeout(9000);
        it("GET(ERROR): Buscar o planeta através do ID errado", (done) => {
            chai.request(baseURL)
                .get("/planets/5f824e3db459792e0be520d5")
                .end((error, res) => {
                    /**
                     * Listando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(404);

                    /**
                     * Se o retorno for 200, irá retornar um conjunto de elementos no array contidos na base de dados
                     */
                    res.body.should.be.a("object");

                    done();
                });
        });
    });

    /**
     * TESTE => Atualizar campos
     * Rota: /planets/:id
     */
    describe("PATCH /planets/:id", function () {
        this.timeout(10000);
        it("PATCH: Atualizar um campo específico do planeta", () => {
            const planetPatch = {
                ground: "Desert",
            };
            chai.request(baseURL)
                .patch(`/planets/${planetID}`)
                .send(planetPatch)
                .end((error, res) => {
                    /**
                     * Salvando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    res.should.be.json;
                });
        });
    });

    /**
     * TESTE => Atualizar campos
     * Rota: /planets/:id
     */
    describe("PUT /planets/:id", function () {
        this.timeout(12000);
        it("PUT: Atualizar um ou mais campos do planeta", () => {
            const planetPut = {
                name: "Gladson",
                climate: "Darth",
                ground: "Vader",
            };
            chai.request(baseURL)
                .put(`/planets/${planetID}`)
                .send(planetPut)
                .end((error, res) => {
                    /**
                     * Salvando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    res.should.be.json;

                    // done();
                });
        });
    });

    /**
     *  TESTE => Deletar objeto do banco de dados
     *  Rota: /aliens/:id
     */
    describe("DELETE /planets/:id", async () => {
        it("DELETE: Deletar o planeta do banco de dados", () => {
            chai.request(baseURL)
                .delete(`/planets/${planetID}`)
                .end((error, res) => {
                    /**
                     * Salvando com sucesso, irá retornar status 200
                     */
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body._id = planetID;
                });
        });
    });
});
