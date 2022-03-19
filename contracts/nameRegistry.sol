pragma solidity >=0.4.0 <0.9.0;

contract nameRegistry {
    
    mapping (string=>string) map;
    

    // Register new name, value pair
    function register(string memory name, string memory value) public {
        bytes memory mapValue = bytes(map[name]); 
        if (mapValue.length == 0) { // key not found
            map[name] = value;
        }
    }

    // Reads the last stored value
    function read(string memory name) public view returns (string memory) {
        return map[name];
    }
}