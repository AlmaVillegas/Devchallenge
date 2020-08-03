let chai = require('chai')
let chaiHttp =require('chai-http')
const expect = require('chai').expect

chai.use(chaiHttp);
const url= 'http://localhost:3000'
let token

//Insertar usuario 
//Update a users 
describe('Insert a User: ',()=>{
    it('should register a User', (done) => {
    chai.request(url)
    .post('/users/register')
    .send({firstName:"Jason", lastName: "Watmore", username: "jason", password: "jason"})
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
  });
});  

//Autentificación 
describe('Autentification: ',()=>{
    it('should Autentification a User', (done) => {
    chai.request(url)
    .post('/users/authenticate')
    .send({username: "jason", password: "jason"})
    .end( function(err,res){
    token = res.body.token 
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
  });
});  

//Get a Users
describe('get all users: ',()=>{
    it('should get all users', (done) => {
    chai.request(url)
    .get('/users')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
  });
});
   
//Get a one users
describe('get the country with id 1: ',()=>{
    it('should get the users with id 1', (done) => {
    chai.request(url)
    .get('/users/1')
    .end( function(err,res){
    console.log(res.body)
    expect(res.body).to.have.property('id').to.be.equal(1);
    expect(res).to.have.status(200);
    done();
    });
  });
});
   
//Delete users
describe('delete the users with id 1: ',()=>{
    it('should delete the users with id 1', (done) => {
    chai.request(url)
    .get('/users')
    .end( function(err,res){
    console.log(res.body)
    expect(res.body).to.have.lengthOf(2);
    expect(res).to.have.status(200);
    chai.request(url)
    .del('/users/1')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    chai.request(url)
    .get('/users')
    .end( function(err,res){
    console.log(res.body)
    expect(res.body).to.have.lengthOf(1);
    expect(res.body[0]).to.have.property('id').to.be.equal(0);
    expect(res).to.have.status(200);
    done();
    });
   });
  });
 });
});