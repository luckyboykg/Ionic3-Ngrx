# ngRxIonic
This project is an example to apply ngRx-Store in Ionic.

Dependencies :
Ionic 3, ngrx/effects: 5.2.0, @ngrx/store: 5.2.0, jasmine : 2.99.0, karma : 1.7.1, typescript : 2.6.2

ngRx-Store pattern :
![alt text](https://www.codemag.com/Article/Image/1811061/image4.PNG)

**Pros :**

**-Centralized, Immutable State**
>All relevant application state exists in one location. 
>This makes it easier to track down problems, as a snapshot of state at the time of an error can provide important insight and make it easy to recreate issues.

It's mean : 

+We can manage all the changes in our system. We don't let the component change the State directly, they have to dispatch Action to Reducer.

+We can share the State across many components and it's help us very easy to maintain the State.

**-Performance**
>Since state is centralized at the top of your application, data updates can flow down through your components relying on slices of store. 
>Angular 2 is built to optimize on such a data-flow arrangement, and can disable change detection in cases where components rely on Observables which have not emitted new values. 

It's mean : 

+NgRxStore doesn't change the State directly, they just return the new State when have anything changed (Immutable State)

+So we can leverage on this technique to apply ChangeDetectionStrategy.OnPush to make Angular doesn't run some change detection triggers when not need.

+Read more : https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4

**-Testability**
>All state updates are handled in reducers, which are pure functions. 
>Pure functions are extremely simple to test, as it is simply input in, assert against output. 

**Cons :**

-Developer have to spend more time and effort to learn new technology as Redux pattern, ngRx-Store library, Rxjs

-Make simple app to not simple (but not complex)y

### My Conclusion:

-Should use ngRx-Store for every angular app with more than 5 screens and we intend to upgrade it later. Because ngRx-Store help us easy to maintain the complex application.

-It's help us minimize the risk of sharing variables, services between multiple components. 

-It's help us maximize the performance for Angular App in our case is Ionic App.
