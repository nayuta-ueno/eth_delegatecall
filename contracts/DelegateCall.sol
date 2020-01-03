// https://qiita.com/ryu3/items/1f0deffeed17105d0516
pragma solidity ^ 0.5.0;

contract Callee {
    uint256 public x;
    uint256 public y;

    function add(uint256 _x, uint256 _y) public returns(uint256, uint256)
    {
        x = _x + 1;
        y = _y + 1;
        return (x, y);
    }
}

contract Caller {
    uint256 public x;
    uint256 public y;
    uint256 public v;
    uint256 public w;
    address public callee;

    function setCallee(address _callee) public {
        callee = _callee;
    }

    function addCall(uint256 _x, uint256 _y) public {
        bool success;
        bytes memory data;
        (success, data) = callee.call(abi.encodeWithSignature("add(uint256,uint256)", _x, _y));
        require(success);
        (v, w) = bytesToUint256(data);
    }

    function addDelegateCall(uint256 _x, uint256 _y) public {
        (bool success, bytes memory data) = callee.delegatecall(abi.encodeWithSignature("add(uint256,uint256)", _x, _y));
        require(success);
        (v, w) = bytesToUint256(data);
    }

    function bytesToUint256(bytes memory _b) internal pure returns(uint256, uint256)
    {
        uint256 res1;
        uint256 res2;
        assembly {
            res1 := mload(add(_b, 32))
            res2 := mload(add(_b, 64))
        }
        return (res1, res2);
    }
}

/*

> Caller er = await Caller.deployed();
> Caller ee = await Callee.deployed();
> await er.setCallee(ee.address);


> await er.addCall(1, 2);

> er.x()
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
> er.y()
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
> er.v()
BN { negative: 0, words: [ 2, <1 empty item> ], length: 1, red: null }
> er.w()
BN { negative: 0, words: [ 3, <1 empty item> ], length: 1, red: null }

> ee.x()
BN { negative: 0, words: [ 2, <1 empty item> ], length: 1, red: null }
> ee.y()
BN { negative: 0, words: [ 3, <1 empty item> ], length: 1, red: null }


> await er.addDelegateCall(3, 4)

> er.x()
BN { negative: 0, words: [ 4, <1 empty item> ], length: 1, red: null }
> er.y()
BN { negative: 0, words: [ 5, <1 empty item> ], length: 1, red: null }
> er.v()
BN { negative: 0, words: [ 4, <1 empty item> ], length: 1, red: null }
> er.w()
BN { negative: 0, words: [ 5, <1 empty item> ], length: 1, red: null }

> ee.x()
BN { negative: 0, words: [ 2, <1 empty item> ], length: 1, red: null }
> ee.y()
BN { negative: 0, words: [ 3, <1 empty item> ], length: 1, red: null }

 */