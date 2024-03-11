/**
 * @project Emergent Playground
 * @file BinaryEncoder.js
 * @overview This class provides methods to encode a JSON object into a binary format and decode a binary input into a JSON object. 
 * It extends the BinaryEncoderDecoderInterface, inheriting its structure. 
 * The encoding and decoding are performed using the TextEncoder and TextDecoder Web APIs, respectively. 
 * The encoded output is a Uint8Array, and the decoded output is a JavaScript object (JSON).
 * @authors Ethan Foster, Kevin Schultz
 * @exports BinaryEncoderDecoder
 */

import BinaryEncoderDecoderInterface from '../interfaces/BinaryEncoderDecoderInterface';

export default class BinaryEncoderDecoder extends BinaryEncoderDecoderInterface {

    constructor() {
        super();
    }

    /**
     * @description Encodes a JSON object into a binary string.
     * 
     * @param {Object} json The JSON object to encode.
     * @returns {Uint8Array} The encoded binary string.
     */
    async encodeJSONToBinary(json) {
        const jsonString = JSON.stringify(json);
        const blob = new Blob([jsonString], { type: 'application/octet-stream' });
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
