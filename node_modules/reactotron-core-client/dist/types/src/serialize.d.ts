/**
 * Fix BigInt serialization
 * BigInts are not supported by JSON.stringify.  This is a workaround.
 * https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-953187833
 */
declare global {
    interface BigInt {
        toJSON(): string;
    }
}
/**
 * Serializes an object to JSON.
 *
 *  @param {any} source - The victim.
 */
declare function serialize(source: any, proxyHack?: boolean): string;
export default serialize;
