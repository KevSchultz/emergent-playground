/**
 * @project Emergent Playground
 * @file BinaryEncoderDecoder.js
 * @overview This file contains the BinaryEncoderDecoder class, which is used for encoding and decoding binary data.
 * It provides methods for encoding a JSON object into a binary string, decoding a binary input into a JSON object,
 * and converting a Blob into a Uint8Array.
 * @authors Ethan Foster, Kevin Schultz
 * @exports BinaryEncoderDecoder
 */

/**
 * @class
 * @classdesc A class for encoding and decoding binary data.
 * @extends BinaryEncoderDecoderInterface
 */
export default class BinaryEncoderDecoder {

  /**
   * @description Encodes a JSON object into a binary string.
   *
   * @param {Object} json The JSON object to encode.
   * @returns {Uint8Array} The encoded binary string.
   */
  async encodeJSONToBinary(json) {
    const jsonString = JSON.stringify(json);
    const blob = new Blob([jsonString], { type: "application/octet-stream" });
    return blob;
  }

  /**
   * @description Decodes a binary input into a JSON object.
   *
   * @param {Uint8Array} binary - The binary input to decode.
   * @returns {Object} The decoded JSON object.
   */
  async decodeBinaryToJSON(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const jsonString = reader.result;
        resolve(JSON.parse(jsonString));
      };
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }

  async blobToArray(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const array = new Uint8Array(arrayBuffer);
        resolve(array);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  }
}
