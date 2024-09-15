import { getConnectedClients } from "./socket-io-connection";

const SerialPort = require("serialport").SerialPort;
const Readline = require("@serialport/parser-readline").ReadlineParser;
/** Serial port declaration */
const port = new SerialPort({
  baudRate: 9600,
  path: "/dev/cu.usbmodem11101", //! this path can be found on arduino studio and each usb slot has a different value
});

/**Function used to return the scanned card id + communicating with sockets */
export const startArduinoCommunication = () => {
  const parser = port.pipe(new Readline({ delimiter: "\r\n" }));
  const connectedClients = getConnectedClients();
  parser.on("data", (data: string) => {
    connectedClients.forEach((client) => {
      client.send(data);
    });
  });

  port.on("open", () => {
    console.log("Serial port connected");
  });

  port.on("error", (err) => {
    console.error("Error:", err.message);
  });
};
