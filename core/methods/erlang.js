// @flow
/**
 * Erlang Distribution
 * This is continuous distribution
 * https://en.wikipedia.org/wiki/Erlang_distribution
 * @param mu: number - mu > 0 - scale, "mu" can be double
 * @param k: number - shape parameter k must be a positive integer
 * @returns Erlang Distributed value
 * Created by Alexey S. Kiselev
 */

let Utils = require('../utils/utils');

class Erlang {
    constructor(k: number, mu: number) {
        this.shape = k;
        this.scale = mu;
    }

    /**
     * Generates a random number
     * @returns a Erlang distributed number
     */
    random(): number {
        let p: number = 1;
        for(let i: number = 0; i < this.shape; i += 1){
            p *= Math.random();
        }
        return (-this.scale) * Math.log(p);
    }

    /**
     * Generates Erlang distributed numbers
     * @param n: number - Number of elements in resulting array, n > 0
     * @returns Array<number> - Erlang distributed numbers
     */
    distribution(n: number) {
        let erlangArray: Array<number> = [];
        for(let i:number = 0; i < n; i += 1){
            erlangArray[i] = this.random();
        }
        return erlangArray;
    }

    /**
     * Error handling
     * Parameter "k" must be positive integer
     * Parameter "mu" must be positive
     * @returns {boolean}
     */
    isError(): boolean | {error: string} {
        if(this.shape <= 0){
            return {error: 'Erlang distribution: parameter "k" must be positive integer'};
        }
        if(this.scale <= 0) {
            return {error: 'Erlang distribution: parameter "mu" must be positive'};
        }
        return false;
    }

    /**
     * Refresh method
     * @param newK: number - new parameter "k"
     * @param newMu: number - new parameter "mu"
     * This method does not return values
     */
    refresh(newK: number, newMu: number): void {
        this.shape = newK;
        this.scale = newMu;
    }

    /**
     * Class .toString method
     * @returns {string}
     */
    toString(): string {
        let info = [
            'Erlang Distribution',
            `Usage: randomjs.erlang(${this.shape}, ${this.scale}).random()`
        ];
        return info.join('\n');
    }

    /**
     * Mean value
     * Information only
     * For calculating real mean value use analyzer
     */
    get mean(): number {
        return this.shape * this.scale;
    }

    /**
     * Erlang distribution doesn't have simple close form of Median value
     */

    /**
     * Mode value - value, which appears most often
     * Information only
     * For calculating real mode value use analyzer
     */
    get mode(): number {
        return this.scale * (this.shape - 1);
    }

    /**
     * Variance value
     * Information only
     * For calculating real variance value use analyzer
     */
    get variance(): number {
        return this.shape * Math.pow(this.scale, 2);
    }

    /**
     * Skewness value
     * Information only
     * For calculating real skewness value use analyzer
     */
    get skewness(): number {
        return 2 / Math.sqrt(this.shape);
    }

    /**
     * Entropy value
     * Information only
     * For calculating real entropy value use analyzer
     */
    get entropy(): number {
        return (1 - this.shape) * Utils.digamma(this.shape) + Math.log(Utils.gamma(this.shape) * this.scale) + this.scale;
    }

    /**
     * All parameters of distribution in one object
     * Information only
     */
    get parameters(): {} {
        return {
            mean: this.mean,
            mode: this.mode,
            variance: this.variance,
            skewness: this.skewness,
            entropy: this.entropy
        };
    }
}

module.exports = Erlang;