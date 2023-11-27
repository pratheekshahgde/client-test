
## details

### implemented:
- uni sends invite to student
- uni and student can send msgs to eachother

### pending impelemnations
- creating Certificates
- credential interations
- proof interations
- start stop functions

### setting up
- `nvm use` 
- uses node 18
- `yarn install`
- for issues with libindy- refer the hyperledger resource document- [doc](https://docs.google.com/document/d/1BdrgOWiEzygZbG9nVPr2hbi-rALPZAREiB5lGPos57c/edit?usp=sharing)

### server and client start up commands
```
        yarn client - starts the front end client
        yarn server - starts the univresirty, the issuing agent server
        yarn test-server - starts student server- for testing
        yarn test-client - starts simple testing front end university and student testing
```

- localhost:5001 - university agent
- localhost:5000 - student agent

### server apis
- `localhost:5001/uniCreateInvite?url=`
- returns the invite url from university for the given url, which is the recevier end point url

- `localhost:5000/accept?url=`
- student accepts the invite from university

- `localhost:5001/sendMsg?msg=`
- university recevies msg

- `localhost:5000/sendMsg?msg=`
- student recives message


