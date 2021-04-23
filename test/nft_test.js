const { expect, assert } = require("chai")
const { web3, ethers } = require("hardhat")
const { BN, time, balance, expectEvent, expectRevert } = require("@openzeppelin/test-helpers")
const ether = require("@openzeppelin/test-helpers/src/ether")

let nft
let owner, acc1, acc2

describe("NFT", function () {
	beforeEach(async function () {
		const rinkebyOpenSeaProxy = "0xF57B2c51dED3A29e6891aba85459d600256Cf317"
		let NFTContract = await ethers.getContractFactory("ToTheMoon")
		nft = await NFTContract.deploy(rinkebyOpenSeaProxy)
		await nft.deployed()

		signers = await ethers.getSigners()
		owner = signers[0]
		acc1 = signers[1]
		acc2 = signers[2]
	})

	it("simple test...", async function () {
		expect(await nft.name()).to.equal("ToTheMoon")
	})

	it("simple minting test", async function () {
		//owner doesn't have any balance
		expect(await nft.balanceOf(acc1.address, 1)).to.equal(0)

		//mint
		await nft.create(1, 0, "", 0x00)
		await nft.mint(acc1.address, 1, 1, 0x00)

		//acc1 should have a token
		expect(await nft.balanceOf(acc1.address, 1)).to.equal(1)
	})

	it("creating a collection of 1000 items works", async function () {
		//mint
		await nft.create(50000, 0, "", 0x00)
		await nft.mint(owner.address, 1, 50000, 0x00)

		50 - 3202018
		100 - 6441518

		//addr1 should have a token
		expect(await nft.balanceOf(owner.address, 1)).to.equal(50000)
	})

	it("setting a price per collection works", async function () {
		//mint
		await nft.create(50000, 0, "", 0x00)
		await nft.mint(owner.address, 1, 50000, 0x00)
		expect(await nft.balanceOf(owner.address, 1)).to.equal(50000)
		await nft.setItemPrice(1, web3.utils.toWei("0.1", "ether")) // 0.1 eth

		expect(await nft.getItemPrice(1)).to.equal(web3.utils.toWei("0.1", "ether"))
	})
})
