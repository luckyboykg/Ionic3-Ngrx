# ngRxIonic
This project is an example to apply NGRX in Ionic.

Dependencies :
Ionic 3, ngrx/effects: 5.2.0, @ngrx/store: 5.2.0, jasmine : 2.99.0, karma : 1.7.1, typescript : 2.6.2

NGRX pattern :

![alt text](https://www.codemag.com/Article/Image/1811061/image4.PNG)

### Pros:

**-Centralized, Immutable State**

Single source of truth.

The data lives in a single store so it is easier to manage, debug and inspect.

**-Immutable State**

State is read-only.

All components have to dispatch Action to get or set any data from the Store.

So we can manage all the changes in our system and avoid the side effect. 

**-Share State**

State can share across many components.

We can minimize the risk of sharing variables, services between multiple components.

**-Components will shorter and cleaner**

Component just need to binding data from the State.

It helps us very easy to maintain Component and Service.

**-Performance**

NGRX doesn't change the State directly, it just returns the new State when has anything changed (it's called Immutable State).

So we can apply ChangeDetectionStrategy.OnPush to maximize performance for Angular App.

>Read more about ChangeDetectionStrategy.OnPush : https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4

**-Testability**

All state updates are handled by pure functions and they are extremely simple to test. 

>Read more about Pure Functions: https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c

### Cons:

-Not officially supported by Angular or Ionic.

-Developer has to spend more time and effort to learn new technology as Redux pattern, NgRx or NGXS library.

-“BOILERPLATE” code, we need to writing more code and touch multiple files to get a simple feature working.

-Not suitable for small applications with less than 5 screens.
