import { startServer } from '@aries-framework/rest'
import { initializeAgent } from './baseAgent.js'
import { createCredOffer, createNewInvitation, getConnectionRecord, messageListener, receiveInvitation, setupConnectionListener } from './utils/agentFunctions.js'
import { OutOfBandRecord } from '@aries-framework/core'
import type { WalletConfig } from '@aries-framework/core'
import type { Express } from 'express'
import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { CredDefService } from './controller/CredDefService.js'

const run = async () => {

  let inviteUrl: string
  let bandRec: OutOfBandRecord | undefined;
  function setInviteUrl(url: string, outOfBandRecord: OutOfBandRecord) {
    inviteUrl = url
    bandRec = outOfBandRecord
  }


  //uni detail configuration

  const uniApp: Express = createExpressServer({
    controllers: ['./controllers/**/*.ts', './controllers/**/*.js'],
    cors: true,
  })
  const uniWConfig: WalletConfig = {
    id: 'uni-wallet',
    key: 'demoagentacme0000000000000000000'
  }
  const UNIAgent = await initializeAgent("uni", uniWConfig, 5003, `testtesttesttesttesttesttesttest`)
  setupConnectionListener(UNIAgent, bandRec || {} as OutOfBandRecord, () => {
    console.log('We now have an active connection to use in the following tutorials')
  })

  // http://localhost:5001/uniCreateInvite?url=http://localhost:5002 to test
  uniApp.get('/uniCreateInvite', async (req, res) => {
    let url = req.query.data as string
    const { outOfBandRecord, invitationUrl } = await createNewInvitation(UNIAgent,url,)
    console.log('uni creating invite')
    res.send(invitationUrl)
    setInviteUrl(invitationUrl, outOfBandRecord)
  })

  uniApp.get('/sendMsg', async (req, res) => {
    let msg = req.query.msg  as string
    const connectionRecord = await getConnectionRecord(UNIAgent, bandRec || {} as OutOfBandRecord)
    await UNIAgent.basicMessages.sendMessage(connectionRecord.id, msg);
    console.log('uni sending msg')
    res.send('uni msg sent')
  })
  messageListener(UNIAgent, "university")

  const credDefService = new CredDefService(UNIAgent)
  useContainer(Container)
  Container.set(CredDefService, credDefService)
  
  uniApp.get('/getCredDefId', async (req, res) => {
res.send(credDefService.getCredentialDefinitionIdByTag('university-marks-card'))
  })

  uniApp.post('/createCred', async (req, res) => {
    const body = req.body as { credId: string; data: any }; // Assuming the body has { credId: string, data: any }
    const { credId, data } = body;

    const response = await createCredOffer(UNIAgent, credId, data)
    res.send(response)
})


  await startServer(UNIAgent, {
    port: 5001,
    app: uniApp,
    cors: true,
  })
  console.log('starting uni server')
}

// A Swagger (OpenAPI) definition is exposed on  http://localhost:5001/docs
run()