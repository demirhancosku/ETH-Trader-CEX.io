/**
 * Created by coskudemirhan on 23/07/2017.
 */

"use strict";
const BaseService = require('./BaseService'),
    PromiseBased = require("./Strategies/PromiseBased"),
    TimeSeries = require("timeseries-analysis");

class BuyService extends BaseService {

    constructor() {
        super();

        //Collection of strategies related to buy.
        this.strategies = [];
        this.strategies.push({class_name: 'promiseBasedBuyStrategy', class: new PromiseBased("buy")});
    }

    update(resource, prices, lastPrice) {
        for (let strategy of this.strategies) {

            if (strategy.class_name === resource.buyStrategy.class_name) {

                strategy.class.update(
                    {
                        resource: resource,
                        timeseries: new TimeSeries.main(TimeSeries.adapter.fromDB(prices, {
                            date: 'created_at',
                            value: 'ask'
                        })),
                        lastPrice: lastPrice

                    });

                return strategy.class.check();
            }

        }

    }

}

module.exports = BuyService;