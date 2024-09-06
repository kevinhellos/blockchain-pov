import { useEffect, useState } from "react";
import Block from "./components/Block";
import Container from "./components/Container";
import GridContainer from "./components/GridContainer";

export default function App() {

  // Hash block data
  function hashData(data) {
    let hash = 0;
    // Return 0 for empty string
    if (data.length === 0) return hash;
    // Iterate over each character in the string
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i); // Get the character code
      hash = (hash << 5) - hash + char; // Bitwise operations
      hash |= 0; // Convert to 32-bit integer
    }
    return hash;
  }

  // Keep track of all blocks
  const [blocks, setBlocks] = useState([]);

  // New block
  const [newBlockData, setNewBlockData] = useState("");

  // Load all previously stored blocks retrieved from the localStorage
  function loadBlocks() {
    const storedBlocks = localStorage.getItem("blocks");
    // If there isn't any stored blocks,
    // create an empty blocks array, and store them
    if (!storedBlocks) {
      console.log("No stored blocks");
      localStorage.setItem("blocks", JSON.stringify([]));
    }

    else {
      // If there are stored blocks
      // call the setBlocks and pass in the storeed blocks
      setBlocks(JSON.parse(storedBlocks));
    }
  }

  // Save all blocks to localStorage
  function saveBlocks(){
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }

  // Add a new block to the blocks
  function addBlock(data) {
    // Validation to ensure data isn't empty
    if (data.trim() !== "") {
      const newBlock = {
        data: data,
        currentHash: hashData(data), // Ensure that each block hash is unique
        previousHash: 
          blocks.length === 0 ? "" : // If it is the 1st block, there isn't any previous block hash
          blocks[blocks.length - 1]["currentHash"],
      }
      setBlocks(
        [...blocks, newBlock] // Add the new block to the blocks array
      );
      setNewBlockData(""); // Reset newBlockData input field
    }

    // If data is empty
    else {
      alert("Please enter a valid block data");
    }
  }

  // Runs the loadBlocks() function everytime the page is mounted
  useEffect(() => {
    loadBlocks();
  }, []);

  // Re save blocks to localStorage every time value of blocks changes
  useEffect(() => {
    saveBlocks();
  }, [blocks]);

  return (
    <Container>
      <h1 className="text-3xl text-center font-medium mt-10">Blockchain Point of View</h1>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          addBlock(newBlockData); 
        }}
        className="flex mt-10"
      >
        <input
          type="text"
          name="new_block_data"
          placeholder="Block data"
          onChange={(e) => setNewBlockData(e.target.value)}
          value={newBlockData}
          className="border border-gray-300 py-2 px-5 me-2 w-full placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-black py-2 px-4 text-white text-sm me-2"
        >
          Add block
        </button>
        <button
          type="button"
          onClick={() => {
            const confirmReset = window.confirm("Confirm to reset all blocks? ");
            if (confirmReset) {
              localStorage.removeItem("blocks");
              loadBlocks();
              window.location.reload();
            }
          }}
          className="border border-red-600 bg-white hover:bg-red-50 py-2 px-4 text-red-600 text-sm"
        >
          RESET all
        </button>
      </form>

      <h2 className="mt-10 mb-5 text-2xl">All Blocks</h2>
      <GridContainer>
        {blocks.map((block, index) => (
          <Block
            key={index}
            blockNumber={index + 1}
            data={block}
          />
        ))}
      </GridContainer>

    </Container>
  )
}
