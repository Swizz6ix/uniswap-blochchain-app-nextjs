require("@nomiclabs/hardhat-waffle");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  network: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/eLSjpjykj6DkuhPxfuL3b4ecmXNPaSOl",
      accounts: [
        'af3738082c8773158c70d1537c4e5de546f59695313f7840cc1baef73a55724d'
      ],
    }
  }
};
