
const hre = require("hardhat");

async function main() {


  const ToDoListApp = await hre.ethers.deployContract("ToDoList");

  await ToDoListApp.waitForDeployment();

  console.log(
    `deployed to ${ToDoListApp.target}`
  );

  console.log(ToDoListApp)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512