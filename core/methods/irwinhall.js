// @flow

/**
 * Irwin-Hall distribution
 * https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution
 * @param n: number, n >= 1
 * Created by Alexey S. Kiselev
 */

import type { MethodError, RandomArray } from '../types';
import type { IDistribution } from '../interfaces';
const Uniform = require('./uniform');

class IrwinHall implements IDistribution {
    n: number;
    _uniform: Uniform;

    constructor(n: number) {
        this.n = Math.floor(n);
        this._uniform = new Uniform(0, 1);
    }

    /**
     * Generates a random number
     * @returns a Irwin-Hall distributed number
     */
    random(): number {
        let random_number: number = 0,
            random: RandomArray = this._uniform.distribution(this.n);
        for(let k = 0; k < this.n; k += 1) {
            random_number += random[k];
        }
        return random_number;
    }

    /**
     * Generates next seeded random number
     * @returns {number}
     */
    next(): number {
        let random_number: number = 0;
        for(let k = 0; k < this.n; k += 1) {
            random_number += this._uniform.next();
        }
        return random_number;
    }

    /**
     * Generates random distribution
     * @returns an array with Irwin-Hall distributed numbers
     */
    distribution(n: number): RandomArray {
        let irwinHallArray: RandomArray = [],
            random_number: number,
            random: RandomArray = this._uniform.distribution(n * this.n);
        for(let i: number = 0; i < n; i += 1){
            random_number = 0;
            for(let k = 0; k < this.n; k += 1) {
                random_number += random[i * this.n + k];
            }
            irwinHallArray[i] = random_number;
        }
        return irwinHallArray;
    }

    isError(): MethodError {
        if(!this.n || this.n < 1) {
            return {error: 'Irwin-Hall distribution: you should point "n" positive integer value'};
        }
        return { error: false };
    }

    /**
     * Refresh method
     * @param newN: number - new parameter "n"
     * This method does not return values
     */
    refresh(newN: number): void {
        this.n = Math.floor(newN);
    }

    /**
     * Class .toString method
     * @returns {string}
     */
    toString(): string {
        let info = [
            'Irwin-Hall Distribution',
            `Usage: unirand.irwinhall(${this.n}).random()`
        ];
        return info.join('\n');
    }

    /**
     * Mean value
     * Information only
     * For calculating real mean value use analyzer
     */
    get mean(): number {
        return this.n / 2;
    }

    /**
     * Median value
     * Information only
     * For calculating real mean value use analyzer
     */
    get median(): number {
        return this.n / 2;
    }

    /**
     * Variance value
     * Information only
     * For calculating real variance value use analyzer
     */
    get variance(): number {
        return this.n / 12;
    }

    /**
     * Skewness value
     * Information only
     * For calculating real skewness value use analyzer
     */
    get skewness(): number {
        return 0;
    }

    /**
     * Kurtosis value
     * Information only
     */
    get kurtosis(): number {
        return -1.2 / this.n;
    }

    /**
     * All parameters of distribution in one object
     * Information only
     */
    get parameters(): {} {
        return {
            mean: this.mean,
            median: this.median,
            variance: this.variance,
            skewness: this.skewness,
            kurtosis: this.kurtosis
        };
    }
}

module.exports = IrwinHall;
