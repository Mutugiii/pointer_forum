const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Comments', function () { 
  it("Should add and fetch comments successfully", async function() {
    const Comments = await ethers.getContractFactory("Comments");
    const comments = await Comments.deploy();
    await comments.deployed();

    expect(await comments.getComments("first-blog-post")).to.be.lengthOf(0);

    const tx1 = await comments.addComments(
      "first-blog-post",
      "first-comment"
    );
    await tx1.wait();

    expect(await comments.getComments("first-blog-post")).to.be.lengthOf(1);
    expect(await comments.getComments("second-blog-post")).to.be.lengthOf(0);

    const tx2 = await comments.addComments(
      "second-blog-post",
      "different comment thread"
    );
    await tx2.wait();

    expect(await comments.getComments("first-blog-post")).to.be.lengthOf(1);
    expect(await comments.getComments("second-blog-post")).to.be.lengthOf(1);
  })
 })