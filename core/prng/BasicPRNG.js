// @flow
/**
 *  Basic PRNG
 *  Generates random numbers with seed
 */
import type { IPRNG } from '../interfaces';
import type { NumberString, RandomArrayNumber } from '../types';
import hashProxy from '../utils/hash';

class BasicPRNG implements IPRNG {

    _seed: ?NumberString;

    constructor() {
        this._seed = undefined;
    }

    /**
     * Random number generator with seed\
     * @abstract
     * @returns {number} random number
     */
    // eslint-disable-next-line
    random(n: ?number = 1): RandomArrayNumber {
        throw new Error('Unassigned method');
    }

    /**
     * Next random value
     * Returns only single random value
     * Does not support seed
     * @abstract
     * @returns {number}
     */
    next(): number {
        throw new Error('Unassigned method');
    }

    /**
     * Next integer random value
     * Returns only single random value
     * Does not support seed
     * @abstract
     * @returns {number}
     */
    nextInt(): number {
        throw new Error('Unassigned method');
    }

    /**
     * Generates random integer [0, 2^32)
     * @returns {number}
     */
    // eslint-disable-next-line
    randomInt(n: ?number = 1): RandomArrayNumber {
        throw new Error('Unassigned method');
    }

    /**
     * Sets seed value for PRNG
     */
    seed(seed_value: ?NumberString): void {
        this._seed = seed_value;
    }

    /**
     * Modulo for seed
     * @returns {number}
     */
    static get modulo(): number {
        return 2147483647;
    }

    /**
     * Sets random seed
     */
    static random_seed(): number {
        let _seed: number = hashProxy.hash(Date.now() + Math.floor(Math.random() * BasicPRNG.modulo));
        _seed = _seed % BasicPRNG.modulo;
        if (_seed < 0) {
            _seed += BasicPRNG.modulo - 1;
        }
        return _seed;
    }
}

export default BasicPRNG;
