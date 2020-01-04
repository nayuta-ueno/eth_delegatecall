//const obj = artifacts.require("./DelegateCall.sol");
const Caller = artifacts.require("Caller");
const Callee = artifacts.require("Callee");

contract("DelegateCall test", async accounts => {
  it("addCall", async () => {
    var er = await Caller.deployed();
    var ee = await Callee.deployed();
    await er.setCallee(ee.address);

    await er.addCall(1, 2);
    assert.equal((await er.x()).toString(), 0, "y");
    assert.equal((await er.y()).toString(), 0, "y");
    assert.equal((await er.v()).toString(), 2, "v");
    assert.equal((await er.w()).toString(), 3, "w");
    assert.equal((await ee.x()).toString(), 2, "ee.x");
    assert.equal((await ee.y()).toString(), 3, "ee.y");
  });

  it("addDelegateCall", async () => {
    let er = await Caller.deployed();
    let ee = await Callee.deployed();
    await er.setCallee(ee.address);

    await er.addDelegateCall(1, 2);
    assert.equal((await er.x()).toString(), 2, "x");
    assert.equal((await er.y()).toString(), 3, "y");
    assert.equal((await er.v()).toString(), 2, "v");
    assert.equal((await er.w()).toString(), 3, "w");
    assert.equal((await ee.x()).toString(), 2, "ee.x");
    assert.equal((await ee.y()).toString(), 3, "ee.y");
  });

});
