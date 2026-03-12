import * as signalR from "@microsoft/signalr";

const hubconnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7156/OddsHub")
  .withAutomaticReconnect()
  .build();

await hubconnection.start();

hubconnection.on("ReceiveOddsUpdate", (odds) => {
  console.log("New odds received:", odds);
});

export default hubconnection;