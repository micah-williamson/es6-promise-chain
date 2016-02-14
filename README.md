es6-promise-chain
----------------

Iterates over collection and applies a promise to each.
This is useful if each item in the array needs to perform an asynchronous action
but as a whole needs to occur synchronously.

Index Location: `dist/index.js`
Type Definitions: `dist/index.d.ts`

# for

The `for` function takes an array of promises and iterates over them in order.
It will wait for each subsequent promises to resolve before continuing to the next promise.
This can be done with promise chaining already but can only deal with fixed tasks and
not a dynamic array of tasks.

**for(Array<callback () => Promise<any>>);**

    import * as PromiseChain from 'es6-promise-chain';

    function makeDinner(): Promise<any[]> {
      let promises: (() => Promise<any>)[] = [];
      let me = new Myself();
      let dishes = false;

      switch(me.getHungryFor()) {
        case: Food.Pasta:
          promises.push(me.makePasta);
          dishes = true;
          break;
        case: Food.Rice:
          promises.push(me.makeRice);
          dishes = true;
          break;
        case: Food.Pizza:
          promises.push(me.orderPizza);
          break;
      }

      promises.push(me.eat);

      if(dishes) {
          promises.push(me.doDishes);
      }

      return PromiseChain.for(promises);
    }

# forEach

The `forEach` function iterates over an array and applies a callback to each item.
This is useful if each item in an array should take the same action.

**forEach(Array<T>, callback (item: T) => Promise<any>);**

    import * as PromiseChain from 'es6-promise-chain';

    let players = [new Player(), new Player() ... new Player()];

    PromiseChain.forEach(players, (player) => {
      return Promise((resolve) => {
        player.playMove().then(() => {
          resolve();
        });
      });
    });

    // OR [better]

    PromiseChain.forEach(players, (player) => {
      return player.playMove();
    });

# while

The `while` function runs the callback while the condition in the first argument
is met.

**while(condition: () => boolean, callback: () => Promise<any>)**

    import * as PromiseChain from 'es6-promise-chain';

    enum PlayerAction {Hit, Stay};

    function playBlackjack(): Promise<any[]> {
      let player = new Player();

      PromiseChain.while(() => return player.stillPlaying, () => {
        return player.play().then((action: PlayerAction) => {
          player.stillPlaying = action === PlayerAction.Stay || player.handValue > 21;
        });
      });
    }
