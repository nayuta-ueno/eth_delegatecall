const PROVIDER = 'http://localhost:8545';
const CONTRACT_ADDR_CALLEE = '0xFc2d586f05e9e14D79550DF2D68003d08CDc6b98';
const CONTRACT_ADDR_CALLER = '0x5afC398b15c8EAab8cceF837E01bE20A94e58900';

const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(PROVIDER));

async function async_func() {
    // console.log('Protocol Version: ' + await web3.eth.getProtocolVersion());
    // console.log('gas Price: ' + await web3.eth.getGasPrice());
    
    const json_callee = JSON.parse(fs.readFileSync('./build/contracts/Callee.json', 'utf8'));
    var callee = new web3.eth.Contract(json_callee['abi'], CONTRACT_ADDR_CALLEE).methods;
    //console.log("callee:");
    //console.dir(callee);

    //ABI
    var caller = new web3.eth.Contract(
                        JSON.parse(fs.readFileSync('./build/contracts/Caller.json', 'utf8'))['abi'],
                        CONTRACT_ADDR_CALLER).methods;
    // console.log("caller:");
    // console.dir(caller);

    let accounts = await web3.eth.getAccounts();
    var payer = accounts[1];
    console.log("payer=" + payer);
    web3.eth.defaultAccount = payer;

    await caller.setCallee(CONTRACT_ADDR_CALLEE).send({from: payer});
    await caller.addCall(1, 2).send({from: payer});
    let x = (await caller.x().call()).toString();
    let y = (await caller.y().call()).toString();
    let v = (await caller.v().call()).toString();
    let w = (await caller.w().call()).toString();
    console.log('x=' + x+ ", y=" + y + ", v=" + v + ", w=" + w);
}
async_func();
