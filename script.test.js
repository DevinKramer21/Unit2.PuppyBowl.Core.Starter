

// hi Shashank, i am adding my tests logic below

describe("fetchSinglePlayer", () => {
  test("hmm yeah this returns a player object", async () => {
    
  });


});

describe("addNewPlayer", () => {
  test("this will add a new player successfully", async () => {
    
  });


});



describe("fetchSinglePlayer", () => {
  test("returns a player object if all goes well lol", async () => {
    const playerId = 1; 
    const player = await fetchSinglePlayer(playerId);
    expect(typeof player).toBe("object");
    expect(player).toHaveProperty("name");
    expect(player).toHaveProperty("id");
    
  });

  
});

describe("addNewPlayer", () => {
  test("should add a new player successfully", async () => {
    const newPlayer = {
      name: "Test Player",
      breed: "Husky",
      image: "https://shorturl.at/5znhx",
      
    };
    const addedPlayer = await addNewPlayer(newPlayer);
    expect(addedPlayer).toMatchObject(newPlayer);
    
  });

  
});







