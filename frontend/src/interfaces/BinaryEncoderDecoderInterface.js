/**
 * @project Emergent Playground
 * @file BinaryEncoderInterface.js
 * @overview This file defines the interface for BinaryEncoder.
 * It abstracts the process of encoding and decoding json into/from a binary string.
 * @authors Ethan Foster, Kevin Schultz
 * @exports BinaryEncoderDecoderInterface
 */

export default class BinaryEncoderDecoderInterface {
    constructor() {}

    /**
     * @description Encodes a JSON object into a binary string.
     *
     * @param {Object} json The JSON object to encode.
     * @returns {Uint8Array} The encoded binary string.
     */
    async encodeJSONToBinary(json) {}

    /**
     * @description Decodes a binary input into a JSON object.
     *
     * @param {Uint8Array} binary - The binary input to decode.
     * @returns {Object} The decoded JSON object.
     */
    async decodeBinaryToJSON(binary) {}
}
