import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import * as pactom from 'pactum'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { AuthDto } from "../src/auth/dto"
import { connect, Connection } from "mongoose"

describe('App e2e', () => {
  let app: INestApplication
  let mongod: MongoMemoryServer
  let mongoConnection: Connection

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    mongoConnection = (await connect(uri)).connection

    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule
      ]
    }).compile()

    app = moduleRef.createNestApplication()

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))

    await app.init()

    await app.listen(3333)
  })

  afterAll(async () => {
    await mongoConnection.dropDatabase()
    await mongoConnection.close()
    await mongod.stop()

    app.close()
  })

  describe('Auth', () => {
    describe('Signup', () => {
      it('should signup', () => {
        const dto: AuthDto = {
          email: 'test2@gmail.com',
          password: '123'
        }
        return pactom.spec().post('http://localhost:3333/auth/signup').withBody(dto).expectStatus(201)
      })
    })

    // describe('Signin', () => {

    // })
  })
})